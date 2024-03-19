const fse = require('fs-extra')
const path = require('path')
const { md5 } = require('@liutsing/utils')

// pnpx rimraf .\node_modules\.cache\babel-loader;pnpm run dev
/**
 * 是否为汉字
 * @param {*} text
 * @returns
 */
function isHans(text) {
  return text && /\p{Script=Han}/u.test(text)
}
/**
 * 收集存在的key
 * @param {*} file
 * @param {*} value
 * @returns
 */
function save(file, value) {
  const allText = file.get('allText')
  allText.push({
    value,
  })

  file.set('allText', allText)
}
const flag = 'Login\\index.tsx'

module.exports = function ({ types: t, template }, options) {
  return {
    pre(file) {
      file.set('allText', [])
    },
    visitor: {
      // 处理导入代码：import { useTranslation } from 'react-i18next'
      Program: {
        enter(path, state) {
          state.hasUseTranslationImport = false
          const file = path.hub.file
          // 获取文件的绝对路径
          const absolutePath = file.opts.filename
          const isI18nConfigFile = absolutePath.endsWith(options.i18nConfigFile)
          if (isI18nConfigFile) return
          // 检查是否已经导入了 react-i18next 中的 useTranslation
          path.node.body.forEach((node) => {
            if (t.isImportDeclaration(node) && node.source.value === 'react-i18next') {
              node.specifiers.forEach((specifier) => {
                if (specifier.imported && specifier.imported.name === 'useTranslation') {
                  state.hasUseTranslationImport = true
                }
              })
            }
          })
        },
        exit(path) {
          let hasUseTranslationImport =
            path.scope.hasBinding('useTranslation') || path.scope.hasBinding('initReactI18next')
          // 如果没有导入过，插入新的导入声明
          if (!hasUseTranslationImport) {
            const importAst = template.ast(`import { useTranslation } from 'react-i18next'`)
            path.node.body.unshift(importAst)
          }
        },
      },
      JSXText(path, state) {
        if (path.node.skipTransform) {
          return
        }
        const i18nKey = path.node.value.trim()

        if (isHans(i18nKey)) {
          const identifier = t.identifier(`"${i18nKey}"`)
          const expressionContainer = t.jsxExpressionContainer(t.callExpression(t.identifier('t'), [identifier]))
          // 替换文本节点为JSXExpressionContainer节点
          path.replaceWith(expressionContainer)
          save(state.file, i18nKey)
          path.node.skipTransform = true
          path.skip()
        }
      },
      StringLiteral(path, state) {
        if (path.node.skipTransform) {
          return
        }
        const i18nKey = path.node.value.trim()
        if (!isHans(i18nKey)) {
          return
        }
        // console.log('StringLiteral', i18nKey)
        save(state.file, i18nKey)

        const parent = path.parent
        // message.info('xxx')
        if (t.isCallExpression(parent)) {
          if (t.isMemberExpression(parent.callee)) {
            const identifier = t.identifier(`"${i18nKey}"`)
            const expressionContainer = t.callExpression(t.identifier('t'), [identifier])
            path.replaceWith(expressionContainer)
            path.node.skipTransform = true
            path.skip()
          } else if (t.isIdentifier(parent.callee) && parent.callee.name === 't') {
            // console.log()
          } else {
            console.log(i18nKey, 'parent.callee: isMemberExpression, parent: callExpression ===未转化===')
          }
        } else if (t.isJSXAttribute(parent)) {
          const identifier = t.identifier(`"${i18nKey}"`)
          const expressionContainer = t.jsxExpressionContainer(t.callExpression(t.identifier('t'), [identifier]))
          path.replaceWith(expressionContainer)
          path.node.skipTransform = true
          path.skip()
        } else {
          fse.writeFile(
            './no.log',
            JSON.stringify({ key: i18nKey, type: parent.type }) + '\r\n',
            { flag: 'a+' },
            (e) => {
              if (e) {
                console.error(e)
              }
            }
          )
        }
      },
      FunctionDeclaration(path) {
        const file = path.hub.file
        // 获取文件的绝对路径
        const absolutePath = file.opts.filename
        const hasBindingT = path.scope.hasBinding('t')

        let isValidJSXElement = false
        path.traverse({
          // 针对FunctionDeclaration下的 ReturnStatement
          ReturnStatement(declaratorPath) {
            const argument = declaratorPath.node.argument
            if (argument && t.isJSXElement(argument)) {
              isValidJSXElement = true
            }
          },
        })
        // 如果没有找到声明，我们添加一个新的声明
        if (!hasBindingT && isValidJSXElement) {
          const useTranslationStatement = t.variableDeclaration('const', [
            t.variableDeclarator(
              t.objectPattern([
                t.objectProperty(t.identifier('t'), t.identifier('t')),
                t.objectProperty(t.identifier('i18n'), t.identifier('i18n')),
              ]),
              t.callExpression(t.identifier('useTranslation'), [])
            ),
          ])

          // 将声明添加到函数体的顶部
          path.node.body.body.unshift(useTranslationStatement)
        }
      },
      ArrowFunctionExpression(path) {
        const blockStatement = path.node.body
        const parent = path.parent
        const file = path.hub.file
        // 获取文件的绝对路径
        const absolutePath = file.opts.filename
        const parentId = parent.id

        // 确保 body 是一个 BlockStatement 类型
        if (!t.isBlockStatement(blockStatement)) {
          return
        }

        // 确保在组件根目录下的ArrowFunctionExpression 内部的箭头函数都是小写开头
        if (
          (!t.isCallExpression(parent) && parent.callee && parent.callee.name !== 'forwardRef') ||
          (parentId && parentId.name && /^[a-z]/.test(parentId.name))
        ) {
          return
        }

        const hasBindingT = path.scope.hasBinding('t')

        let isValidJSXElement = false
        path.traverse({
          // 针对ArrowFunctionExpression下的 ReturnStatement
          ReturnStatement(declaratorPath) {
            const argument = declaratorPath.node.argument
            if (argument && (t.isJSXElement(argument) || t.isJSXFragment(argument))) {
              isValidJSXElement = true
            }
          },
        })

        // 如果没有找到声明，我们添加一个新的声明
        if (!hasBindingT && isValidJSXElement) {
          const useTranslationStatement = t.variableDeclaration('const', [
            t.variableDeclarator(
              t.objectPattern([
                t.objectProperty(t.identifier('t'), t.identifier('t')),
                t.objectProperty(t.identifier('i18n'), t.identifier('i18n')),
              ]),
              t.callExpression(t.identifier('useTranslation'), [])
            ),
          ])

          // 将声明添加到函数体的顶部
          path.node.body.body.unshift(useTranslationStatement)
        }
      },
    },
    post(file) {
      const allText = file.get('allText')

      const intlData = allText.reduce((obj, item) => {
        obj[item.value] = item.value
        return obj
      }, {})

      // 文件内容被覆盖
      if (Object.keys(intlData).length) {
        const f = file.path.hub.file
        // 获取文件的绝对路径
        const absolutePath = f.opts.filename
        // console.log(Object.keys(intlData).length, absolutePath)
        // TODO 字段重复处理策略
        const content = JSON.stringify(intlData, null, 4)
        fse.ensureDirSync(options.outputDir)
        //   console.log(content, path.join(options.outputDir, 'zh_CN.json'))
        fse.writeFileSync(path.join(options.outputDir, `${md5(absolutePath)}.json`), content)
        // TODO 数据上传
        // TODO 翻译
        // fse.writeFileSync(path.join(options.outputDir, 'en_US.js'), content)
      }
    },
  }
}

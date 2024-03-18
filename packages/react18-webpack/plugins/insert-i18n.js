const fse = require('fs-extra')
const path = require('path')
const { md5 } = require('@liutsing/utils')
const { isFunctionDeclaration } = require('typescript')

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

        // 检查是否已经添加了 useTranslation 声明
        // const hasUseTranslationDeclaration = path.node.body.body.some((statement) => {
        //   return (
        //     t.isVariableDeclaration(statement) &&
        //     statement.kind === 'const' &&
        //     statement.declarations.some((declarator) => {
        //       return (
        //         declarator.id.type === 'ObjectPattern' &&
        //         declarator.id.properties.some((property) => property.key.name === 't' || property.key.name === 'i18n')
        //       )
        //     })
        //   )
        // })

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
      //   ReturnStatement(path) {
      //     const file = path.hub.file
      //     // 获取文件的绝对路径
      //     const absolutePath = file.opts.filename
      //     let debug = false
      //     if (absolutePath.endsWith(flag)) {
      //       debug = true
      //     }
      //     const matchedParent = path.parent
      //     if (debug && path.node.argument) {
      //       //
      //       console.log(absolutePath, {
      //         matchedParent: matchedParent && matchedParent.type,
      //         matchedGradParent: matchedParent.parent && matchedParent.parent.type,
      //         argumentType: path.node.argument && path.node.argument.type,
      //       })
      //     }
      //     // 箭头函数默认导出组件： 根元素：t.isExportDefaultDeclaration(matchedParent.parent.type)
      //     // FIXME 箭头函数组件导出组件： 根元素：t.isExportDefaultDeclaration(matchedParent.parent.type)
      //     // 函数声明类组件： 根元素：t.isProgram(matchedParent.parent)

      //     if (t.isJSXElement(path.node.argument) && t.isBlockStatement(matchedParent) && matchedParent) {
      //       // FIXME
      //       const matchedGradParent = path.parent.parent
      //       let hasUseTranslationDeclaration = false
      //       let hasTCallexpression = true
      //       path.traverse({
      //         VariableDeclarator(declaratorPath) {
      //           // 判断是否插入了 const { t } = useTranslation()
      //           if (
      //             t.isIdentifier(declaratorPath.node.id, { name: 't' }) &&
      //             t.isIdentifier(declaratorPath.node.init) &&
      //             t.isCallExpression(declaratorPath.node.init.callee, { name: 'useTranslation' })
      //           ) {
      //             hasUseTranslationDeclaration = true
      //           }
      //         },
      //         CallExpression(declaratorPath) {
      //           // 判断是否调用了t('xxx')
      //           // FIXME 需要解决还没有提取转化的场景
      //           if (t.isIdentifier(declaratorPath.node.callee, { name: 't' })) {
      //             hasTCallexpression = true
      //           }
      //         },
      //       })
      //       if (debug) {
      //         console.log(absolutePath)
      //         console.log({
      //           //   matchedParentScope: matchedParent.scope.hasBinding('useTranslation'),
      //           pathScope: path.scope.hasBinding('useTranslation'),
      //           hasTCallexpression, // false? -> true
      //           hasUseTranslationDeclaration, // -> false
      //         })
      //       }
      //       if (
      //         !hasUseTranslationDeclaration &&
      //         hasTCallexpression &&
      //         !path.scope.hasBinding('useTranslation') &&
      //         !path.scope.hasBinding('t') &&
      //         matchedGradParent
      //       ) {
      //         // 条件：有t('xxx')调用
      //         // 符合条件才插入代码： const { t } = useTranslation()
      //         const useTranslationStatement = t.variableDeclaration('const', [
      //           t.variableDeclarator(
      //             t.objectPattern([
      //               t.objectProperty(t.identifier('t'), t.identifier('t')),
      //               // 导入i18n用于更新语言用
      //               t.objectProperty(t.identifier('i18n'), t.identifier('i18n')),
      //             ]),
      //             t.callExpression(t.identifier('useTranslation'), [])
      //           ),
      //         ])
      //         matchedGradParent.node.body.body.unshift(useTranslationStatement)
      //         hasUseTranslationDeclaration = true
      //         console.count(`${absolutePath}-ReturnStatement-执行次数`)
      //       }
      //     }
      //   },
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

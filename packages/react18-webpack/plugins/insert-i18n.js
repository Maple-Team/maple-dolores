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
// TODO 忽略svg文件
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
          const hasUseTranslationImport =
            path.scope.hasBinding('useTranslation') || path.scope.hasBinding('initReactI18next')
          // 如果没有导入过，插入新的导入声明
          if (!hasUseTranslationImport) {
            const importAst = template.ast(`import { useTranslation } from 'react-i18next'`)
            path.node.body.unshift(importAst)
          }
        },
      },
      JSXText(path, state) {
        const file = path.hub.file
        // 获取文件的绝对路径
        const absolutePath = file.opts.filename
        if (absolutePath.endsWith('.svg')) {
          return
        }

        const i18nKey = path.node.value.trim()

        if (!isHans(i18nKey)) {
          return
        }
        const identifier = t.identifier(`"${i18nKey}"`)
        const expressionContainer = t.jsxExpressionContainer(t.callExpression(t.identifier('t'), [identifier]))
        // 替换文本节点为JSXExpressionContainer节点
        path.replaceWith(expressionContainer)
        save(state.file, i18nKey)
        path.skip()
      },
      StringLiteral(path, state) {
        const i18nKey = path.node.value.trim()
        if (!isHans(i18nKey)) {
          return
        }

        const file = path.hub.file
        // 获取文件的绝对路径
        const absolutePath = file.opts.filename
        const parent = path.parent
        // 排除console.xx中的中文
        const callExpressionPath = path.findParent((p) => p.isCallExpression())
        if (
          callExpressionPath &&
          t.isMemberExpression(callExpressionPath.node.callee) &&
          callExpressionPath.node.callee.object.name === 'console' &&
          ['log', 'debug', 'error', 'warn', 'info'].includes(callExpressionPath.node.callee.property.name)
        ) {
          return // 忽略console.xx(<中文>)
        }

        if (t.isCallExpression(parent)) {
          // 处理类似message.info('<中文>')
          if (t.isMemberExpression(parent.callee) && parent.callee.object.name) {
            const identifier = t.identifier(`"${i18nKey}"`)
            const expressionContainer = t.callExpression(t.identifier('t'), [identifier])
            path.replaceWith(expressionContainer)
            save(state.file, i18nKey)
            path.skip()
          } else if (t.isIdentifier(parent.callee) && parent.callee.name === 't') {
            // 已存在的t('xx')，忽略
          } else {
            console.log('===忽略字段===: ', i18nKey)
          }
        } else if (t.isJSXAttribute(parent)) {
          // jsx属性中的汉字
          if (parent.name.name === 'id') {
            // 忽略svg中id中的中文
            return
          }

          const identifier = t.identifier(`"${i18nKey}"`)
          const expressionContainer = t.jsxExpressionContainer(t.callExpression(t.identifier('t'), [identifier]))
          path.replaceWith(expressionContainer)
          path.skip()
          save(state.file, i18nKey)
        } else if (t.isConditionalExpression(parent)) {
          // 三目运算符下的StringLiteral

          const jSXAttributePath = path.findParent((p) => p.isJSXAttribute())
          if (jSXAttributePath) {
            // jsx属性中的三目运算符中的StringLiteral
            const identifier = t.identifier(`"${i18nKey}"`)
            const expressionContainer = t.callExpression(t.identifier('t'), [identifier])
            path.replaceWith(expressionContainer)
            path.skip()
            save(state.file, i18nKey)
          }
        } else if (t.isObjectProperty(parent)) {
          // ObjectProperty中的StringLiteral -> 排除非react组件/钩子环境中的ObjectProperty
          const variableDeclarationPath = path.findParent((p) => p.isVariableDeclaration())

          if (
            !variableDeclarationPath ||
            !variableDeclarationPath.parent ||
            // 排除react环境外部的variableDeclaration ObjectProperty
            t.isProgram(variableDeclarationPath.parent) || // -> const a = {k:'中文'}
            t.isExportNamedDeclaration(variableDeclarationPath.parent) // -> export const a = {k:'中文'}
          ) {
            return
          }

          const identifier = t.identifier(`"${i18nKey}"`)
          const expressionContainer = t.callExpression(t.identifier('t'), [identifier])
          path.replaceWith(expressionContainer)
          path.skip()
          save(state.file, i18nKey)
        } else if (t.isAssignmentExpression(parent)) {
          // 处理赋值操作中的中文
          const identifier = t.identifier(`"${i18nKey}"`)
          const expressionContainer = t.callExpression(t.identifier('t'), [identifier])
          path.replaceWith(expressionContainer)
          path.skip()
          save(state.file, i18nKey)
        } else if (t.isArrayExpression(parent)) {
          // 处理数组中的中文
          const identifier = t.identifier(`"${i18nKey}"`)
          const expressionContainer = t.callExpression(t.identifier('t'), [identifier])
          path.replaceWith(expressionContainer)
          path.skip()
          save(state.file, i18nKey)
        } else {
          // console.log({ key: i18nKey, type: parent.type }, '===未提取===')
          fs.writeFile(
            './no.log',
            JSON.stringify({ key: i18nKey, parentType: parent.type, type: path.node.type, path: absolutePath }) +
              '\r\n',
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
        // 获取文件的绝对路径
        const hasBindingT = path.scope.hasBinding('t')
        const hasBindingI18n = path.scope.hasBinding('i18n')
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
        if (!hasBindingT && !hasBindingI18n && isValidJSXElement) {
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
        const parentId = parent.id

        // 确保 body 是一个 BlockStatement 类型
        if (!t.isBlockStatement(blockStatement)) {
          return
        }
        // 确保在组件根目录下的ArrowFunctionExpression 内部的箭头函数都是大写开头
        // 或者useXXX钩子
        // forwardRef定义的组件
        if (
          (!t.isCallExpression(parent) && parent.callee && parent.callee.name !== 'forwardRef') ||
          (parentId && parentId.name && /^[a-z]/.test(parentId.name) && !parentId.name.startsWith('use'))
        ) {
          return
        }

        const hasBindingT = path.scope.hasBinding('t')
        const hasBindingI18n = path.scope.hasBinding('i18n')

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
        // 返回正确的jsxElement或useXX钩子
        if (!hasBindingT && !hasBindingI18n && (isValidJSXElement || (parentId && parentId.name.startsWith('use')))) {
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
      CallExpression(path) {
        // 将t添加进钩子的依赖数组中
        const calleeName = path.node.callee.name
        // 检查是否是指定的 React 钩子之一
        if (['useEffect', 'useCallback', 'useMemo'].includes(calleeName)) {
          // 获取钩子的第一个参数，它应该是一个函数
          const hookFunction = path.node.arguments[0]

          // 确保第一个参数是一个函数体
          if (t.isFunctionExpression(hookFunction) || t.isArrowFunctionExpression(hookFunction)) {
            // FIXME 更有效的方法
            // 检查钩子函数体中是否包含符合条件(暂时的方法)的中文使用场景
            let hasChineseUsage = false
            path.traverse({
              StringLiteral(stringLiteralPath) {
                const value = stringLiteralPath.node.value
                if (isHans(value)) {
                  hasChineseUsage = true
                }
              },
            })

            if (!hasChineseUsage) return
            if (
              t.isBlockStatement(hookFunction.body) ||
              (calleeName === 'useMemo' && t.isArrayExpression(hookFunction.body))
            ) {
              // 获取或创建依赖数组
              let dependencies = path.node.arguments[1]
              if (!dependencies) {
                dependencies = t.arrayExpression([])
                if (t.isCallExpression(path.parent) && path.parent.arguments.length > 1) {
                  path.parent.arguments.push(dependencies)
                } else {
                  path.insertAfter(t.arrayExpression([dependencies]))
                }
              }
              // 将 t 添加到依赖数组中，如果尚未存在
              if (!dependencies.elements.some((element) => t.isIdentifier(element, { name: 't' }))) {
                dependencies.elements.push(t.identifier('t'))
              }
            }
          }
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
        // TODO 字段重复处理策略
        const content = JSON.stringify(intlData, null, 4)
        fs.writeFileSync(path.join(options.outputDir, `${md5(absolutePath)}.json`), content)
      }
    },
  }
}

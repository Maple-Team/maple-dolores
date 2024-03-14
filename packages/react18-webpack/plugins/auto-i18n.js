const { declare } = require('@babel/helper-plugin-utils')
const fse = require('fs-extra')
const path = require('path')
const generate = require('@babel/generator').default
const template = require('@babel/template').default
const t = require('@babel/types')

/**
 * 判断是否为react函数组件
 * 1. 是否返回一个jsxelement来判断
 * @param {babel.NodePath<t.FunctionDeclaration>|babel.NodePath<t.FunctionExpression>|babel.NodePath<t.ArrowFunctionExpression>} path
 * @returns
 */
function isReactFunctionComponent(path) {
  console.log(
    path.isFunctionDeclaration(),
    path.isFunctionExpression(),
    path.isArrowFunctionExpression(),
    '=====判断是否为react组件====',
    path.node.name
  )
  // 如果是函数组件，检查是否有render方法
  if (path.isFunctionDeclaration()) {
    const body = path.node.body

    if (body && body.type === 'BlockStatement') {
      const renderMethod = body.body.find((statement) => {
        if (!statement) return null
        console.log('statement.type: ', path.node.name)
        if (statement.argument) {
          console.log(statement.argument.type, 'statement.argument.type')
        }
        return (
          statement.type === 'ReturnStatement' &&
          statement.argument &&
          (statement.argument.type === 'JSXElement' ||
            (statement.argument.type === 'CallExpression' && statement.argument.callee.name === '_jsxDEV'))
        )
      })

      if (renderMethod) {
        return true
      }
    }
  }

  // 如果是箭头函数，并且有JSX元素，也可以认为是React组件
  if (path.isFunctionExpression() || path.isArrowFunctionExpression()) {
    const functionBody = path.node.body
    if (functionBody && functionBody.type === 'BlockStatement') {
      constjsxElements = functionBody.body.filter((node) => node.type === 'JSXElement')
      if (jsxElements.length > 0) {
        return true
      }
    }
  }

  return false
}

const autoI18nPlugin = declare((api, options) => {
  api.assertVersion(7)

  if (!options.outputDir) {
    throw new Error('outputDir in empty')
  }

  /**
   * 构建替换节点
   * @param {*} path
   * @param {*} value
   * @param {*} i18nUid
   * @returns
   */
  function getReplaceExpression(path, value) {
    const expressionParams = path.isTemplateLiteral() ? path.node.expressions.map((item) => generate(item).code) : null
    let replaceExpression = api.template.ast(
      `t('${value}'${expressionParams ? ',' + expressionParams.join(',') : ''})`
    ).expression
    if (path.findParent((p) => p.isJSXAttribute()) && !path.findParent((p) => p.isJSXExpressionContainer())) {
      replaceExpression = api.types.JSXExpressionContainer(replaceExpression)
    }
    return replaceExpression
  }
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

  return {
    pre(file) {
      file.set('allText', [])
    },
    visitor: {
      Program: {
        enter(path, state) {
          const file = path.hub.file
          // 获取文件的绝对路径
          const absolutePath = file.opts.filename
          const isI18nConfigFile = absolutePath.endsWith(options.i18nConfigFile)
          /**
           * 增强的写法：
           import {useTranslation} from 'react-i18next'

           // 使用的地方
            const {t} = useTranslation()
           */
          // 初始化state对象，用于存储导入的标识符
          state.reactI18nextUid = null
          path.traverse({
            ImportDeclaration(p) {
              const source = p.node.source.value
              if (!isI18nConfigFile) {
                if (source === 'react-i18next') {
                  // 查找是否有命名导入 'useTranslation' 来自 'react-i18next'
                  const useTranslationSpecifier = p.node.specifiers.find(
                    (specifier) =>
                      specifier.type === 'ImportSpecifier' &&
                      specifier.imported.name === 'useTranslation' &&
                      specifier.local.name === 'useTranslation'
                  )
                  if (useTranslationSpecifier) {
                    // 导入了
                    state.reactI18nextUid = useTranslationSpecifier.local.name
                    console.log(state.reactI18nextUid, 'state.reactI18nextUid')
                  }
                }
              }
            },
          })
        },
        exit(path, state) {
          if (!state.reactI18nextUid) {
            const reactI18nextUid = path.scope.generateUid('reactI18next')
            const importAst = api.template.ast(`import { useTranslation as ${reactI18nextUid} } from 'react-i18next'`)
            path.node.body.unshift(importAst)
            state.reactI18nextUid = reactI18nextUid
          }

          path.traverse({
            /**
             * 插入react-i18next使用代码
             * @param {*} path
             */
            FunctionDeclaration(path) {
              // 检查是否是React组件，这里可以根据实际情况进行判断
              if (isReactFunctionComponent(path) && state.reactI18nextUid) {
                // 生成useTranslation的代码
                // const useTranslationCode = api.template.ast(
                //   `const useTranslation = ${state.reactI18nextUid}.useTranslation();`
                // )
                console.log(path.node.id.name, '===path.node.name===')
                const tDeclaration = api.template.ast(`const { t } = ${state.reactI18nextUid}();`)
                // 检查是否已经声明了 t
                if (!path.scope.hasBinding('t')) {
                  console.log('=======t not hasBinding==========')
                  path.node.body.body.unshift(tDeclaration)
                } else {
                  console.log('=======t hasBinding==========')
                }

                // 检查是否已经声明了 useTranslation
                // if (!path.scope.hasBinding('useTranslation')) {
                //   // 将生成的代码添加到FunctionDeclaration的body中
                //   path.node.body.body.unshift(useTranslationCode)
                // }
              }
            },
          })
        },
      },
      //   StringLiteral(path, state) {
      //     if (path.node.skipTransform) {
      //       return
      //     }
      //     if (!isHans(path.node.value)) {
      //       return
      //     }
      //     save(state.file, path.node.value.trim())
      //     const replaceExpression = getReplaceExpression(path, path.node.value.trim())
      //     path.replaceWith(replaceExpression)
      //     path.skip()
      //   },
      //   TemplateLiteral(path, state) {
      //     if (path.node.skipTransform) {
      //       return
      //     }
      //     const value = path
      //       .get('quasis')
      //       .map((item) => item.node.value.raw)
      //       .join('{placeholder}')
      //     if (value) {
      //       let key = nextIntlKey()
      //       save(state.file, key, value)

      //       const replaceExpression = getReplaceExpression(
      //         path,
      //         key,
      //         state.i18nUid
      //       )
      //       path.replaceWith(replaceExpression)
      //       path.skip()
      //     }
      //     // path.get('quasis').forEach(templateElementPath => {
      //     //     const value = templateElementPath.node.value.raw;
      //     //     if(value) {
      //     //         let key = nextIntlKey();
      //     //         save(state.file, key, value);

      //     //         const replaceExpression = getReplaceExpression(templateElementPath, key, state.i18nUid);
      //     //         templateElementPath.replaceWith(replaceExpression);
      //     //     }
      //     // });
      //     // path.skip();
      //   },
      JSXText(path, state) {
        const i18nKey = path.node.value.trim()

        if (isHans(i18nKey)) {
          //   path.node.value = api.template.ast(`{ t('${i18nKey}') }`)
          const identifier = t.identifier(`"${i18nKey}"`)
          const expressionContainer = t.jsxExpressionContainer(t.callExpression(t.identifier('t'), [identifier]))
          // 替换文本节点为JSXExpressionContainer节点
          path.replaceWith(expressionContainer)

          save(state.file, i18nKey)
          path.node.skipTransform = true
          // 先忽略插入data-i18n这个功能
          // if (path.parentPath.isJSXElement()) {
          //   const openingElement = path.parentPath.node.openingElement
          //   const attributes = openingElement.attributes

          //   const hasI18n = attributes.some(
          //     ({ name }) => name.name.includes('data-i18n') // -> title可能会被使用
          //   )
          //   if (hasI18n) return
          //   openingElement.attributes.push(
          //     api.types.jSXAttribute(
          //       api.types.jSXIdentifier('data-i18n'),
          //       api.types.stringLiteral(i18nKey)
          //     )
          //   )
          // }
          //   let replaceExpression = api.template.ast(`{t('${nodeValue}')}`)
          //   console.log(replaceExpression, '====1')
          //   replaceExpression =
          //     api.types.JSXExpressionContainer(replaceExpression)
          //   console.log(replaceExpression, '====2')
          //   path.replaceWith(replaceExpression)
          //   path.skip()
        }
      },
      //   TemplateLiteral(path, node) {
      //     //     // 模板下的ConditionalExpression跳过处理 解决节点冲突的问题
      //     const parentPath = path.parentPath
      //     if (!path.node.expressions) return
      //     const conditionalExpression = path.node.expressions.find((exp) => exp.type === 'ConditionalExpression')
      //     if (conditionalExpression) {
      //       //   conditionalExpression.isSkip = true // 添加了是否需要遍历的标记
      //       // console.log('exec this')
      //     }
      //     const callExpression = api.types.callExpression(api.types.identifier('t'), [path.node])
      //     // console.log(callExpression)
      //     path.replaceWith(callExpression)
      //     path.skip()
      //   },
      //   ConditionalExpression(path) {
      //     if (path.node.isSkip) return
      //     // 处理过
      //     const consequent = path.node.consequent
      //     const alternate = path.node.alternate

      //     if (isHans(consequent.value.trim())) {
      //       path.node.consequent = api.types.callExpression(api.types.identifier('t'), [
      //         api.types.stringLiteral(consequent.value),
      //       ])
      //     }
      //     if (isHans(alternate.value.trim())) {
      //       // 方式1：构造节点
      //       //   path.node.alternate = api.types.callExpression(
      //       //     api.types.identifier('t'),
      //       //     [api.types.stringLiteral(alternate.value)]
      //       //   )
      //       // 方式2：字符串模板构建节点信息
      //       const res = template.expression(`t('${alternate.value.trim()}')`)()
      //       path.node.alternate = res
      //     }
      //     let condition = path.node.test
      //     let parentPath = path.parentPath
      //     while (!parentPath.isJSXElement()) {
      //       parentPath = parentPath.parentPath
      //     }
      //     const openingElement = parentPath.node.openingElement
      //     const attributes = openingElement.attributes

      //     // 先忽略插入data-i18n节点
      //     // const hasI18n = attributes.some(
      //     //   ({ name }) => name.name.includes('data-i18n') // -> title可能会被使用
      //     // )
      //     // if (hasI18n) return

      //     // TODO 优化，如果是Boolean字面量的话
      //     const conditionalExpression = api.types.conditionalExpression(condition, consequent, alternate)

      //     // 构造 JSXExpressionContainer
      //     const jsxExpressionContainer = api.types.jsxExpressionContainer(conditionalExpression)

      //     // 先忽略插入data-i18n节点
      //     // openingElement.attributes.push(
      //     //   api.types.jSXAttribute(
      //     //     api.types.jSXIdentifier('data-i18n'),
      //     //     jsxExpressionContainer
      //     //   )
      //     // )
      //     path.node.isSkip = true
      //   },
    },
    post(file) {
      const allText = file.get('allText')
      let existData = {}
      try {
        const zh_CNPath = path.join(options.outputDir, 'zh_CN.json')
        // const en_USPath = path.join(options.outputDir, 'en_US.js')
        existData = require(zh_CNPath)
      } catch (error) {
        // 第一次, 本地文件不存在
      }
      const intlData = allText.reduce((obj, item) => {
        obj[item.value] = item.value
        return obj
      }, {})
      // TODO 字段重复处理策略
      const content = JSON.stringify({ ...existData, ...intlData }, null, 4)
      fse.ensureDirSync(options.outputDir)
      //   console.log(content, path.join(options.outputDir, 'zh_CN.json'))
      fse.writeFileSync(path.join(options.outputDir, 'zh_CN.json'), content)
      // TODO 数据上传
      // TODO 翻译
      // fse.writeFileSync(path.join(options.outputDir, 'en_US.js'), content)
    },
  }
})
module.exports = autoI18nPlugin

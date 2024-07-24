const { translate } = require('bing-translate-api')
const { writeFile, readdirSync } = require('node:fs')
const path = require('path')
// npm i @azure-rest/ai-translation-text

/**
 * 翻译
 * @param {string} key
 * @param {'en' | 'zh-Hant'} lang
 * @returns
 */
const _translate = (key, lang) => {
  return new Promise((resolve, reject) => {
    // console.log(`准备翻译: from cn "${key}" to ${lang}`)
    translate(key, null, lang, true)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 多语种翻译
 * @param {string} key
 * @returns
 */
const translates = (key) => {
  return Promise.all([_translate(key, 'en'), _translate(key, 'zh-Hant')]).then((res) => {
    return {
      en: res[0]?.translation,
      tw: res[1]?.translation,
    }
  })
}

// eslint-disable-next-line import/newline-after-import
;(async () => {
    return
  const cnTranslationFiles = readdirSync(path.resolve(__dirname, '../src/i18n/zh_CN')).filter((file) =>
    file.endsWith('json')
  )

  let cnTranslation = {}
  cnTranslationFiles.forEach((file) => {
    cnTranslation = { ...cnTranslation, ...require(path.resolve(__dirname, '../src/i18n/zh_CN', file)) }
  })

  //   console.log('中文语言包', cnTranslation)

  const enTranslationMap = {}
  const twTranslationMap = {}
  for await (const key of Object.keys(cnTranslation)) {
    const value = cnTranslation[key]
    const { en, tw } = await translates(value)
    enTranslationMap[key] = en || ''
    twTranslationMap[key] = tw || ''
  }

  writeFile(
    path.resolve(__dirname, '../src/i18n/en/translation.json'),
    JSON.stringify(enTranslationMap, null, 2),
    (e) => {
      if (e) {
        console.error(e)
      } else {
        console.log('英文翻译更新完')
      }
    }
  )
  writeFile(
    path.resolve(__dirname, '../src/i18n/zh_TW/translation.json'),
    JSON.stringify(twTranslationMap, null, 2),
    (e) => {
      if (e) {
        console.error(e)
      } else {
        console.log('繁体翻译更新完')
      }
    }
  )
})()

// TODO 监听原始录入

// (async ()=>{
//    const res =  await _translate("远程驾驶", "zh-Hant")
//    console.log(res)
// })()

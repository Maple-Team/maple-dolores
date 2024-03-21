const { writeFile, readdirSync } = require('node:fs')
const path = require('path')
const { Translate } = require('@google-cloud/translate').v2

// NOTE 使用前需要挂代理
// $Env:http_proxy="http://127.0.0.1:7890";$Env:https_proxy="http://127.0.0.1:7890"

async function googleTranslate(text, target) {
  return new Promise((resolve) => {
    ;(async () => {
      const translate = new Translate({ key: 'AIzaSyC-jt2CdwvjrjggEpT9XTKEaju0EdqQG2M' })

      let [translations] = await translate.translate(text, target)
      translations = Array.isArray(translations) ? translations : [translations]
      resolve(translations[0])
    })()
  })
}

/**
 * 多语种翻译
 * @param {string} key
 * @returns
 */
const translates = (key) => {
  return Promise.all([googleTranslate(key, 'en-us'), googleTranslate(key, 'zh-hk')]).then((res) => {
    return {
      en: res[0],
      tw: res[1],
    }
  })
}

// eslint-disable-next-line import/newline-after-import
const start = async () => {
  const cnTranslationFiles = readdirSync(path.resolve(__dirname, '../src/locale/zh_cn')).filter((file) =>
    file.endsWith('json')
  )

  let cnTranslation = {}
  cnTranslationFiles.forEach((file) => {
    cnTranslation = { ...cnTranslation, ...require(path.resolve(__dirname, '../src/locale/zh_cn', file)) }
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
    path.resolve(__dirname, '../src/locale/en/translation.json'),
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
    path.resolve(__dirname, '../src/locale/zh_tw/translation.json'),
    JSON.stringify(twTranslationMap, null, 2),
    (e) => {
      if (e) {
        console.error(e)
      } else {
        console.log('繁体翻译更新完')
      }
    }
  )
}
start()

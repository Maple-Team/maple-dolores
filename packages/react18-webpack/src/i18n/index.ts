import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import type { HttpBackendOptions } from 'i18next-http-backend'
import enTranslation from './en/translation.json'
import cnTranslation from './cn'

// console.log(cnTranslation)

const i18n = i18next
  //   .use(detector)
  //   .use(HttpApi)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    // load: 'languageOnly', //  NOTE 后端文件映射关系?
    // lng: 'en', // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
      en: {
        translation: enTranslation,
      },
      cn: {
        translation: cnTranslation,
      },
    },
    // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
    // set returnNull to false (and also in the i18next.d.ts options)
    // returnNull: false,
    fallbackLng: 'cn',
    // backend: {
    //   // backends: [LocalStorageBackend, HttpBackend] 支持多数据源：https://github.com/i18next/react-i18next/blob/master/example/react-localstorage/src/i18n.js
    //   // 动态拉取远端资源，相比写在本地，部署更加灵活，维护方便，相当于提取公共三方组件
    //   // 商用解决方案：https://docs.locize.com/
    //   // 支持轮询
    //   // 缓存问题 -> 浏览器缓存 -> 如何去更新
    //   // FIXME 类型支持？-> 不支持，因为是远端拉取的，动态内容，倒是可以提前注入不由git管理的json来解决开发下的类型提示问题
    //   queryStringParams: { v: '1.3.5' },
    //   // 触发请求
    // },
  })

export default i18n

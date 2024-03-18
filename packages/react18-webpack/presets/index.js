module.exports = function () {
  return {
    presets: [],
    plugins: [
      [
        require('../plugins/insert-i18n.js'),
        {
          outputDir: './src/i18n/zh_CN',
          i18nConfigFile: 'i18n\\config.ts',
        },
      ],
      // ... 其他插件或预设 ...
    ],
  }
}

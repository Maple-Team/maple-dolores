module.exports = {
  presets: [
    process.env.NODE_ENV === 'development'
      ? '@babel/preset-env'
      : [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: '3.26.1',
            exclude: [],
            targets: {},
          },
        ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        development: process.env.NODE_ENV === 'development',
        importSource: '@welldone-software/why-did-you-render',
      },
    ],
    require('./presets/index'),
    '@babel/preset-typescript',
  ],
  plugins: [
    process.env.NODE_ENV === 'development' && require.resolve('react-refresh/babel'),
    process.env.NODE_ENV === 'development' && [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: false,
        corejs: false,
        version: '^7.20.6',
      },
    ],
    // [
    //   require('./plugins/auto-i18n'),
    //   {
    //     outputDir: './src/i18n/cn',
    //     i18nConfigFile: 'i18n\\config.ts',
    //   },
    // ],
    // [
    //   require('./plugins/insert-i18n'),
    //   {
    //     outputDir: './src/i18n/zh_CN',
    //     i18nConfigFile: 'i18n\\config.ts',
    //   },
    // ],
  ].filter(Boolean),
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: true,
            },
            modules: 'commonjs',
          },
        ],
      ],
    },
  },
}

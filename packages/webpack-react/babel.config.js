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
    '@babel/preset-typescript',
  ],
  plugins: [
    process.env.NODE_ENV === 'development' && [
      '@babel/plugin-transform-runtime', 
      {
        absoluteRuntime: false,
        corejs: false,
        version: '^7.20.6',
      },
    ],
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

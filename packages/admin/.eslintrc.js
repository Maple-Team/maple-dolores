module.exports = {
  extends: '@liutsing/eslint-config',
  overrides: [
    {
      files: ['**/*.vue'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
      },
    },
  ],
}

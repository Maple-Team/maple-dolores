module.exports = {
  extends: '@liutsing/eslint-config',
  overrides: [
    {
      files: ['**/*.vue'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
        'vue/comma-dangle': 'off',
      },
    },
  ],
  rules: {
    '@typescript-eslint/require-await': 'off',
  },
}

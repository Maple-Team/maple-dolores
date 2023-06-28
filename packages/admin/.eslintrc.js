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
    'vue/v-on-event-hyphenation': 'off',
    '@typescript-eslint/indent': 'off',
    'multiline-ternary': 'off',
    'operator-linebreak': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
  },
}

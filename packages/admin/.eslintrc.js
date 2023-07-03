module.exports = {
  extends: '@liutsing/eslint-config',
  rules: {
    '@typescript-eslint/require-await': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/comma-dangle': 'off',
    'no-restricted-syntax': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    // TODO fix
    'unused-imports/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'vue/require-explicit-emits': 'off',
    'symbol-description': 'off',
    'vue/html-indent': 'off',
  },
}

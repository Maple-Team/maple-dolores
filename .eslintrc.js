module.exports = {
  extends: '@liutsing/eslint-config',
  ignorePatterns: ['*.js'],
  rules: {
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
  },
}

module.exports = {
  extends: '@liutsing/eslint-config',
  ignorePatterns: ['*.js', 'packages/rspack', 'packages/rsbuild'],
  rules: {
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
  },
}

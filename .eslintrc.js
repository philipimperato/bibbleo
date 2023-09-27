module.exports = {
  extends: [
    'plugin:vue/base'
  ],
  rules: {
    'vue/no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  parserOptions: {
    'ecmaVersion': 12,
    parser: '@typescript-eslint/parser'
  }
}
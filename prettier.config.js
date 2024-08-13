module.exports = {
  plugins: [
    require.resolve('prettier-plugin-packagejson'),
    require.resolve('prettier-plugin-organize-imports'),
  ],
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
}

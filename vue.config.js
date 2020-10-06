module.exports = {
  /* configureWebpack: {
    devtool: 'source-map'
  }, */ // vscode add-in
  // mode: "development",
  // publicPath: "./",
  // disable eslint only if absolutely worthwhile to go live now
  chainWebpack: (config) => (process.env.NODE_ENV === 'development'
    ? config.module.rules.delete('eslint')
    : null),
  publicPath: process.env.NODE_ENV === 'development' ? './' : '',
};

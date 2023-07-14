const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { isDevelopment } = require('./environment');

const jsLoader = (() => ({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [{ loader: 'babel-loader' }],
}))();

const scssLoader = (() => {
  const localIdentName = isDevelopment
    ? '[name]__[local]--[hash:base64:5]'
    : '[hash:base64:5]';

  return {
    test: /\.(scss|sass|css)$/,
    // exclude: /node_modules/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: { localIdentName },
          sourceMap: true,
          importLoaders: 1,
        },
      },
      {
        loader: 'sass-loader',
      },
    ],
  };
})();

module.exports = {
  jsLoader,
  scssLoader,
};

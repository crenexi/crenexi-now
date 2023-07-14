const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const Zlib = require('zlib');
const { isDevelopment } = require('./environment');

/* #################
#### Bundling ######
################# */

// HTML transforms
const htmlPlugin = new HtmlPlugin({
  template: './public/index.html',
  filename: 'index.html',
});

// CSS transforms
const cssPlugin = new MiniCssExtractPlugin({
  filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
  chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash].css',
});

// Asset transforms
const copyPlugin = new CopyPlugin({
  patterns: [
    {
      from: './public',
      globOptions: {
        dot: true,
        gitignore: true,
        ignore: ['**/index.html'],
      },
    },
  ],
});

/* #################
#### Compress ######
################# */

// Minimizer plugin
// prettier-ignore
const terserPlugin = () => new TerserPlugin({
  terserOptions: {
    parse: {
      ecma: 8,
    },
    compress: {
      ecma: 5,
      warnings: false,
      inline: 2,
    },
    mangle: {
      safari10: true,
    },
    output: {
      ecma: 5,
      comments: false,
    },
  },
  parallel: true,
});

// Compression plugin
// prettier-ignore
const compressionPlugin = () => new CompressionPlugin({
  filename: '[path][base].br',
  algorithm: 'brotliCompress',
  test: /\.(js|css|html|svg)$/,
  compressionOptions: {
    params: {
      [Zlib.constants.BROTLI_PARAM_QUALITY]: 11,
    },
  },
  threshold: 10240,
  minRatio: 0.8,
  deleteOriginalAssets: false,
});

/* #################
#### Utility #######
################# */

// Clean plugin
const cleanPlugin = new CleanWebpackPlugin();

// Environment variables loader
const dotenvPlugin = new Dotenv({
  systemvars: true,
});

// Moment locals plugin
const momentLocalesPlugin = new MomentLocalesPlugin({
  localesToKeep: ['es-us', 'es'],
});

// ESLint plugin
const esLintPlugin = new ESLintWebpackPlugin();

// React Refresh plugin (experimental)
const reactRefreshPlugin = new ReactRefreshPlugin();

module.exports = {
  htmlPlugin,
  cssPlugin,
  copyPlugin,
  terserPlugin,
  compressionPlugin,
  cleanPlugin,
  dotenvPlugin,
  momentLocalesPlugin,
  esLintPlugin,
  reactRefreshPlugin,
};

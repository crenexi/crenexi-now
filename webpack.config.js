const path = require('path');

const { env, isDevelopment, isProduction } = require('./config/environment');
const { jsLoader, scssLoader } = require('./config/loaders');
const { aliasPaths } = require('./config/aliases');
const plugins = require('./config/plugins');

const DIST_PATH = path.join(__dirname, '/dist');

/* #################
#### Config ########
################# */

const config = {
  mode: env,
  entry: './src/main.jsx',
  output: {
    path: DIST_PATH,
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: aliasPaths,
  },
  module: {
    rules: [jsLoader, scssLoader],
  },
  devServer: {
    port: 4200,
    hot: true,
    compress: false,
    historyApiFallback: true,
    client: {
      reconnect: true,
      overlay: true,
    },
  },
  devtool: isProduction ? false : 'eval-cheap-source-map',
  performance: isDevelopment && {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

/* #################
#### Plugins #######
################# */

config.plugins = [
  plugins.htmlPlugin,
  plugins.cssPlugin,
  plugins.copyPlugin,
  plugins.cleanPlugin,
  plugins.dotenvPlugin,
  plugins.momentLocalesPlugin,
  plugins.esLintPlugin,
  ...(!isDevelopment ? [] : [plugins.reactRefreshPlugin]),
  ...(!isProduction ? [] : [plugins.compressionPlugin()]),
];

/* #################
#### Optimization ##
################# */

// Optimize only if production build
if (isProduction) {
  config.optimization = {
    minimize: true,
    minimizer: [plugins.terserPlugin()],
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all',
    },
  };
}

module.exports = config;

const path = require('path');

const aliases = {
  '@src': './src',
  '@core': './src/core',
  '@scenes': './src/scenes',
  '@store': './src/store',
  '@config': './src/shared/config',
  '@constants': './src/shared/constants',
  '@types': './src/shared/types',
  '@contexts': './src/shared/contexts',
  '@hooks': './src/shared/hooks',
  '@helpers': './src/shared/helpers',
  '@services': './src/shared/services',
  '@components': './src/shared/components',
  '@styles': './src/shared/styles',
  '@sutils': './src/shared/helpers/scss',
};

const toAliasPaths = (obj, [key, val]) => {
  return { ...obj, [key]: path.resolve(__dirname, `../${val}`) };
};

const aliasPaths = Object.entries(aliases).reduce(toAliasPaths, {});

module.exports = { aliasPaths };

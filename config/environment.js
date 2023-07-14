const processEnv = process.env.BABEL_ENV || process.env.NODE_ENV;

const env = processEnv || 'development';
const isProduction = env === 'production';
const isDevelopment = env === 'development';

module.exports = { env, isProduction, isDevelopment };

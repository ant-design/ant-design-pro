const webpack = require('webpack');

module.exports = (webpackConfig) => {
  // Avoid import all locale file of moment
  webpackConfig.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
  return webpackConfig;
};

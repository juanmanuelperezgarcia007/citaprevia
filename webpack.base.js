const webpack = require('webpack');
// Shareable config
const Config = require('webpack-config').Config;

console.log('Running webpack for environment: ' + process.env.environment);

module.exports.default = new Config().merge({
  module: {
    rules: []
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.environment)
    })
  ]
});

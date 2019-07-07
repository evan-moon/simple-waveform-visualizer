const base = require('./base.conf');
const merge = require('webpack-merge');

module.exports = merge(base, {
  devtool: 'source-map',
  devServer: {
    open: false,
  }
});
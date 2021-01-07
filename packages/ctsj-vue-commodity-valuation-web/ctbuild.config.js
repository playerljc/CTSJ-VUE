const path = require('path');

const modifyVars = require('./themes/default/vars');

module.exports = {
  getTheme() {
    return modifyVars;
  },
  getConfig({ webpackConfig }) {
    if (webpackConfig.mode === 'development') {
      delete webpackConfig.devServer.port;
    }

    webpackConfig.resolve.alias['@ctsj/vue'] = path.join(__dirname, 'src', 'vue', 'core');

    webpackConfig.module.rules[2].use[3].options.modules = {
      localIdentName: '[path][name]__[local]--[hash:base64:5]',
    };
  },
};

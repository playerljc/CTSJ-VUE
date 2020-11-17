const modifyVars = require('./themes/default/vars');

module.exports = {
  getTheme() {
    return modifyVars;
  },
  getConfig({ webpackConfig }) {

  },
};

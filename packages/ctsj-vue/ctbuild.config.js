const path = require('path');

module.exports = {
  getConfig({ webpackConfig }) {
    webpackConfig.devServer.port = 8081;

    webpackConfig.resolve.alias['@ctsj/vue-router'] = path.join(__dirname, 'src', 'router');
    // webpackConfig.resolve.alias['@ctsj/vue-router/lib'] = path.join(__dirname, 'src', 'router');

    webpackConfig.module.rules[0].use[2].query.plugins.push([
      '@babel/plugin-transform-modules-commonjs',
      { strictMode: false },
    ]);
  },
};

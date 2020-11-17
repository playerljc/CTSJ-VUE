module.exports = {
  getConfig({ webpackConfig }) {
    if(webpackConfig.mode === 'development') {
      webpackConfig.devServer.port = 8081;
    }

    webpackConfig.module.rules[0].use[2].query.plugins.push([
      '@babel/plugin-transform-modules-commonjs',
      { strictMode: false },
    ]);
  },
};

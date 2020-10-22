module.exports = {
  getConfig({ webpackConfig }) {
    webpackConfig.module.rules[0].use[2].query.plugins.push([
      '@babel/plugin-transform-modules-commonjs',
      { strictMode: false },
    ]);
  },
};

const config = require('./rollup.config');
const { terser } = require('rollup-plugin-terser');

config.map((conf, index) => {
  conf.output.sourcemap = true;

  if (index === 0) {
    conf.plugins = [
      ...conf.plugins,
      ...[
        terser()
      ]
    ]
  }

  return conf;
})

module.exports = config;
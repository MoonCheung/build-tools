const config = require('./rollup.config');
const serve = require('rollup-plugin-serve');
const path = require('path');

const parsingPath = url => {
  return path.join(__dirname, '..', url);
}

// dev server
const PORT = 3030;

config.map((conf, index) => {
  conf.output.sourcemap = true;

  if (index === 0) {
    conf.plugins = [
      ...conf.plugins,
      ...[
        serve({
          port: PORT,
          contentBase: parsingPath('./public/home')
        })
      ]
    ]
  }

  return conf;
})

module.exports = config;
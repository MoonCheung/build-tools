const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');
const postcss = require('rollup-plugin-postcss');
const alias = require('@rollup/plugin-alias');
const css = require('rollup-plugin-css-only');
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');
const vue = require('rollup-plugin-vue');
const sass = require('node-sass');
const path = require('path');

const parsingPath = url => {
  return path.join(__dirname, '..', url);
}

// `yarn build` -> `production` is true
// `yarn dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;
const babelConfig = require('../babel.config');

const processSass = function(context, payload) {
  return new Promise((resolve, reject) => {
    sass.render({
      file: context
    }, function(err, result) {
      if (!err) {
        resolve(result);
      } else {
        reject(err)
      }
    });
  })
}

// rollup 插件
const plugins = [
  babel(babelConfig),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.VUE_ENV': JSON.stringify('browser')
  }),
  alias({
    entries: {
      'vue': require.resolve('vue/dist/vue.esm.js')
    }
  }),
  postcss({
    extract: true,
    minimize: production,
    extensions: ['css', 'scss'],
    process: processSass,
  }),
  resolve(),
  commonjs(),
  json(),
  css(),
  vue({
    css: false,
    // TODO: 暂时不使用SSR这些选项，因为打包出来会报错: this._ssrEscape is not a function
    // template: {
    //   isProduction: production,
    //   optimizeSSR: production
    // }
  })
]

module.exports = [{
  input: parsingPath('./src/home/index.js'),
  output: {
    file: parsingPath('./public/home/bundle.js'),
    format: 'umd',
  },
  plugins: [
    ...plugins
  ]
}];
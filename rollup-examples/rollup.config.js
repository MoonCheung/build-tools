import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import alias from '@rollup/plugin-alias';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import sass from 'node-sass';

// `yarn build` -> `production` is true
// `yarn dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;
const babelConfig = require('./babel.config');

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
      'vue': 'vue/dist/vue.runtime.esm.js'
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
  production && terser()
]

export default [{
  input: './src/home/index.js',
  output: {
    file: './public/home/bundle.js',
    format: 'umd'
  },
  plugins: [
    ...plugins
  ]
}, {
  input: './src/home1/index.js',
  output: {
    file: './public/home1/bundle.js',
    format: 'umd'
  },
  plugins: [
    ...plugins
  ]
}]
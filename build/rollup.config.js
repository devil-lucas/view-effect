const { resolve } = require('path');
const resolvePlugin = require('rollup-plugin-node-resolve');
const commonJsPlugin = require('rollup-plugin-commonjs');
const typescriptPlugin = require('rollup-plugin-typescript2');

export default {
  input: resolve(__dirname, '../src/index.ts'),
  output: {
    file: resolve(__dirname, '../dist/index.js'),
    format: 'umd',
    name: 'ViewEffect',
  },
  plugins: [
    resolvePlugin(),
    commonJsPlugin(),
    typescriptPlugin({
      exclude: /(node_modules)/,
      typescript: require('typescript'),
    }),
  ],
};

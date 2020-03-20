const { resolve } = require('path');
const typescript = require('rollup-plugin-typescript2');

export default {
  input: resolve(__dirname, '../src/index.ts'),
  output: {
    file: resolve(__dirname, '../dist/index.js'),
    format: 'umd',
    name: 'ViewEffect',
  },
  plugins: [
    typescript({
      exclude: /(node_modules)/,
      typescript: require('typescript'),
    }),
  ],
};

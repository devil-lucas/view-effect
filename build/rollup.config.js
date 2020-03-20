const { resolve } = require('path');
const rollupTs = require('@rollup/plugin-typescript');

export default {
  input: resolve(__dirname, '../src/index.ts'),
  output: {
    file: resolve(__dirname, '../dist/index.js'),
    format: 'umd',
    name: 'ViewEffect',
  },
  plugins: [
    rollupTs(),
  ],
};

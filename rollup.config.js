/*
 * @rollup.config.js
 * @deprecated
 * @author czh
 * @update (czh 2022/4/29)
 */
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve'

import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'

import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'
const config = [
  {
    input: './packages/mini-wechat/index.ts', // 必须，入口文件
    output: [
      {
        file: './dist/mini-wechat/ab-test-sdk-mini-wechat.js',
        format: 'umd',
        name: 'ab-test-sdk-mini-wechat',
      },
      {
        file: './dist/mini-wechat/ab-test-sdk-mini-wechat.es.js',
        format: 'es',
        name: 'ab-test-sdk-mini-wechat',
      },
      {
        file: './dist/mini-wechat/ab-test-sdk-mini-wechat.cjs.js',
        format: 'cjs',
        name: 'ab-test-sdk-mini-wechat',
      },
    ],
    plugins: [
      // 引入的插件在这里配置
      resolve(),
      typescript(),
      babel({
        exclude: '**/node_modules/**',
      }),
      commonjs(),
      terser(),
      cleanup({ comments: 'none' }),
    ],
  },
]

export default config

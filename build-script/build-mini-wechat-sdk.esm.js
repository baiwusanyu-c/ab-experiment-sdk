// 专门打包util，指令，hook
import { parallel } from 'gulp'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'
import replace from 'rollup-plugin-replace'
import dts from "rollup-plugin-dts";
import { build } from "./utils";
import packageJson from "../package.json"
const version = packageJson.version
const config = {
    input: '../packages/mini-wechat/index.ts', // 必须，入口文件
    plugins: [
        // 引入的插件在这里配置
        resolve(),
        replace({
            'process.env.CURRENT_ENV':'`mini-wechat`'
        }),
        typescript(),
        babel({
            babelHelpers:'runtime',
            presets: ['@babel/preset-env'],
            exclude: '**/node_modules/**',
            plugins:['@babel/plugin-transform-runtime']
        }),
        commonjs(),
        cleanup({ comments: 'none' }),
    ],
}
process.env.CURRENT_DEV_ENV !== 'dev' && config.plugins.push(terser())

const buildConfig =  [

        {
            file: `../dist/mini-wechat/esm/ab-mini-wechat_v${version}.js`,
            format: 'es',
            inlineDynamicImports:true,
            name: 'ab-mini-wechat',
        },
        {
            file: `../dist/mini-wechat/cjs/ab-mini-wechat_v${version}.cjs.js`,
            format: 'cjs',
            inlineDynamicImports:true,
            name: 'ab-mini-wechat',
        },
]

const typeConfig = {
    input: '../packages/mini-wechat/index.ts', // 必须，入口文件
    plugins: [resolve(),dts()],
}
const buildTypeConfig = [
    {
        file: `../dist/mini-wechat/types/ab-mini-wechat_v${version}.d.ts`,
        format: 'es',
    }
]

// 打包处理
export const buildPackages = () => {
    return parallel(()=>build(config,buildConfig),()=>build(typeConfig,buildTypeConfig))
}
export default buildPackages()

// 专门打包util，指令，hook
import {parallel} from 'gulp'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import cleanup from 'rollup-plugin-cleanup'
import replace from 'rollup-plugin-replace'
import {terser} from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts';
import { build } from "./utils";

const config = {
        input: '../packages/web/index.ts', // 必须，入口文件
        plugins: [
            // 引入的插件在这里配置
            resolve(),
            typescript(),
            replace({
                'process.env.CURRENT_ENV': '`web`'
            }),
            babel({
                presets: ['@babel/preset-env'],
                exclude: '**/node_modules/**',
            }),
            commonjs(),
            cleanup({comments: 'none'}),
        ],
}

process.env.CURRENT_DEV_ENV !== 'dev' && config.plugins.push(terser())

const buildConfig = [
    {
        file: '../dist/web/esm/ab-test-sdk-web.esm.js',
        format: 'es',
        inlineDynamicImports: true,
        name: 'ab-test-sdk-web',
    },
    {
        file: '../dist/web/cjs/ab-test-sdk-web.cjs.js',
        format: 'cjs',
        inlineDynamicImports: true,
        name: 'ab-test-sdk-web',
    },
]

const typeConfig = {
    input: '../packages/web/index.ts', // 必须，入口文件
    plugins: [resolve(),dts()],
}
const buildTypeConfig = [
    {
        file: '../dist/web/types/ab-test-sdk-web.d.ts',
        format: 'es',
    }
]


// 打包处理
export const buildPackages = () => {
    return parallel(()=>build(config,buildConfig),()=>build(typeConfig,buildTypeConfig))
}
export default buildPackages()

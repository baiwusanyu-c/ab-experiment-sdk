// 专门打包util，指令，hook
import { parallel } from 'gulp'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { rollup } from 'rollup'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'
const config = {
    input: '../packages/mini-wechat/index.ts', // 必须，入口文件
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
}
const buildConfig =  [
        {
            file: '../dist/mini-wechat/ab-test-sdk-mini-wechat.js',
            format: 'umd',
            name: 'ab-test-sdk-mini-wechat',
        },
        {
            file: '../dist/mini-wechat/ab-test-sdk-mini-wechat.es.js',
            format: 'es',
            name: 'ab-test-sdk-mini-wechat',
        },
        {
            file: '../dist/mini-wechat/ab-test-sdk-mini-wechat.cjs.js',
            format: 'cjs',
            name: 'ab-test-sdk-mini-wechat',
        },
]


// 打包处理
export const buildPackages = (dirname, name) => {
    const build = async () =>{
        const bundle = await rollup(config)
        return Promise.all(
            buildConfig.map(option => {
                bundle.write(option)
            })
        )
    }
    return parallel(build)
}
export default buildPackages()
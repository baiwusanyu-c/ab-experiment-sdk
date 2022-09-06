import chokidar from 'chokidar'
import {run} from "./utils";
import {ENV} from "@ab-test-sdk/utils";
import fs from 'fs-extra'

const curEnv = process.env.CURRENT_ENV
const copyToDir = async (source,target) =>{
    await fs.copySync(source,target)
}
const watchPath = curEnv === ENV.WEB ? '../packages/web/index.ts' : '../packages/mini-wechat/index.ts'
const watcher = chokidar.watch(watchPath, {
    atomic: true,
    followSymlinks: true,
}).on('all', async (event, pathDir) => {

    if (event === 'change' && curEnv === ENV.WEB){

        console.log('update file change ......')
        await run('pnpm run --filter @ab-test-sdk/build --parallel build:web')
        const distPath = '../dist/web/esm'
        const playPath = '../play/src'
        await copyToDir(distPath,playPath)
    }

    if (event === 'change' && curEnv === ENV.MINI_WECHAT){

        console.log('update file change ......')
        await run('pnpm run --filter @ab-test-sdk/build --parallel build:wechat')
        const distPath = '../dist/mini-wechat/cjs'
        const playPath = '../play-miniwechat'
        await copyToDir(distPath,playPath)
    }
})
watcher.add('../packages/core')


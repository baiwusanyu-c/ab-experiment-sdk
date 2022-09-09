import chokidar from 'chokidar'
import {run} from "./utils";
import fs from 'fs-extra'


const copyToDir = async (source,target) =>{
    await fs.copySync(source,target)
}

const curEnv = process.env.CURRENT_ENV
const platformOption = {
    'web':{
        watchPath:'../packages/web/index.ts',
        command:'pnpm run --filter @ab-test-sdk/build --parallel build:web',
        distPath:'../dist/web/esm',
        playPath:'../play/src'
    },
    'mini-wechat':{
        watchPath:'../packages/mini-wechat/index.ts',
        command:'pnpm run --filter @ab-test-sdk/build --parallel build:wechat',
        distPath:'../dist/mini-wechat/esm',
        playPath:'../play-miniwechat'
    },
    'mini-douyin':{
        watchPath:'../packages/mini-douyin/index.ts',
        command:'pnpm run --filter @ab-test-sdk/build --parallel build:douyin',
        distPath:'../dist/mini-douyin/esm',
        playPath:'../play-minidouyin'
    },
}

const platformConfig = platformOption[curEnv]
const watcher = chokidar.watch(platformConfig.watchPath, {
    atomic: true,
    followSymlinks: true,
}).on('all', async (event, pathDir) => {

    if (event === 'change'){

        console.log('update file change ......')
        await run(platformConfig.command)
        await copyToDir(platformConfig.distPath,platformConfig.playPath)
    }
})
watcher.add('../packages/core')
watcher.add('../utils')


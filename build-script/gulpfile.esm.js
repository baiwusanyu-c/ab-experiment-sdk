/*
 * @deprecated
 * @author czh
 * @update (czh 2022/7/22)
 */
// 打包方式：串行(series)  并行(parallel)
import { series } from 'gulp'
import { run, withTaskName } from './utils.js'

export default series(
  withTaskName('clean', async () => run('pnpm run clean')), // 删除dist目录

  withTaskName('build mini wechat sdk....', async () => {
    await run('pnpm run --filter @ab-test-sdk/build --parallel build:wechat')
  }),

  withTaskName('build mini douyin sdk....', async () => {
      await run('pnpm run --filter @ab-test-sdk/build --parallel build:douyin')
  }),

  withTaskName('build web sdk....', async () => {
      await run('pnpm run --filter @ab-test-sdk/build --parallel build:web')
  }),

)

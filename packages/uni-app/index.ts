import { cbdABTest } from '@ab-test-sdk/core'
import { setRequestInst } from '@ab-test-sdk/utils'
export * from '@ab-test-sdk/core'
export * from '@ab-test-sdk/utils'

// 设置 uniapp 的请求脚本
setRequestInst(import('@ab-test-sdk/utils/fetch/fetch-mini-app'))

export const ABTest = (funcName: string, ...arg: any[]) => {
  return cbdABTest(funcName, ...arg)
}

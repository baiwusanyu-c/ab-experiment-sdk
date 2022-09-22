import { cbdABTest } from '@ab-test-sdk/core'
import { setRequestInst } from '@ab-test-sdk/utils'
export * from '@ab-test-sdk/core'
export * from '@ab-test-sdk/utils'

// 设置微信小程序的请求脚本
setRequestInst(import('../../utils/fetch/fetch-wechat-douyin'))

export const ABTest = (funcName: string, ...arg: any[]) => {
  return cbdABTest(funcName, ...arg)
}

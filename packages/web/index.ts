import { cbdABTest } from '@ab-test-sdk/core'
import { setRequestInst } from '@ab-test-sdk/utils'
export * from '@ab-test-sdk/core'
export * from '@ab-test-sdk/utils'

// 设置web的请求脚本
setRequestInst(import('../../utils/fetch/fetch-web'))

export const ABTest = (funcName: string, ...arg: any[]) => {
  return cbdABTest(funcName, ...arg)
}

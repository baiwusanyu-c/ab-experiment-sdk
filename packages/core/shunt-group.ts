import hash from 'hash-it'
import type { IExpConfig, IOption } from '@ab-test-sdk/utils'
import type { sdk } from './core'

/**
 * 分流方法
 */
export const abTestShunt = (ctx: typeof sdk) => {
  const config = ctx.expConfig
  const shuntResArr: IOption = {}
  config.forEach((val: IExpConfig) => {
    const shuntRes = shuntAlgorithm(ctx.configOption.userId!, val.experimentTrafficWeight)
    shuntResArr[val.experimentId] = {
      ...val,
      ...shuntRes,
    }
  })
  return shuntResArr
}
/**
 * hash取模分流
 * @param key
 * @param weight
 */
export const shuntAlgorithm = (key: string, weight: number) => {
  const value = Math.abs(hash(key)) % 1000
  const res = value / 10
  return {
    isEntry: res <= weight, // res <= weight * 10,
    hashVal: res,
  }
}
/**
 * 分组方法
 */
export const abTestGrouping = (ctx: typeof sdk, expShuntRes: IOption, defaultVal: string) => {
  let totalWeight = 0
  const expShuntResVal = expShuntRes
  const versionWeight = expShuntResVal.hashVal! * (100 / expShuntResVal.experimentTrafficWeight)
  const res = {
    msg: 'group successfully',
    res: {
      isEntryVersion: false,
      versionId: 0,
      versionParam: {},
    },
    status: false,
  }
  for (let i = 0; i < expShuntResVal.versions.length; i++) {
    totalWeight += expShuntResVal.versions[i].versionTrafficWeight
    // 小于版本权重 且不在白名单内
    if (
      versionWeight < totalWeight &&
      (!expShuntResVal.versions[i].whitelist ||
        expShuntResVal.versions[i].whitelist.indexOf(ctx.configOption.userId!) < 0)
    ) {
      res.res = {
        isEntryVersion: true,
        versionId: expShuntResVal.versions[i].versionId,
        versionParam: expShuntResVal.versions[i].versionParam,
      }
      res.status = true
      break
    }
  }
  return res
}

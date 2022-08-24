import { experimentConfig, extend, isFunction, log } from '@ab-test-sdk/utils'
import hash from 'hash-it'
import defaultConfig from './config'
import type { IConfigMiniWechat, IExpConfig, IOption } from '@ab-test-sdk/utils'
export const sdk = {
  configOption: {} as IConfigMiniWechat, // sdk配置
  log: false, // 开启日志
  expConfig: [] as Array<IExpConfig>, // 实验配置
  timer: 0, // 自动刷新定时器
  isInit: false, // 是否初始化
  shuntRes: {} as IOption, // 分流结果
  /**
   * 初始化sdk
   * （完成）
   */
  init(config: IConfigMiniWechat) {
    this.log && log('init running')
    // 合并配置
    this.configOption = mergeConfig(config, defaultConfig)
    this.log = this.configOption.log
    this.isInit = true
  },
  /**
   * 初始化完成，开始获取实验信息
   * 获取实验参数，即通过分流算法获取结果
   * 结果将存储在sdk实例对象上
   */
  async start(cb: any) {
    if (!this.isInit) {
      this.log && log('sdk not initialized')
      return
    }
    this.log && log('start running')

    // 获取实验参数(可以考虑做本地存储)
    this.expConfig = await getExperimentConfig(this.configOption.appKey!, this)
    if (!this.expConfig) return

    // 根据参数进行分流，并存储到sdk实例
    this.shuntRes = abTestShunt(this)
    // 如果配置了自动刷新
    if (this.configOption.autoRefresh) {
      autoRefresh(this)
    }
    return cb && cb(this.expConfig)
  },
  /**
   * 获取实验参数，即通过分组算法获取结果
   * 接受一个实验id，让开发者在合适的时候获取对应的分组结果
   * @param expId 实验id
   */
  getVar(expId: string) {
    if (!this.isInit) {
      this.log && log('sdk not initialized')
      return
    }
    this.log && log('getVar running')
    // 进行分组
    const expShuntRes = this.shuntRes[expId]
    if (expShuntRes.isEntry) {
      abTestGrouping(this, expShuntRes)
      // TODO: 分组后获取版本参数并返回
    }
  },

  /**
   * 修改config,在自动模式开启时会自动生效，否则需要手动start
   * （完成）
   */
  config(nConfig: IConfigMiniWechat) {
    if (!this.isInit) {
      this.log && log('sdk not initialized')
      return
    }
    // 根据现有config 进行合并更新
    this.configOption = mergeConfig(nConfig, this.configOption)
    this.log && log('config set success !')
  },
  /**
   * 刷新实验配置，刷新后会自动重新分流，你需要重新调用getVar
   */
  async refresh() {
    if (!this.isInit) {
      this.log && log('sdk not initialized')
      return
    }
    // 获取实验参数，并缓存本地
    this.expConfig = await getExperimentConfig(this.configOption.appKey!, this)
    if (!this.expConfig) return

    // 根据参数进行分流，并存储到sdk实例
    this.shuntRes = abTestShunt(this)
  },

  /**
   * 触发自定义事件
   * (预留，现阶段不需要)
   */
  triggerEvt() {
    if (!this.isInit) {
      this.log && log('sdk not initialized')
      return
    }
    this.log && log('triggerEvt')
  },
}
/**
 * 合并配置
 * @param config
 * @param defaultConfigs
 * （完成）
 */
export const mergeConfig = (config: IConfigMiniWechat, defaultConfigs = defaultConfig) => {
  return extend(defaultConfigs, config)
}

/**
 * 导出的api入口
 * @param funcName
 * @param arg
 * （完成）
 */
export const cbdABTest = (funcName: string, ...arg: any[]) => {
  if (sdk[funcName as keyof typeof sdk] && isFunction(sdk[funcName as keyof typeof sdk])) {
    ;(sdk[funcName as keyof typeof sdk] as Function)(...arg)
  }
  return sdk
}
/**
 * 获取实验配置
 * @param appKey
 * @param ctx
 * （完成）
 */
export const getExperimentConfig = async (appKey: number, ctx: typeof sdk) => {
  const params = { appKey }
  const res = await experimentConfig(params)
  if (!res) {
    ctx.log && log('Failed to get experimental parameters')
    return
  }
  ctx.log && log('The experimental parameters were successfully obtained')
  return res
}
/**
 * 分流方法
 */
export const abTestShunt = (ctx: typeof sdk) => {
  const config = ctx.expConfig
  const shuntResArr: IOption = {}
  config.forEach((val: IExpConfig, index: number) => {
    // TODO:分流
    // TODO:存储分流结果
    const isEntry = shuntAlgorithm(ctx.configOption.userId!, val.experimentTrafficWeight)
    shuntResArr[val.experimentId] = {
      ...val,
      isEntry,
    }
  })
  return shuntResArr
}
/**
 * hash取模分流算法
 * @param key
 * @param weight
 */
export const shuntAlgorithm = (key: string, weight: number) => {
  const value = Math.abs(hash(key)) % 1000
  const res = value / 10
  return res <= weight * 10
}
/**
 * 分组方法
 */
export const abTestGrouping = (ctx: typeof sdk, expShuntRes: IExpConfig) => {
  // const value = Math.abs(hash(`${ctx.expConfig.userId}abTestGrouping`)) % 100
  // const weight = value / 10
  // return weight <= ctx.expConfig.versionTrafficWeight * 10
  const expShuntResVal = expShuntRes
  expShuntResVal.versions.forEach(val => {
    // TODO:分组
    // TODO:存储分组结果及对应版版本参数到sdk实例
  })
  // TODO:根据分组结果获取版本参数
}
/**
 * hash取模分流算法
 * @param key
 * @param weight
 */
export const groupingAlgorithm = (key: string, weight: number) => {
  const value = Math.abs(hash(key)) % 1000
  const res = value / 10
  return res <= weight * 10
}
/**
 * 自动刷新实验配置
 * @param ctx
 */
export const autoRefresh = (ctx: typeof sdk) => {
  const step = ctx.configOption.autoRefreshStep
  // @ts-ignore
  ctx.timer = setInterval(async () => {
    ctx.refresh()
  }, step)
}

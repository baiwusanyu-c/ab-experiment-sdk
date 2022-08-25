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
  groupRes: {} as IOption, // 分组流结果
  getExpConfig: Function, // 获取实验参数接口方法，作为属性挂在实例上，和方法解耦
  /**
   * 初始化sdk
   * （完成）
   */
  init(config: IConfigMiniWechat, getExpConfigFunc: Function) {
    this.log && log('init running')
    this.getExpConfig = getExpConfigFunc || getExperimentConfig
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
  async start(cb: Function) {
    if (!this.isInit) {
      this.log && log('sdk not initialized')
      return
    }
    this.log && log('start running')
    // 获取实验参数(可以考虑做本地存储)
    this.expConfig = await this.getExpConfig(this.configOption.appKey!, this)
    if (!this.expConfig) return

    // 根据参数进行分流，并存储到sdk实例
    this.shuntRes = abTestShunt(this)
    // 如果配置了自动刷新
    if (this.configOption.autoRefresh) {
      autoRefresh(this)
    }
    return cb && cb({ expConfig: this.expConfig, shuntRes: this.shuntRes, sdk: this })
  },
  /**
   * 获取实验参数，即通过分组算法获取结果
   * 接受一个实验id，让开发者在合适的时候获取对应的分组结果
   * @param expId 实验id
   * @param defaultVal 异常兜底，异常下直接返回这个值，开发者判断直接走兜底逻辑
   * @param cb 回调
   */
  getVar(expId: string, defaultVal: string, cb: Function) {
    if (!this.isInit) {
      this.log && log('sdk not initialized')
      return
    }
    this.log && log('getVar running')
    // 进行分组
    const expShuntRes = this.shuntRes[expId]
    // 传入的expId 进入实验，则进行分组
    if (expShuntRes && expShuntRes.isEntry) {
      this.groupRes = abTestGrouping(this, expShuntRes)
      this.log && log('group successfully')
      cb && cb(this.groupRes)
    }
    // 传入的expId 没有进入实验
    if (expShuntRes && !expShuntRes.isEntry) {
      this.log && log('user did not enter the experiment')
      cb && cb({ res: defaultVal, msg: 'user did not enter the experiment' })
    }
    // 异常兜底，传入没有的id、
    if (!expShuntRes || this.expConfig.length === 0) {
      this.log && log('unknown exception')
      cb && cb({ res: defaultVal, msg: 'unknown exception' })
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
  async refresh(cb?: Function) {
    if (!this.isInit) {
      this.log && log('sdk not initialized')
      return
    }
    // 获取实验参数，并缓存本地
    this.expConfig = await this.getExpConfig(this.configOption.appKey!, this)
    if (!this.expConfig) return

    // 根据参数进行分流，并存储到sdk实例
    this.shuntRes = abTestShunt(this)
    return cb && cb({ expConfig: this.expConfig, shuntRes: this.shuntRes, sdk: this })
  },
  /**
   * 重置实例方法
   */
  resetInstance() {
    this.configOption = {}
    this.log = false
    this.expConfig = []
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = 0
    this.isInit = false
    this.shuntRes = {}
    this.groupRes = {}
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
 * （单测完成）
 * （完成）
 */
export const mergeConfig = (config: IConfigMiniWechat, defaultConfigs = defaultConfig) => {
  return extend(defaultConfigs, config)
}

/**
 * 导出的api入口
 * @param funcName
 * @param arg
 * （单测完成）
 * （完成）
 */
export const cbdABTest = (funcName: string, ...arg: any[]) => {
  if (funcName === 'start' || funcName === 'refresh') {
    return new Promise(resolve => {
      ;(sdk[funcName as keyof typeof sdk] as Function)(resolve, ...arg)
    })
  }
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
export const abTestGrouping = (ctx: typeof sdk, expShuntRes: IOption) => {
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
  }
  for (let i = 0; i < expShuntResVal.versions.length; i++) {
    totalWeight += expShuntResVal.versions[i].versionTrafficWeight
    // 小于版本权重 且不在白名单内
    if (
      versionWeight < totalWeight &&
      expShuntResVal.versions[i].whitelist.indexOf(ctx.configOption.userId!) < 0
    ) {
      res.res = {
        isEntryVersion: true,
        versionId: expShuntResVal.versions[i].versionId,
        versionParam: expShuntResVal.versions[i].versionParam,
      }
      break
    }
  }
  return res
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

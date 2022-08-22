import { experimentConfig, extend, isFunction, log } from '@ab-test-sdk/utils'
import defaultConfig from './config'
import type { IConfigMiniWechat } from '@ab-test-sdk/utils'
const mergeConfig = (config: IConfigMiniWechat, defaultConfigs = defaultConfig) => {
  return extend(defaultConfigs, config)
}

const sdk = {
  configOption: {} as IConfigMiniWechat,
  log: false,
  expConfig: {} as any,
  timer: 0,
  /**
   * 初始化sdk
   */
  init(config: IConfigMiniWechat) {
    // 合并配置
    this.configOption = mergeConfig(config)
    this.log = this.configOption.log
  },
  /**
   * 初始化完成，开始获取实验信息
   * 获取实验参数，即通过分流算法获取结果
   */
  async start() {
    this.log && log('start')
    // 获取实验参数，并缓存本地
    this.expConfig = await getExperimentConfig(this.configOption.appKey!)
    // 根据参数进行分流
    abTestShunt()
    // 如果配置了自动刷新
    if (this.configOption.autoRefresh) {
      autoRefresh(this)
    }
  },
  /**
   * 获取实验参数，即通过分组算法获取结果
   */
  getVar() {
    this.log && log('getVar')
    // 进行分组
    abTestGrouping()
  },

  /**
   * 修改config,在自动模式开启时会自动生效，否则需要手动start
   */
  config(nConfig: IConfigMiniWechat) {
    // 根据现有config 进行合并更新
    this.configOption = mergeConfig(nConfig, this.configOption)
    this.log && log('config set success !')
  },
  /**
   * 刷新实验配置，刷新后会自动重新分流，你需要重新调用getVar
   */
  async reFresh() {
    // 获取实验参数，并缓存本地
    this.expConfig = await getExperimentConfig(this.configOption.appKey!)
    // 根据参数进行分流
    abTestShunt()
  },

  /**
   * 触发自定义事件
   * (预留，现阶段不需要)
   */
  triggerEvt() {
    this.log && log('triggerEvt')
  },
}
/**
 * 导出的api入口
 * @param funcName
 * @param arg
 */
export const cbdABTest = (funcName: string, ...arg: any[]) => {
  if (sdk[funcName as keyof typeof sdk] && isFunction(sdk[funcName as keyof typeof sdk])) {
    ;(sdk[funcName as keyof typeof sdk] as Function)(...arg)
  }
}
/**
 * 获取实验配置
 * @param appKey
 */
export const getExperimentConfig = async (appKey: number) => {
  const params = { appKey }
  const res = await experimentConfig(params)
  return res
}
/**
 * 分流方法
 */
export const abTestShunt = () => {
  console.info('abTestShunt')
}
/**
 * 分组方法
 */
export const abTestGrouping = () => {
  console.info('abTestGrouping')
}
/**
 * 自动刷新实验配置
 * @param ctx
 */
export const autoRefresh = (ctx: typeof sdk) => {
  const step = ctx.configOption.autoRefreshStep
  ctx.timer = window.setInterval(async () => {
    ctx.expConfig = await getExperimentConfig(ctx.configOption.appKey!)
    abTestShunt()
  }, step)
}

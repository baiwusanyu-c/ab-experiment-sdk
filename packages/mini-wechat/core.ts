import { abTestGrouping, abTestShunt, extend, isFunction, log } from '@ab-test-sdk/utils'
import defaultConfig from './config'
import type { IConfigMiniWechat } from '@ab-test-sdk/utils'
const mergeConfig = (config: IConfigMiniWechat, defaultConfigs = defaultConfig) => {
  return extend(defaultConfigs, config)
}

const sdk = {
  configOption: {} as IConfigMiniWechat,
  log: false,
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
   */
  start() {
    this.log && log('start')
    abTestShunt()
  },
  /**
   * 获取实验参数，即获取分流分组接过参数
   */
  getVar() {
    this.log && log('getVar')
    abTestGrouping()
  },

  /**
   * 修改config
   * (预留，现阶段不需要)
   */
  config(nConfig: IConfigMiniWechat) {
    // 根据现有config 进行合并更新
    this.configOption = mergeConfig(nConfig, this.configOption)
    this.log && log('config set success !')
  },
  /**
   * 触发自定义事件
   * (预留，现阶段不需要)
   */
  triggerEvt() {
    this.log && log('triggerEvt')
  },
}

export const cbdABTest = (funcName: string, ...arg: any[]) => {
  if (sdk[funcName as keyof typeof sdk] && isFunction(sdk[funcName as keyof typeof sdk])) {
    ;(sdk[funcName as keyof typeof sdk] as Function)(...arg)
  }
}

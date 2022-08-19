import { extend, isFunction, log, testRequest } from '@ab-test-sdk/utils'
import defaultConfig from './config'
import type { IConfigMiniWechat } from '@ab-test-sdk/utils'
const mergeConfig = (config: IConfigMiniWechat) => {
  return extend(defaultConfig, config)
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
    log(this.configOption)
    testRequest()
  },
  /**
   * 获取实验参数
   */
  getVar() {
    this.log && log('getVar')
  },
  /**
   * 修改config
   */
  config() {
    this.log && log('config')
  },
  /**
   * 触发自定义事件
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

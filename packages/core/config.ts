import { extend } from '@ab-test-sdk/utils'
import type { IConfigMiniWechat } from '@ab-test-sdk/utils'

const config: IConfigMiniWechat = {
  appKey: undefined, // 替换成您的APPKEY
  auto_report: false, //自动上报进入页面事件
  reportChannel: 'cn', // 数据上报
  log: false, // 是否打印log
  enableAbTest: true, // 开启A/B Test 功能
  clear_ab_cache_on_user_change: false, //默认切换用户重新获取A/B配置信息, 如果要关闭则clear_ab_cache_on_user_change配置项置为false
  customConfig: {},
  autoRefresh: false,
  autoRefreshStep: 0,
  userId: '',
  isDev: false,
}
/**
 * 设置配置对象
 * @param key
 * @param val
 */
export const setConfig = function (key: string, val: keyof IConfigMiniWechat) {
  if (Object.prototype.hasOwnProperty.call(config, key)) {
    config[key] = val
  } else {
    config.customConfig[key] = val
  }
}

/**
 * 合并配置
 * @param config
 * @param defaultConfigs
 * （单测完成）
 * （完成）
 */
export const mergeConfig = (config: IConfigMiniWechat, defaultConfigs = config) => {
  return extend(defaultConfigs, config)
}

export default config

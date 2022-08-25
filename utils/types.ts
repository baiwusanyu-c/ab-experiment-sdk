export interface IOption {
  [key: string]: any
}

export interface IConfig extends IOption {
  appKey?: number
  reportChannel: 'cn' | 'en'
  log: boolean
  enableAbTest: boolean
  customConfig: IOption
  autoRefresh: boolean
  autoRefreshStep: number
  userId?: string
}
export interface IConfigMiniWechat extends IConfig {
  clear_ab_cache_on_user_change?: boolean
  auto_report?: boolean
}

export interface ISysInfo {
  ab_url: string
  browser: string
  browser_version: string
  device_model: string
  height: number
  language: string
  os_name: string
  os_version: string
  platform: string
  resolution: string
  screen_height: number
  screen_width: number
  width: number
}

export interface IVersionConfig {
  versionId: number
  versionTrafficWeight: number
  whitelist: string
  versionParam: IOption
}
export interface IExpConfig {
  experimentId: number
  experimentKey: string
  experimentTrafficWeight: number
  versions: Array<IVersionConfig>
  hashVal?: number
  isEntry?: boolean
}

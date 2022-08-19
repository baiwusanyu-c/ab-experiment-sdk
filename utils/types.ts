export declare type env = 'web' | 'mini-wechat'
export interface IOption {
  [key: string]: any
}

export interface IConfig extends IOption {
  app_id?: number
  report_channel: 'cn' | 'en'
  log: boolean
  enable_ab_test: boolean
  custom_config: IOption
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

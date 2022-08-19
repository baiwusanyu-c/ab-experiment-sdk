import type { env } from './types'
export enum ENV {
  WEB = 'web',
  MINI_WECHAT = 'mini-wechat',
}
export const currentEnv: env = 'web'

import { ENV } from '../env-config'

export enum ContentType {
  json = 'application/json;charset=UTF-8',
}

export enum HttpMethod {
  post = 'POST',
}

export interface IReqConfig {
  params?: any
  method?: string
  headers?: IHeader
  token?: string
  'Content-Type'?: string
  isDev: boolean
}

export interface IHeader {
  'Content-Type'?: string
  'X-Requested-With'?: string
  token?: string
  [propName: string]: any
}

/**
 * 请求拦截,这里你可以做一些操作
 */
export function interceptorsRequest(url: string, config: IReqConfig) {
  const contentType: string = setContentType(config)
  const reqUrl = setRequestUrl(url, config.isDev)
  const headers = setHeader(contentType, config)
  return {
    contentType,
    reqUrl,
    headers,
  }
}

/**
 * 设置contentType
 * @param config
 */
const setContentType = (config?: IReqConfig): string => {
  if (config && config['Content-Type'] !== undefined) {
    return config['Content-Type']
  } else if (config && config.method === HttpMethod.post) {
    return ContentType.json
  } else {
    return ContentType.json
  }
}
/**
 * 设置请求 url
 * @param url
 * @param isDev
 */
const setRequestUrl = (url: string, isDev: boolean): string => {
  let domain = 'http://47.96.100.195/'
  if (!isDev) {
    domain = 'http://www.abtest.shuxinyc.com'
  }
  return `${domain}/api/${url.replace('//', '/')}`
}
/**
 * 设置请求头
 * @param contentType
 * @param config
 */
const setHeader = (contentType: string, config?: IReqConfig) => {
  const token = !config || config.token === undefined ? '' : config.token
  // @ts-ignore
  const currentEnv: ENV.MINI_WECHAT | ENV.UNI_APP | ENV.MINI_DOUYIN = process.env.CURRENT_ENV
  // @ts-ignore
  if (
    currentEnv === ENV.MINI_WECHAT ||
    currentEnv === ENV.MINI_DOUYIN ||
    currentEnv === ENV.UNI_APP
  ) {
    return {
      token,
      'Content-Type': contentType,
    }
  } else {
    return new Headers({
      token,
      'Content-Type': contentType,
    } as IHeader)
  }
}

/**
 * 响应拦截,这里你可以做一些操作
 */
export const interceptorsResponse = (res: Response, cb: Function) => {
  return cb(res)
}

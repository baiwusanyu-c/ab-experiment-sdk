import { log } from '../utils'
import { ENV } from '../env-config'
import { ContentType, HttpMethod, interceptorsRequest, interceptorsResponse } from './fetch-utils'
import type { IReqConfig } from './fetch-utils'

const request = async (
  url: string,
  config: IReqConfig = {
    params: {},
    method: 'POST',
    headers: {
      'Content-Type': ContentType.json,
      token: '',
    },
    token: '',
    'Content-Type': ContentType.json,
  }
) => {
  // 请求拦截
  const { reqUrl, headers } = interceptorsRequest(url, config)
  // 发送请求
  const promise = await sendRequest(reqUrl, headers as Headers, config)
  // 处理请求结果(响应拦截)
  return interceptorsResponse(promise, handleRes)
}

const setReqByEnv = (env: typeof ENV, curEnv: string) => {
  if (curEnv === env.MINI_DOUYIN) {
    // @ts-ignore
    return tt
  }
  if (curEnv === env.MINI_WECHAT) {
    // @ts-ignore
    return wx
  }
  if (curEnv === env.UNI_APP) {
    // @ts-ignore
    return uni
  }
}
/**
 * 发送请求
 */
function sendRequest(url: string, headers: Headers, config: IReqConfig) {
  return new Promise((resolve, reject) => {
    const currentEnv = process.env.CURRENT_ENV
    // @ts-ignore
    const pReq = setReqByEnv(ENV, currentEnv)
    pReq.request({
      url,
      method: HttpMethod.post,
      data: config.params,
      header: {
        ...headers,
      },
      success: (res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail: (err: Error) => {
        reject(err)
        log(err.message)
      },
    })
  }) as Promise<Response>
}

/**
 * 处理请求结果，这里处理各种状态码
 * @param res
 */
const handleRes = (res: Response) => {
  return res
}

export default request

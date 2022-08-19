import {log} from "../utils";
import {
  IReqConfig,
  ContentType,
  HttpMethod,
  interceptorsRequest,
  interceptorsResponse} from "./fetch-utils";

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
  const promise = await sendRequest(reqUrl, headers, config)
  // 处理请求结果(响应拦截)
  return interceptorsResponse(promise,handleRes)
}


/**
 * 发送请求
 */
function sendRequest(url: string, headers: Headers, config: IReqConfig) {
  return new Promise((resolve) => {
    // @ts-ignore
    wx.request({
      url,
      method: HttpMethod.post,
      data:config.params,
      header: {
        ...headers
      },
      success: (res: any) => {
        resolve(res)
      },
      fail: (err: Error) => {
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

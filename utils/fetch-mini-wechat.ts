/**
 * wx.request 方法二次封装(适用阿里服务接口)
 * create 2020/02/24
 * chenzhihui
 */
interface IRequestParams {
  url: string
  method: string
  header: any
  data: unknown
  isIntercept: boolean
}

//定义请求方法字典
const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}
class Request {
  _header = {
    token: '',
  }
  _baseUrl = ''

  interceptors: Array<Function> = []
  //读取缓存的token
  constructor() {
    // @ts-ignore
    const token = wx.getStorageSync('token')
    if (token) {
      this._header.token = token
    }
  }
  /**
   * 拦截器方法
   * @param {res} Function  object
   */
  intercept(res: Function) {
    return this.interceptors.filter(f => typeof f === 'function').every(f => f(res))
  }
  /**
   * 封装的 wx.request方法
   * @param {url} url string 请求的地址
   * @param {method} method  string 请求方法
   * @param {header} header  object 请求头
   * @param {data} data any 请求参数
   * @param {isIntercept} isIntercept Boolean 启用拦截器，默认开启
   */
  request({ url, method, header = {}, data, isIntercept }: IRequestParams) {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      wx.request({
        url: (this._baseUrl || '') + url,
        method: method || METHOD.GET,
        data,
        header: {
          ...this._header,
          ...header,
        },
        success: (res: any) => {
          if (res.statusCode !== 200) {
            reject(res)
          }
          if (isIntercept) {
            this.intercept(res) && resolve(res)
          } else {
            resolve(res)
          }
        },
        fail: (err: Error) => {
          reject(err)
        },
      })
    })
  }
  //实现请求方法post
  post(url: string, data: unknown, header: unknown, isIntercept: boolean) {
    return this.request({ url, method: METHOD.POST, header, data, isIntercept })
  }
  //设置token
  token(token: string) {
    this._header.token = token
    return this
  }
  //设置header
  header(header: any) {
    this._header = header
    return this
  }
  //设置baseUrl
  baseUrl(baseUrl: string) {
    this._baseUrl = baseUrl
    return this
  }
  //设置拦截器
  interceptor(f: Function) {
    if (typeof f === 'function') {
      this.interceptors.push(f)
    }
    return this
  }
}
export default new Request()
export { METHOD }

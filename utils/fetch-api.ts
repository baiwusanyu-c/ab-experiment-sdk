import { ENV } from './env-config'
let requestInst: any = null
if (process.env.CURRENT_ENV === ENV.MINI_WECHAT) {
  requestInst = import('./fetch-mini-wechat')
} else if (process.env.CURRENT_ENV === ENV.WEB) {
  requestInst = import('./fetch-mini-wechat')
}
function req(url: string, params: any = {}) {
  return new Promise(resolve => {
    requestInst.then((res: { default: { post: Function } }) => {
      res.default.post(url, {}, params, false).then((data: any) => {
        resolve(data)
      })
    })
  })
}
interface IExperimentConfig {
  appKey: number
}
export async function experimentConfig(params: IExperimentConfig) {
  const res = await req('experiment/config/list', params)
  return res
}

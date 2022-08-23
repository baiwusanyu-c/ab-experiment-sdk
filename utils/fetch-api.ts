import { ENV } from './env-config'
let requestInst: any = null

const currentEnv = process.env.CURRENT_ENV
if (currentEnv === ENV.MINI_WECHAT) {
  requestInst = import('./fetch/fetch-mini-wechat')
} else if (currentEnv === ENV.WEB) {
  requestInst = import('./fetch/fetch-web')
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

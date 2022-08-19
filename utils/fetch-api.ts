import { ENV } from './env-config'
let requestInst: any = null
requestInst = import('./fetch-mini-wechat')
if (process.env.CURRENT_ENV === ENV.MINI_WECHAT) {
  requestInst = import('./fetch-mini-wechat')
} else if (process.env.CURRENT_ENV === ENV.WEB) {
  requestInst = import('./fetch-mini-wechat')
  console.log('webbbbbbbbbbbbbbbb')
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
export async function abTestShunt() {
  return req('algorithm/shunt', {})
}
export async function abTestGrouping() {
  return req('algorithm/grouping', {})
}

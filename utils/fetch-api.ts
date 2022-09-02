
let requestInst: any = null

export const setRequestInst = async (reqScript:any) => {
  requestInst = reqScript
  return requestInst
}


function req(url: string, params: any = {}) {
  return new Promise(resolve => {
    requestInst.then((reqFn: { default: Function }) => {
      reqFn
        .default(url, { params }, false)
        .then((res: any) => {
          if (res && res.code === 200) {
            resolve(res.data)
          } else {
            resolve(undefined)
            console.error(res.msg)
          }
        })
        .catch((err: Error) => {
          resolve(undefined)
          console.error('Request error:', err)
        })
    })
  })
}
interface IExperimentConfig {
  appKey?: number | string
}
export async function experimentConfig(params: IExperimentConfig) {
  const res = await req('experiment/config/list', params)
  return res
}

let requestInst: any = null

export const setRequestInst = async (reqScript: any) => {
  requestInst = reqScript
  return requestInst
}

function req(url: string, params: any = {}) {
  return new Promise(resolve => {
    requestInst.then((reqFn: { default: Function }) => {
      reqFn
        .default(url, { params }, false)
        .then((res: any) => {
          if (res && res.code === 200 && res.data && res.data.length > 0) {
            resolve(res.data)
          } else {
            resolve(undefined)
            console.warn(res.msg)
          }
        })
        .catch((err: Error) => {
          resolve(undefined)
          console.warn('Request error:', err)
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

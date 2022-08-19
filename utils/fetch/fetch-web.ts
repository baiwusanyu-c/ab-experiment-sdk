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
    const promise: Response = await sendRequest(reqUrl, headers, config)
    // 处理请求结果(响应拦截)
    return interceptorsResponse(promise,handleRes)
}

/**
 * 发送请求
 */
async function sendRequest(url: string, headers: Headers, config: IReqConfig) {
    return await fetch(url, {
        body: JSON.stringify(config.params), //设置参数
        headers,
        method: HttpMethod.post,
    })
}
const handleRes = async (res: Response) => {
    const parsedRes = await parseRes(res)
    // 如果res.ok，则请求成功
    if (res.ok) {
        return parsedRes
    }
    // 请求失败，返回解析之后的失败的数据
    throw parsedRes
}

const parseRes = async (res: Response) => {
    const contentType = res.headers.get('Content-Type')
    let resVal
    // 判定返回的内容类型，做不同的处理
    if (contentType) {
        if (contentType.indexOf('json') > -1) {
            resVal = await res.json()
        }
        if (contentType.indexOf('text') > -1) {
            resVal = await res.text()
        }
        if (contentType.indexOf('form') > -1) {
            resVal = await res.formData()
        }
        if (contentType.indexOf('video') > -1) {
            resVal = await res.blob()
        }
    } else {
        resVal = await res.text()
    }
    return resVal
}

export default request

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
const callABTest = async (length) =>{
    return new Promise(async (resolve, reject) => {
        const { ABTest } = await (import('./ab-test-sdk-mini-wechat.esm'))

        const sdkKey = `${guid()}${length}`
        ABTest({funcName:'init',sdkKey}, {
            appKey: 'wyb_app_key', // 替换成您的appKey
            log: false, // 是否打印log
            userId:sdkKey,
            //userId:'GACo74wkDIkDzEhkwRwgjGz1123',
        })

        const sdk = await ABTest({funcName:'start',sdkKey})
        // 只返回进入实验的
        if(sdk.res.shuntRes[sdk.res.expConfig[0].experimentId].isEntry){
            resolve({ABTest,sdk,sdkKey:sdkKey})
        }else{
            resolve(null)
        }
    })
}

async function run(length, arr,concurrent) {
    // promise.all 并发调用
    if(concurrent){
        let arrList = []
        for(let i = 0;i < length; i++){
            arrList.push(callABTest(i))
        }
        console.log(`%c ABTest获取实验参数接口调用中...`,'color:#4AB7BD;font-size:25px')
        arr = await Promise.all(arrList)
        arr = [...new Set(arr)].filter((val)=>val)
    }else{
        for(let i = 0;i < length; i++){
            // 初始化sdk，并分流
            const res = await callABTest(i)
            console.log(`%c ${((i / length) * 100).toFixed()}%`,'color:#4AB7BD;font-size:25px')
            if(!res) continue
            arr.push(res)
        }
    }
    return arr
}

export async function testResult(num,concurrent=true) {
    const dateList = ['2022-09-14']
    let res = []
    for(let i = 0;i < dateList.length; i++){

        const resData = await run(num, [],concurrent);
        res.push({
            date:dateList[i],
            res:resData
        })
    }

    return res
}


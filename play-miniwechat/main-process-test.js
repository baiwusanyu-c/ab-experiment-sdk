
const callABTest = async (length) =>{
    return new Promise(async (resolve, reject) => {
        const { ABTest } = await (import('./ab-test-sdk-mini-wechat.esm'))

        const sdkKey = `GACo74wkSCABTESTDIkDzEhkwRwgjGt1pqlk${length}`
        ABTest({funcName:'init',sdkKey}, {
            appKey: 'SC_TEST_APP', // 替换成您的appKey
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

async function run(length, arr) {
    for(let i = 0;i < length; i++){
        // 初始化sdk，并分流
        const res = await callABTest(i)
        console.log(`%c ${((i / length) * 100).toFixed()}%`,'color:#4AB7BD;font-size:25px')
        if(!res) continue
        arr.push(res)
    }
    return arr
}

export async function testResult(num) {
    let res = await run(num, []);
    return res
}


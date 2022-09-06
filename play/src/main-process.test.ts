
// @ts-ignore
import { ABTest } from '../../dist/web/ab-test-sdk-web.esm'

const callABTest = async (length:number) =>{
    return new Promise(async (resolve, reject) => {
        // @ts-ignore
        // const { ABTest } = await (import('./index'))
        ABTest('init', {
            appKey: 'SDK_TEST_WB_APP', // 替换成您的appKey
            log: false, // 是否打印log
            userId:`GACo74wkDIkDzEhkwRwgjGt1pqlk${length}`,
            //userId:'GACo74wkDIkDzEhkwRwgjGz1123',
        })
        const sdk = await ABTest('start')
        resolve({ABTest,sdk})
    })
}

async function run(length:number, arr:Array<any>) {

    /* let trueNum = 0
     let falseNum = 0
        for(let i = 0;i < length; i++){
         const shuntResFalse = shuntAlgorithm(`${i}`, 90)
         if(shuntResFalse.isEntry) trueNum ++
         if(!shuntResFalse.isEntry) falseNum ++
     }
     console.log("true:",trueNum)
     console.log("false:",falseNum)*/

    for(let i = 0;i < length; i++){
        // 初始化sdk，并分流
        const res = await callABTest(i)
        // 实验版本分组
        // 调用神策sdk上报
        arr.push(res)
    }
    return arr
}

async function getResult() {
    let res = await run(1, []);
    console.log(res)
}
getResult()

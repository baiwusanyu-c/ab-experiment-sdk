import React from 'react'
// @ts-ignore
import { abTestShunt,abTestGrouping ,cbdABTest} from '../../dist/web/ab-test-sdk-web.es'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
cbdABTest('init', {
  appKey: 'CBD_WX_MP', // 替换成您的appKey
  auto_report: false, //自动上报进入页面事件
  reportChannel: 'cn', // 数据上报
  log: true, // 是否打印log
  enableAbTest: false, // 开启A/B Test 功能
  clear_ab_cache_on_user_change: false, //默认切换用户重新获取A/B配置信息, 如果要关闭则clear_ab_cache_on_user_change配置项置为false
  customConfig: {},
})
cbdABTest('start')



/*export const getUuid = (): string => {
    const s: Array<any> = []
    const hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
    s[8] = s[13] = s[18] = s[23] = '-'
    return s.join('')
}


let tnum = 0
let tnumArr = []
let fnum = 0
for (let i = 0;i < 1000000 ;i++){
    let res = abTestShunt({expConfig:{userId:i,experimentTrafficWeight:0.1}})
    if(res) {
        tnumArr[tnum] = i
        tnum++
    }else{
        fnum++
    }
}
console.log(`分流：true:${tnum},false:${fnum}`)

let gtnum = 0

let gfnum = 0
for (let i = 0;i < tnumArr.length ;i++){
    let res = abTestGrouping({expConfig:{userId:tnumArr[i],versionTrafficWeight:0.3}})
    if(res) {
        gtnum++
    }else{
        gfnum++
    }
}
console.log(`分组：A组:${gtnum},B组:${gfnum}`)*/


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)

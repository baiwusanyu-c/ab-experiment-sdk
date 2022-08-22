import React from 'react'
import { cbdABTest } from '@ab-test-sdk/wechat'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
cbdABTest('init', {
  appKey: 123456, // 替换成您的appKey
  auto_report: false, //自动上报进入页面事件
  report_channel: 'cn', // 数据上报
  log: true, // 是否打印log
  enable_ab_test: false, // 开启A/B Test 功能
  clear_ab_cache_on_user_change: false, //默认切换用户重新获取A/B配置信息, 如果要关闭则clear_ab_cache_on_user_change配置项置为false
  custom_config: {},
})
cbdABTest('start')
cbdABTest('config',{appKey:111111})
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)

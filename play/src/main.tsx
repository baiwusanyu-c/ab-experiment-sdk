import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { ABTest } from '../sdk/ab-web_v1.0.0'
ABTest('init', {
  appKey: 'wyb_app_key', // 替换成您的appKey
  log: true, // 是否打印log
  isDev:false,
  autoRefresh:false,
  autoRefreshStep:500,
  userId:'GACo74wkDIkDzEhkwRwgjGt1pqlk',
  //userId:'GACo74wkDIkDzEhkwRwgjGz1123',
})

await ABTest('start')

// import './main-process-test'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)

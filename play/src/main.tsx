import React from 'react'
// @ts-ignore
import { ABTest } from '../../dist/web/ab-test-sdk-web.es'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
ABTest('init', {
  appKey: 'SDK_TEST_WB_APP', // 替换成您的appKey
  log: true, // 是否打印log
   userId:'GACo74wkDIkDzEhkwRwgjGt1pqlk',
  //userId:'GACo74wkDIkDzEhkwRwgjGz1123',
})

await ABTest('start')



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)

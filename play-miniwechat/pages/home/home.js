import {testResult} from '../../main-process-test'
const app = getApp()
Page({
  data: {
    progress:0
  },
  async onInitABTest(){
    let cur = Number((new Date()))
    app.abtest = await testResult(1)
    const logArr = app.abtest.map(val=>{
      return {userId: val.sdkKey}
    })
    console.log(`%c 分流进入实验用户数：${logArr.length}`,'color:#4AB7BD;font-size:20px')
    console.table(logArr)
    console.log('%c abtest 初始化模拟分流完成...','color:#30B08F;font-size:25px')
    console.log(`%c 接口调用耗时:${Number(new Date()) - cur}`,'color:#30B08F;font-size:25px')
  },
  onButtonTap(){
    wx.navigateTo({
      url: `/pages/demo/demo`,
    })
  },
})

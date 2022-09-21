import {testResult} from '../../main-process-test.js'

Page({
  data: {
    userNum:100
  },
  handleChange(e) {
    const { value } = e.detail;
    this.setData({
      userNum:value,
    });
  },
  // onShow(){
  //    const app = getApp()
  //    app.getVarInHome = this.getVar
  // },
  // getVar(data){
  //   console.log(data)
  // },
  async onInitABTest(){
    const app = getApp()
    let cur = Number((new Date()))
    app.abtest = await testResult(this.data.userNum)
    console.log(app.abtest)
    /*let logArr = []
    app.abtest.forEach((val,index)=>{
      logArr.push({date:val.date,userId:[]})
      val.res.forEach(res=>{
        logArr[index].userId.push(res.sdkKey)
      })
    })*/
    const logArr = app.abtest[0].res.map(val=>{
      return {userId: val.sdkKey}
    })
    console.log(`%c 分流进入实验用户数：${logArr.length}`,'color:#4AB7BD;font-size:20px')
    console.table(logArr)
    console.log('%c abtest 初始化模拟分流完成...','color:#30B08F;font-size:25px')
    console.log(`%c 接口调用耗时:${Number(new Date()) - cur}`,'color:#30B08F;font-size:25px')
  },
  onButtonTap(){
    tt.navigateTo({
      url: `/pages/demo/demo`,
    })
  },
})

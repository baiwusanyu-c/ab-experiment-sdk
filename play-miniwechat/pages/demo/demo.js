const app = getApp()
Page({
  data: {
    list:[],
  },
  onGroupABTest(){
    const abtestInst = app.abtest
    const _this = this
    abtestInst.forEach(inst =>{
      // 挨个分流
      const expId = inst.sdk.res.expConfig[0].experimentId
      inst.ABTest({funcName:'getVar',sdkKey:inst.sdkKey},expId,'defaultVersion',(data)=>{
        if(data.res.isEntryVersion){
          this.setData({
            'list': _this.data.list.concat([{...data.res,userId:inst.sdkKey}])
          })
          app.sensors.track('SC_ABTEST',{
            "experimentId": expId, // 实验ID
            "versionId": data.res.versionId,    // 版本ID
            "userId": inst.sdkKey,  // 用户ID
            "color": data.res.versionParam.color    // 是否点击
          });
          console.log('%c sensors 数据上报SC_ABTEST事件完成...','color:#30B08F;font-size:25px')
        }
      })
    })
  },

})

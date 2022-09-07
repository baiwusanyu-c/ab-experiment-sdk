const app = getApp()

Page({
    onShow(){
        const abtestInst = app.abtest
        abtestInst.forEach(inst =>{
            // 挨个分流
            const expId = inst.sdk.res.expConfig[0].experimentId
            inst.ABTest({funcName:'getVar',sdkKey:inst.sdkKey},expId,'defaultVersion',(data)=>{
                console.log(data.res.versionParam.color)
                if(data.res.isEntryVersion){
                   app.sensors.track('SC_ABTEST',{
                       "experimentId": expId, // 实验ID
                       "versionId": data.res.versionId,    // 版本ID
                       "userId": inst.sdkKey,  // 用户ID
                       "color": data.res.versionParam.color    // 是否点击
                   });
                }else{
                   // app.sensors.track('SC_ABTEST',{
                   //     "experimentId": 24, // 实验ID
                   //     "versionId": data.res.versionId,    // 版本ID
                   //     "userId": inst.sdkKey,  // 用户ID
                   //     "isClick": false // 是否点击
                   // });
                }
            })
        })

    }
})

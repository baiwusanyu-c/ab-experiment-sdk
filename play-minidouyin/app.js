const sensors = require('./sensorsdata.autotrack.min');
// 配置初始化参数
sensors.setPara({
  name: 'sensors',
  // server_url:'https://www.baidu.com',
  server_url: 'https://www.trackserver.shuxinyc.com/sa?project=default',
  // 全埋点控制开关
  autoTrack:{
    appLaunch: true, // 默认为 true，false 则关闭 $MPLaunch 事件采集
    appShow: true, // 默认为 true，false 则关闭 $MPShow 事件采集
    appHide: true, // 默认为 true，false 则关闭 $MPHide 事件采集
    pageShow: true, // 默认为 true，false 则关闭 $MPViewScreen 事件采集
    pageShare: true, // 默认为 true，false 则关闭 $MPShare 事件采集
    mpClick: false, // 默认为 false，true 则开启 $MPClick 事件采集
    mpFavorite: true, // 默认为 true，false 则关闭 $MPAddFavorites 事件采集
    pageLeave: false // 默认为 false， true 则开启 $MPPageLeave事件采集
  },
  // 自定义渠道追踪参数，如 source_channel: ["custom_param"]
  source_channel: [],
  // 是否允许控制台打印查看埋点数据(建议开启查看)
  show_log: true,
  // 是否允许修改 onShareAppMessage 里 return 的 path，用来增加(登录 ID，分享层级，当前的 path)，在 app onShow 中自动获取这些参数来查看具体分享来源、层级等
  allow_amend_share_path: true
});

sensors.init();
console.log('%c sensors 初始化模拟完成...','color:#30B08F;font-size:25px')

// 如果需要使用 openid 作为匿名 ID，请单独获取 openid 之后调用 sensors.setOpenid() 方法
/*wx.request({
  url: '后端获取 OpenID 的请求',
  success: function(res){
    if(res.OpenID){
      sensors.setOpenid(res.OpenID);
    }
  },
  complete: function(){
    // 如果获取 openid 失败，SDK 会以 UUID 作为匿名 ID 发数据
    sensors.init();
  }
});*/

App({
  abtest:null,
  async onLaunch() {
    // const { ABTest } = await (import('./ab-test-sdk-mini-wechat.esm'))
    // ABTest('init', {
    //   appKey: 'wyb_app_key', // 替换成您的appKey
    //   log: true, // 是否打印log
    //   userId:'d23d4672-b295-48cf-a8e1-fe841e44829a90', // 用户唯一标识
    // })
    // const sdk = await ABTest('start')
    // this.abtest = sdk
    // const expId = sdk.res.expConfig[0].experimentId
    // ABTest(
    //     'getVar', // 方法名称
    //     expId,// 实验id
    //     'defaultVersion',// 兜底参数，在网络异常，或用户没有命中任何实验时返回
    //     (data)=>{
    //       const app = getApp()
    //       app.getVarInHome(data)
    // })
  }
})

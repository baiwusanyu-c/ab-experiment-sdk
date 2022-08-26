
// 小程序入口文件app.js中初始化并调用start方法后
// 首页index.js中getvar运行时可能接口没有返回
// 1.将首页index.js中getvar逻辑移动到app.js中，并传递给首页index.js使用
// await cbdABTest('getVar','1','defaultVersion',(data)=>{
//   console.log(data)
// })
// 2.使用回调函数，在onLoad中编写回调函数挂在app实例上，onLaunch中等待start执行完再触发getCar
// onLaunch中等待start执行完再执行app上对应回调，进而触发getVar逻辑
// setTimeout(()=>{
//   await cbdABTest('getVar','1','defaultVersion',(data)=>{
//     console.log(data)
//   })
// })
import gulpError from './utils/gulpError'
import { ABTest } from './ab-test-sdk-mini-wechat.esm'
App({
  async onLaunch() {
    ABTest('init', {
      appKey: 'SDK_TEST_WB_APP', // 替换成您的appKey
      log: true, // 是否打印log
      userId: 'GACo74wkDIkDzEhkwRwgjGt1pqlk',
      // userId:'GACo74wkDIkDzEhkwRwgjGz1123',
    })
    const sdk = await ABTest('start')
    console.log(sdk)
    await ABTest('getVar', '24', 'defaultVersion', data => {
      console.log(data)
    })
  },
  onShow() {
    if (gulpError !== 'gulpErrorPlaceHolder') {
      wx.redirectTo({
        url: `/pages/gulp-error/index?gulpError=${gulpError}`,
      })
    }
  },
})

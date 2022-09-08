import { ABTest } from './ab-test-sdk-mini-wechat.esm'



App({
  onLaunch: async function () {
    ABTest('init', {
      appKey: 'SDK_TEST_WB_APP', // 替换成您的appKey
      log: true, // 是否打印log
      autoRefresh:false,
      autoRefreshStep:500,
      userId:'GACo74wkDIkDzEhkwRwgjGt1pqlk',
      //userId:'GACo74wkDIkDzEhkwRwgjGz1123',
    })

    await ABTest('start')
  },
  articleProvider(options) {
    return new Promise((resolve) => {
      resolve({
        //title，contents为必填项！
        title: '图文详情页最大上限支持三行的中文标题字号、字重、行高样式示意',
        author: {
          avatarUrl: '头像地址', // 若存在头像，则必须带上作者名称
          name: '文章作者信息字数上限为十四字',
          publishTime: 1597223004, // 时间戳s
        },
        contents: [{
          imgUrl: '图片地址'
        }, {
          text: '具体内容填充在文件app.js下articleProvider方法。'
        }, {
          imgUrl: '图片地址'
        }, {
          text: '正文字号、字重、行高样式示意。正文字号、字重、行高样式示意。正文字号、字重、行高样式示意。'
        }],
        // 广告位和推广位只能二选一或都不选,都填写则展示广告位
        adId: '广告id',
        recommend: {
          url: '指定跳转内部页面的url', //不能跳转到 TabBar 页面
          imgUrl: '素材图片地址'
        }
      })
    })
  }
})

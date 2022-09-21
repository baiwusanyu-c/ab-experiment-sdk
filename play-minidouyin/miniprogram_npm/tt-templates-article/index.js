import { templateDataValidator } from './validator'

const app = getApp()
const timeago = require('./timeago.js')

Page({
  onLoad(options) {
    this.bindingUserProvider(options)
  },
  bindingUserProvider(options) {
    app
      .articleProvider(options)
      .then(articleData => {
        this.validate(articleData)
        return articleData
      })
      .then(validatedArticleData => this.format(validatedArticleData))
      .then(formatedArticleData => this.setArticleData(formatedArticleData))
      .catch(err => {
        console.error('error: ', err)
      })
  },
  validate(articleData) {
    const tempData = { ...articleData }
    templateDataValidator(tempData)
    if (!articleData.contents) {
      throw 'Contents is required'
    }
    const hasTextOrImg = articleData.contents.every(item => {
      return item.hasOwnProperty('text') || item.hasOwnProperty('imgUrl')
    })
    if (!hasTextOrImg) {
      throw 'Content is empty'
    }
    if (articleData.author && articleData.author.avatarUrl) {
      if (!articleData.author.name) {
        throw 'Author name is required if there exists an avatarUrl'
      }
    }
    return articleData
  },
  format(originArticleData) {
    const formatedArticleData = JSON.parse(JSON.stringify(originArticleData))
    formatedArticleData.contents = originArticleData.contents.map(item => {
      return {
        ...item,
        text: `<div>${item.text}</div>`,
      }
    })
    if (originArticleData.author && originArticleData.author.publishTime) {
      formatedArticleData.author.publishTime = timeago(originArticleData.author.publishTime * 1000)
    }
    return formatedArticleData
  },
  setArticleData(data) {
    return new Promise(resolve => {
      const { title, author = null, contents, adId = '', recommend = {} } = data
      const contentsImgs = contents.map(item => item.imgUrl).filter(item => item !== undefined)
      this.setData(
        {
          is_tt_template: true,
          adIsDeleted: false,
          hasRelative: false,
          title,
          author,
          contents,
          adId,
          recommend,
          contentsImgs,
        },
        resolve()
      )
    })
  },
  closeAd() {
    this.setData({
      adIsDeleted: true,
    })
  },
  jumpToAnotherPage() {
    const recommend = this.data.recommend
    tt.navigateTo({
      url: recommend.url,
      imgUrl: recommend.imgUrl,
      fail(res) {
        tt.showToast({
          icon: 'fail',
          title: '链接异常,无法跳转',
        })
      },
    })
  },
  previewContentsImgs(target) {
    tt.previewImage({
      urls: this.data.contentsImgs,
      current: target.currentTarget.dataset.url,
    })
  },
})

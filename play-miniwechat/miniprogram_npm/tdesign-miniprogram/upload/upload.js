import { SuperComponent, isObject, wxComponent } from '../common/src/index'
import config from '../common/config'
import props from './props'
const __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    let c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc)
    else
      for (let i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
    return c > 3 && r && Object.defineProperty(target, key, r), r
  }
const __rest =
  (this && this.__rest) ||
  function (s, e) {
    const t = {}
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]]
      }
    return t
  }
const { prefix } = config
const name = `${prefix}-upload`
let Upload = class Upload extends SuperComponent {
  constructor() {
    super(...arguments)
    this.externalClasses = [`${prefix}-class`]
    this.options = {
      multipleSlots: true,
    }
    this.data = {
      classPrefix: name,
      prefix,
      current: false,
      proofs: [],
      customFiles: [],
      customLimit: 0,
      config: {},
      files: [],
      max: 0,
      sizeLimit: 0,
      requestMethod: null,
      gridItemStyle: '',
      column: 4,
    }
    this.properties = props
    this.controlledProps = [
      {
        key: 'files',
        event: 'success',
      },
    ]
    this.observers = {
      files(files) {
        this.handleLimit(files, this.data.max)
      },
      max(max) {
        this.handleLimit(this.data.customFiles, max)
      },
      gridConfig() {
        this.updateGrid()
      },
    }
  }
  onProofTap(e) {
    let _a
    const { index } = e.currentTarget.dataset
    wx.previewImage({
      urls: this.data.customFiles.filter(file => file.percent !== -1).map(file => file.url),
      current: (_a = this.data.customFiles[index]) === null || _a === void 0 ? void 0 : _a.url,
    })
  }
  ready() {
    this.handleLimit(this.data.customFiles, this.data.max)
    this.updateGrid()
  }
  handleLimit(customFiles, max) {
    while (max !== 0 && customFiles.length - max > 0) {
      customFiles.pop()
    }
    const proofs = []
    customFiles.forEach(item => {
      if (item.type !== 'video') {
        proofs.push(item.url)
      }
    })
    this.setData({
      customFiles,
      proofs,
      customLimit: max === 0 ? Number.MAX_SAFE_INTEGER : max - customFiles.length,
    })
  }
  uploadFiles(files) {
    return new Promise(resolve => {
      const task = this.data.requestMethod(files)
      if (task instanceof Promise) {
        return task
      }
      resolve({})
    })
  }
  startUpload(files) {
    if (typeof this.data.requestMethod === 'function') {
      return this.uploadFiles(files)
    }
    this.handleLimit(this.data.customFiles, this.data.max)
    return Promise.resolve()
  }
  chooseMedia(mediaType) {
    const { config, sizeLimit, max } = this.data
    wx.chooseMedia(
      Object.assign(Object.assign({ count: max === 0 ? 9 : max, mediaType }, config), {
        success: res => {
          const files = []
          res.tempFiles.forEach(temp => {
            const { size, fileType, tempFilePath, width, height, duration, thumbTempFilePath } =
                temp,
              res = __rest(temp, [
                'size',
                'fileType',
                'tempFilePath',
                'width',
                'height',
                'duration',
                'thumbTempFilePath',
              ])
            if (sizeLimit && size > sizeLimit) {
              wx.showToast({
                icon: 'none',
                title: `${fileType === 'image' ? '??????' : '??????'}??????????????????`,
              })
              return
            }
            const name = this.getRandFileName(tempFilePath)
            files.push(
              Object.assign(
                {
                  name,
                  type: this.getFileType(mediaType, tempFilePath, fileType),
                  url: tempFilePath,
                  size,
                  width,
                  height,
                  duration,
                  thumb: thumbTempFilePath,
                  progress: 0,
                },
                res
              )
            )
          })
          this._trigger('select-change', {
            files: [...this.data.customFiles],
            currentSelectedFiles: [files],
          })
          this._trigger('add', { files })
          this._trigger('success', { files: [...this.data.customFiles, ...files] })
          this.startUpload(files)
        },
        fail: err => {
          this.triggerEvent('fail', err)
        },
        complete: res => {
          this.triggerEvent('complete', res)
        },
      })
    )
  }
  getFileType(mediaType, tempFilePath, fileType) {
    if (fileType) return fileType
    if (mediaType.length === 1) {
      return mediaType[0]
    }
    const videoType = ['avi', 'wmv', 'mkv', 'mp4', 'mov', 'rm', '3gp', 'flv', 'mpg', 'rmvb']
    const temp = tempFilePath.split('.')
    const postfix = temp[temp.length - 1]
    if (videoType.includes(postfix.toLocaleLowerCase())) {
      return 'video'
    }
    return 'image'
  }
  getRandFileName(filePath) {
    const extIndex = filePath.lastIndexOf('.')
    const extName = extIndex === -1 ? '' : filePath.substr(extIndex)
    return (
      parseInt(`${Date.now()}${Math.floor(Math.random() * 900 + 100)}`, 10).toString(36) + extName
    )
  }
  closePop() {
    this.setData({ showPop: false })
  }
  onAddTap() {
    const { mediaType } = this.properties
    this.chooseMedia(mediaType)
  }
  onChooseImage() {
    this.chooseImg()
  }
  onChooseVideo() {
    this.chooseVideo()
  }
  onDelete(e) {
    const { index } = e.currentTarget.dataset
    this.deleteHandle(index)
  }
  deleteHandle(index) {
    const { customFiles } = this.data
    const delFile = customFiles[index]
    this.triggerEvent('remove', { index, file: delFile })
  }
  updateGrid() {
    let { gridConfig = {} } = this.properties
    if (!isObject(gridConfig)) gridConfig = {}
    const { column = 4, width = 160, height = 160 } = gridConfig
    this.setData({
      gridItemStyle: `width:${width}rpx;height:${height}rpx`,
      column,
    })
  }
}
Upload = __decorate([wxComponent()], Upload)
export default Upload

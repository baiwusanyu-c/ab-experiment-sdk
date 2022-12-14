import { SuperComponent, wxComponent } from '../common/src/index'
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
const { prefix } = config
const name = `${prefix}-switch`
let Switch = class Switch extends SuperComponent {
  constructor() {
    super(...arguments)
    this.externalClasses = ['t-class', 't-class-label', 't-class-body', 't-class-dot']
    this.behaviors = ['wx://form-field']
    this.properties = props
    this.data = {
      classPrefix: name,
      isActive: false,
      bodyStyle: '',
    }
    this.controlledProps = [
      {
        key: 'value',
        event: 'change',
      },
    ]
    this.observers = {
      value(val) {
        const [activeValue] = this.data.customValue
        this.setData({
          isActive: val === activeValue,
        })
        this.handleColorChange()
      },
    }
    this.methods = {
      switchChange() {
        const { disabled, value, customValue } = this.data
        const [activeValue, inactiveValue] = customValue
        if (disabled) return
        this._trigger('change', {
          value: value === activeValue ? inactiveValue : activeValue,
        })
      },
      handleColorChange() {
        const { disabled, colors = [] } = this.data
        const [activedColor = '#0052d9', inactivedColor = 'rgba(0, 0, 0, .26)'] = colors
        if (!disabled) {
          this.setData({
            bodyStyle: `background-color: ${this.data.isActive ? activedColor : inactivedColor}`,
          })
        }
      },
      onTapBackground() {
        this.switchChange()
      },
      onTapDot() {
        this.switchChange()
      },
    }
  }
}
Switch = __decorate([wxComponent()], Switch)
export default Switch

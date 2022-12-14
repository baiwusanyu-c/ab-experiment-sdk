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
const name = `${prefix}-empty`
let default_1 = class extends SuperComponent {
  constructor() {
    super(...arguments)
    this.options = {
      multipleSlots: true,
    }
    this.externalClasses = ['t-class', 't-class-description', 't-class-image']
    this.properties = props
    this.data = {
      classPrefix: name,
    }
  }
}
default_1 = __decorate([wxComponent()], default_1)
export default default_1

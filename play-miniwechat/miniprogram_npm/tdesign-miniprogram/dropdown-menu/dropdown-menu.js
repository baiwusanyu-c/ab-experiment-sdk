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
const name = `${prefix}-dropdown-menu`
let DropdownMenu = class DropdownMenu extends SuperComponent {
  constructor() {
    super(...arguments)
    this.properties = props
    this.data = {
      prefix,
      classPrefix: name,
      nodes: null,
      menus: null,
      activeIdx: -1,
      bottom: 0,
    }
    this.relations = {
      './dropdown-item': {
        type: 'child',
      },
    }
    this.lifetimes = {
      ready() {
        this.getAllItems()
      },
    }
    this.methods = {
      getAllItems() {
        const nodes = this.getRelationNodes('./dropdown-item')
        const menus = nodes.map(a => a.data)
        this.setData({
          nodes,
          menus,
        })
      },
      toggleDropdown(e) {
        const { index: idx } = e.target.dataset
        const { activeIdx, duration } = this.data
        const prevItem = this.data.nodes[activeIdx]
        const currItem = this.data.nodes[idx]
        if (currItem.data.disabled) return
        if (activeIdx !== -1) {
          prevItem.triggerEvent('close')
          prevItem.setData(
            {
              show: false,
            },
            () => {
              setTimeout(() => {
                prevItem.triggerEvent('closed')
              }, duration)
            }
          )
        }
        if (activeIdx === idx) {
          this.setData({
            activeIdx: -1,
          })
        } else {
          currItem.triggerEvent('open')
          this.setData({
            activeIdx: idx,
          })
          currItem.setData(
            {
              show: true,
            },
            () => {
              setTimeout(() => {
                currItem.triggerEvent('opened')
              }, duration)
            }
          )
        }
      },
    }
  }
}
DropdownMenu = __decorate([wxComponent()], DropdownMenu)
export default DropdownMenu

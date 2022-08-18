import { extend, log} from '@ab-test-sdk/utils'
import defaultConfig from './config'
import type {IConfigMiniWechat} from '@ab-test-sdk/utils';
const mergeConfig = (config:IConfigMiniWechat) =>{
    return extend(defaultConfig, config)
}

const sdk = {
    configOption:{} as IConfigMiniWechat,
    /**
     * 初始化sdk
     */
    init(config:IConfigMiniWechat){
        // 合并配置
        this.configOption = mergeConfig(config)
    },
    /**
     * 初始化完成，开始获取实验信息
     */
    start(){
        log('start',this.configOption.log)
    },
    /**
     * 获取实验参数
     */
    getVar(){
        log('getVar',this.configOption.log)
    },
    /**
     * 修改config
     */
    config(){
        log('config',this.configOption.log)
    },
    /**
     * 触发自定义事件
     */
    triggerEvt(){
        log('triggerEvt',this.configOption.log)
    }
}
export default sdk
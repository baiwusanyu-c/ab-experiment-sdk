import type { IConfigMiniWechat } from '@ab-test-sdk/utils'

const config:IConfigMiniWechat = {
    app_id: undefined, // 替换成您的APP_ID
    auto_report: false, //自动上报进入页面事件
    report_channel: "cn",// 数据上报
    log: false, // 是否打印log
    enable_ab_test: false, // 开启A/B Test 功能
    clear_ab_cache_on_user_change: false ,//默认切换用户重新获取A/B配置信息, 如果要关闭则clear_ab_cache_on_user_change配置项置为false
    custom_config:{}
}
/**
 * 设置配置对象
 * @param key
 * @param val
 */
export const setConfig = function (key:string,val: keyof IConfigMiniWechat){
    if(Object.prototype.hasOwnProperty.call(config,key)){
        config[key] = val
    }else{
        config.custom_config[key] = val
    }
}

export default config
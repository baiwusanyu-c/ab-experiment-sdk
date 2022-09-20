interface IOption {
    [key: string]: any;
}
interface IConfig extends IOption {
    appKey?: number;
    reportChannel: 'cn' | 'en';
    log: boolean;
    enableAbTest: boolean;
    customConfig: IOption;
    autoRefresh: boolean;
    autoRefreshStep: number;
    userId?: string;
}
interface IConfigMiniWechat extends IConfig {
    clear_ab_cache_on_user_change?: boolean;
    auto_report?: boolean;
}
interface ISysInfo {
    ab_url: string;
    browser: string;
    browser_version: string;
    device_model: string;
    height: number;
    language: string;
    os_name: string;
    os_version: string;
    platform: string;
    resolution: string;
    screen_height: number;
    screen_width: number;
    width: number;
}
interface IVersionConfig {
    versionId: number;
    versionTrafficWeight: number;
    whitelist: string;
    versionParam: IOption;
}
interface IExpConfig {
    experimentId: number;
    experimentKey: string;
    experimentTrafficWeight: number;
    versions: Array<IVersionConfig>;
    hashVal?: number;
    isEntry?: boolean;
}
interface INameKey {
    funcName: string;
    sdkKey?: string;
}

declare const extend: (objFir: any, objSec: any) => any;
declare const log: (info: string) => void;
declare const isBool: (val: unknown) => boolean;
declare const isString: (val: unknown) => boolean;
declare const isNumber: (val: unknown) => boolean;
declare const isFunction: (val: unknown) => boolean;
declare const isEmptyObj: (val: unknown) => boolean;
declare function isObject(obj: unknown): boolean;
declare const isArray: (obj: unknown, func?: null | undefined | Function) => any;
declare function deepCopy(obj: unknown): {};

declare const setRequestInst: (reqScript: any) => Promise<any>;
interface IExperimentConfig {
    appKey?: number | string;
}
declare function experimentConfig(params: IExperimentConfig): Promise<unknown>;

declare enum ENV {
    WEB = "web",
    MINI_WECHAT = "mini-wechat",
    MINI_DOUYIN = "mini-douyin"
}

/**
 * 设置配置对象
 * @param key
 * @param val
 */
declare const setConfig: (key: string, val: keyof IConfigMiniWechat) => void;
/**
 * 合并配置
 * @param config
 * @param defaultConfigs
 * （单测完成）
 * （完成）
 */
declare const mergeConfig: (config: IConfigMiniWechat, defaultConfigs?: IConfigMiniWechat) => any;

declare const sdk: {
    configOption: IConfigMiniWechat;
    log: boolean;
    expConfig: IExpConfig[];
    timer: number;
    isInit: boolean;
    shuntRes: IOption;
    groupRes: IOption;
    getExpConfig: FunctionConstructor;
    /**
     * 初始化sdk
     * （完成）
     */
    init(config: IConfigMiniWechat, getExpConfigFunc: Function): void;
    /**
     * 初始化完成，开始获取实验信息
     * 获取实验参数，即通过分流算法获取结果
     * 结果将存储在sdk实例对象上
     */
    start(cb: Function): Promise<any>;
    /**
     * 获取实验参数，即通过分组算法获取结果
     * 接受一个实验id，让开发者在合适的时候获取对应的分组结果
     * @param expId 实验id
     * @param defaultVal 异常兜底，异常下直接返回这个值，开发者判断直接走兜底逻辑
     * @param cb 回调
     */
    getVar(expId: string, defaultVal: string, cb: Function): void;
    /**
     * 修改config,在自动模式开启时会自动生效，否则需要手动start
     * （完成）
     */
    config(nConfig: IConfigMiniWechat, cb: Function): void;
    /**
     * 刷新实验配置，刷新后会自动重新分流，你需要重新调用getVar
     */
    refresh(cb?: Function): Promise<any>;
    /**
     * 重置实例方法
     */
    resetInstance(): void;
};
declare function cbdABTest(nameKey: INameKey, ...arg: any[]): any;
declare function cbdABTest(nameKey: string, ...arg: any[]): any;
/**
 * 获取实验配置
 * @param appKey
 * @param ctx
 * @param reqFunc
 * （完成）
 */
declare const getExperimentConfig: (appKey: number, ctx: typeof sdk, reqFunc?: Function) => Promise<any>;
/**
 * 自动刷新实验配置
 * @param ctx
 */
declare const autoRefresh: (ctx: typeof sdk) => void;

/**
 * 分流方法
 */
declare const abTestShunt: (ctx: typeof sdk) => IOption;
/**
 * hash取模分流
 * 用户唯一标识生成 hash ，绝对值后对1000取模，再除 10
 * @param key
 * @param weight
 */
declare const shuntAlgorithm: (key: string, weight: number) => {
    isEntry: boolean;
    hashVal: number;
};
/**
 * 分组方法
 * 实验分流hash结果 * （100 / 实验分流流量阈值） 得到版本流量总阈值
 * 循环各个版本流量值，并累加总阈值，每次循环，总阈值还小于版本流量总阈值，则进入该分组
 */
declare const abTestGrouping: (ctx: typeof sdk, expShuntRes: IOption, defaultVal: string) => {
    msg: string;
    res: {
        isEntryVersion: boolean;
        versionId: number;
        versionParam: {};
    };
    status: boolean;
};

declare const ABTest: (funcName: string, ...arg: any[]) => any;

export { ABTest, ENV, IConfig, IConfigMiniWechat, IExpConfig, INameKey, IOption, ISysInfo, IVersionConfig, abTestGrouping, abTestShunt, autoRefresh, cbdABTest, deepCopy, experimentConfig, extend, getExperimentConfig, isArray, isBool, isEmptyObj, isFunction, isNumber, isObject, isString, log, mergeConfig, sdk, setConfig, setRequestInst, shuntAlgorithm };

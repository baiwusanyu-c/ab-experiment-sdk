'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*function uaMatch(ua: string) {
  const rMsie = /(msie\s|trident.*rv:)([\w.]+)/
  const rFirefox = /(firefox)\/([\w.]+)/
  const rOpera = /(opera).+version\/([\w.]+)/
  const rChrome = /(chrome)\/([\w.]+)/
  const rSafari = /version\/([\w.]+).*(safari)/
  let match = rMsie.exec(ua)
  if (match != null) {
    return { browser: 'IE', version: match[2] || '0' }
  }
  match = rFirefox.exec(ua)
  if (match != null) {
    return { browser: match[1] || '', version: match[2] || '0' }
  }
  match = rOpera.exec(ua)
  if (match != null) {
    return { browser: match[1] || '', version: match[2] || '0' }
  }
  match = rChrome.exec(ua)
  if (match != null) {
    return { browser: match[1] || '', version: match[2] || '0' }
  }
  match = rSafari.exec(ua)
  if (match != null) {
    return { browser: match[2] || '', version: match[1] || '0' }
  }
  if (match != null) {
    return { browser: '', version: '0' }
  }
}
const getResolution = () => {
  const width = window.screen.width * window.devicePixelRatio
  const height = window.screen.height * window.devicePixelRatio
  return {
    width,
    height,
    resolution: `${width}x${height}`,
  }
}

export function getOsVersion() {
  const u = navigator.userAgent
  let device_model = '',
    os_name = '',
    os_version = ''
  if (u.indexOf('Mac OS X') > -1) {
    // ios
    const regStr_saf = /OS [\d._]*!/gi
    const verinfo = u.match(regStr_saf)
    device_model = `IOS${`${verinfo}`.replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.')}`
    os_name = 'IOS'
  } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    // android
    device_model = `Android${u.substr(
      u.indexOf('Android') + 8,
      u.indexOf(';', u.indexOf('Android')) - u.indexOf('Android') - 8
    )}`
    os_name = 'Android'
  } else {
    const userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.indexOf('windows nt 5.1') > -1 || userAgent.indexOf('windows nt 5.2') > -1) {
      device_model = 'Windows XP'
      os_name = 'Windows'
      os_version = 'xp'
    } else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {
      device_model = 'Windows NT 7'
      os_name = 'Windows'
      os_version = '7'
    } else if (
      userAgent.indexOf('windows nt 6.2') > -1 ||
      userAgent.indexOf('windows nt 10.0') > -1
    ) {
      device_model = 'Windows NT 10'
      os_name = 'Windows'
      os_version = '10'
    } else if (
      userAgent.indexOf('windows nt 6.2') > -1 ||
      userAgent.indexOf('windows nt 11.0') > -1
    ) {
      device_model = 'Windows NT 11'
      os_name = 'Windows'
      os_version = '11'
    } else {
      device_model = 'Unknown'
      os_name = 'Unknown'
      os_version = 'Unknown'
    }
  }
  return {
    device_model,
    os_name,
    language: navigator.language,
    os_version,
  }
}

export const getSysInfo = () => {
  const browserInfo = uaMatch(navigator.userAgent.toLocaleLowerCase()) || {
    browser: '',
    version: '0',
  }
  const resolutionInfo = getResolution()
  const osInfo = getOsVersion()
  if (window) {
    return {
      ab_url: location.href,
      browser: browserInfo.browser,
      browser_version: browserInfo.version,
      ...osInfo,
      resolution: resolutionInfo.resolution,
      height: resolutionInfo.height,
      screen_height: resolutionInfo.height,
      screen_width: resolutionInfo.width,
      width: resolutionInfo.width,
    }
  }
}
*/
const extend = (objFir, objSec) => {
    return Object.assign({}, objFir, objSec);
};
const log = (info) => {
    console.info(`[cbd -- A/B test sdk] ${info}`);
};
// ????????????
const isBool = (val) => typeof val === 'boolean';
// ???????????????
const isString = (val) => typeof val == 'string' && val.constructor == String;
// ????????????
const isNumber = (val) => typeof val === 'number';
// ?????? ???????????????
const isFunction = (val) => Object.prototype.toString.call(val) === '[object Function]' ||
    Object.prototype.toString.call(val) === '[object AsyncFunction]';
// ????????????????????????
const isEmptyObj = (val) => JSON.stringify(val) === '{}';
function isObject(obj) {
    if (obj === undefined || obj === null) {
        return false;
    }
    else {
        return toString.call(obj) == '[object Object]';
    }
}
const isArray = (obj, func = Array.isArray) => {
    if (func) {
        return func(obj);
    }
    else {
        return toString.call(obj) === '[object Array]';
    }
};
function deepCopy(obj) {
    const temp = {};
    function deepClone(target, source) {
        for (const k in source) {
            const item = source[k];
            if (isArray(item)) {
                target[k] = [];
                deepClone(target[k], item);
            }
            else if (isObject(item)) {
                target[k] = {};
                deepClone(target[k], item);
            }
            else {
                target[k] = item;
            }
        }
    }
    deepClone(temp, obj);
    return temp;
}

let requestInst = null;
const setRequestInst = async (reqScript) => {
    requestInst = reqScript;
    return requestInst;
};
function req(url, params = {}) {
    return new Promise(resolve => {
        requestInst.then((reqFn) => {
            reqFn
                .default(url, { params }, false)
                .then((res) => {
                if (res && res.code === 200 && res.data && res.data.length > 0) {
                    resolve(res.data);
                }
                else {
                    resolve(undefined);
                    console.warn(res.msg);
                }
            })
                .catch((err) => {
                resolve(undefined);
                console.warn('Request error:', err);
            });
        });
    });
}
async function experimentConfig(params) {
    const res = await req('experiment/config/list', params);
    return res;
}

exports.ENV = void 0;
(function (ENV) {
    ENV["WEB"] = "web";
    ENV["MINI_WECHAT"] = "mini-wechat";
    ENV["MINI_DOUYIN"] = "mini-douyin";
})(exports.ENV || (exports.ENV = {}));

const config = {
    appKey: undefined,
    auto_report: false,
    reportChannel: 'cn',
    log: false,
    enableAbTest: true,
    clear_ab_cache_on_user_change: false,
    customConfig: {},
    autoRefresh: false,
    autoRefreshStep: 0,
    userId: '',
};
/**
 * ??????????????????
 * @param key
 * @param val
 */
const setConfig = function (key, val) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
        config[key] = val;
    }
    else {
        config.customConfig[key] = val;
    }
};
/**
 * ????????????
 * @param config
 * @param defaultConfigs
 * ??????????????????
 * ????????????
 */
const mergeConfig = (config, defaultConfigs = config) => {
    return extend(defaultConfigs, config);
};

function getUniqueIntegerFromString(string) {
  var index = string.length;
  var hashA = 5381;
  var hashB = 52711;
  var charCode;
  while (index--) {
    charCode = string.charCodeAt(index);
    hashA = hashA * 33 ^ charCode;
    hashB = hashB * 33 ^ charCode;
  }
  return (hashA >>> 0) * 4096 + (hashB >>> 0);
}
var getClassTypes = function getClassTypes(classes, reversed) {
  return classes.reduce(function (map, className) {
    var toStringClassName = "[object " + className + "]";
    if (reversed) {
      map[toStringClassName] = className;
    } else {
      map[className] = toStringClassName;
    }
    return map;
  }, {});
};
var getFlags = function getFlags(flags) {
  return flags.reduce(function (flag, item) {
    flag[item] = true;
    return flag;
  }, {});
};
var OBJECT_CLASSES = [
'Array', 'Arguments', 'Object',
'RegExp', 'Symbol',
'Map', 'Set', 'Date', 'Error', 'Event',
'Generator', 'Promise', 'WeakMap', 'WeakSet', 'DocumentFragment',
'Float32Array', 'Float64Array', 'Int8Array', 'Int16Array', 'Int32Array', 'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'ArrayBuffer', 'DataView', 'DocumentFragment', 'Window',
'String', 'Number', 'Boolean', 'Function', 'Undefined', 'GeneratorFunction', 'BigInt', 'Null'];
var OBJECT_CLASS_TYPE = getClassTypes(OBJECT_CLASSES, false);
var OBJECT_CLASS = getClassTypes(OBJECT_CLASSES, true);
var BAILOUT_TAGS = getFlags([OBJECT_CLASS_TYPE.Generator, OBJECT_CLASS_TYPE.Promise, OBJECT_CLASS_TYPE.WeakMap, OBJECT_CLASS_TYPE.WeakSet]);
var ITERABLE_TAGS = getFlags([OBJECT_CLASS_TYPE.Map, OBJECT_CLASS_TYPE.Set]);
var NORMALIZED_TAGS = getFlags([OBJECT_CLASS_TYPE.Date, OBJECT_CLASS_TYPE.RegExp]);
var PRIMITIVE_TAGS = getFlags(['bigint', 'boolean', 'function', 'number', 'string', 'undefined']);
var SELF_TAGS = getFlags([OBJECT_CLASS_TYPE.Arguments, OBJECT_CLASS_TYPE.Array]);
var TO_STRING_TAGS = getFlags([OBJECT_CLASS_TYPE.RegExp, OBJECT_CLASS_TYPE.Symbol]);
var TYPED_ARRAY_TAGS = getFlags([OBJECT_CLASS_TYPE.Float32Array, OBJECT_CLASS_TYPE.Float64Array, OBJECT_CLASS_TYPE.Int8Array, OBJECT_CLASS_TYPE.Int16Array, OBJECT_CLASS_TYPE.Int32Array, OBJECT_CLASS_TYPE.Uint8Array, OBJECT_CLASS_TYPE.Uint8ClampedArray, OBJECT_CLASS_TYPE.Uint16Array, OBJECT_CLASS_TYPE.Uint32Array]);
var HAS_BUFFER_FROM_SUPPORT = typeof Buffer !== 'undefined' && typeof Buffer.from === 'function';
var HAS_UINT16ARRAY_SUPPORT = typeof Uint16Array === 'function';
function getStringifiedArrayBufferFallback(buffer) {
  return String.fromCharCode.apply(null, new Uint16Array(buffer));
}
function getStringifiedArrayBufferModern(buffer) {
  return Buffer.from(buffer).toString('utf8');
}
function getStringifiedArrayBufferNoSupport(buffer) {
  return '';
}
var getStringifiedArrayBuffer = function () {
  if (HAS_BUFFER_FROM_SUPPORT) {
    return getStringifiedArrayBufferModern;
  }
  if (HAS_UINT16ARRAY_SUPPORT) {
    return getStringifiedArrayBufferFallback;
  }
  return getStringifiedArrayBufferNoSupport;
}();
var XML_ELEMENT_REGEXP = /\[object ([HTML|SVG](.*)Element)\]/;
var toString$1 = Object.prototype.toString;
var keys = Object.keys;
function getSortedEvent(event) {
  return {
    bubbles: event.bubbles,
    cancelBubble: event.cancelBubble,
    cancelable: event.cancelable,
    composed: event.composed,
    currentTarget: event.currentTarget,
    defaultPrevented: event.defaultPrevented,
    eventPhase: event.eventPhase,
    isTrusted: event.isTrusted,
    returnValue: event.returnValue,
    target: event.target,
    type: event.type
  };
}
function shouldSort(first, second) {
  return first > second;
}
function shouldSortPair(firstPair, secondPair) {
  return firstPair[0] > secondPair[0];
}
function sort(array, fn) {
  var subIndex;
  var value;
  for (var index = 0; index < array.length; ++index) {
    value = array[index];
    for (subIndex = index - 1; ~subIndex && fn(array[subIndex], value); --subIndex) {
      array[subIndex + 1] = array[subIndex];
    }
    array[subIndex + 1] = value;
  }
  return array;
}
function getSortedMap(map, cache, keys) {
  var entries = [];
  map.forEach(function (value, key) {
    entries.push([stringify(key, cache, keys), stringify(value, cache, keys)]);
  });
  sort(entries, shouldSortPair);
  for (var index = 0, entry; index < entries.length; ++index) {
    entry = entries[index];
    entries[index] = "[" + entry[0] + "," + entry[1] + "]";
  }
  return "Map|[" + entries.join(',') + "]";
}
function getSortedSet(set, cache, keys) {
  var entries = [];
  set.forEach(function (value) {
    entries.push(stringify(value, cache, keys));
  });
  sort(entries, shouldSort);
  return "Set|[" + entries.join(',') + "]";
}
function getSortedObject(object) {
  var objectKeys = sort(keys(object), shouldSort);
  var newObject = {};
  var key;
  for (var index = 0; index < objectKeys.length; ++index) {
    key = objectKeys[index];
    newObject[key] = object[key];
  }
  return newObject;
}
function getStringifiedDocumentFragment(fragment) {
  var children = fragment.children;
  var innerHTML = [];
  for (var index = 0; index < children.length; ++index) {
    innerHTML.push(children[index].outerHTML);
  }
  return innerHTML.join(',');
}
function getCutoffIndex(array, value) {
  for (var index = 0; index < array.length; ++index) {
    if (array[index] === value) {
      return index + 1;
    }
  }
  return 0;
}
function getNormalizedValue(value, cache, keys, passedTag) {
  if (!passedTag) {
    var type = typeof value;
    if (PRIMITIVE_TAGS[type]) {
      return type + "|" + value;
    }
    if (value === null) {
      return value + "|" + value;
    }
  }
  var tag = passedTag || toString$1.call(value);
  if (SELF_TAGS[tag]) {
    return value;
  }
  if (tag === OBJECT_CLASS_TYPE.Object) {
    return getSortedObject(value);
  }
  if (TO_STRING_TAGS[tag]) {
    return OBJECT_CLASS[tag] + "|" + value.toString();
  }
  if (ITERABLE_TAGS[tag]) {
    return value instanceof Map ? getSortedMap(value, cache, keys) : getSortedSet(value, cache, keys);
  }
  if (tag === OBJECT_CLASS_TYPE.Date) {
    return OBJECT_CLASS[tag] + "|" + value.getTime();
  }
  if (tag === OBJECT_CLASS_TYPE.Error) {
    return OBJECT_CLASS[tag] + "|" + value.stack;
  }
  if (tag === OBJECT_CLASS_TYPE.Event) {
    return getSortedEvent(value);
  }
  if (BAILOUT_TAGS[tag]) {
    return OBJECT_CLASS[tag] + "|NOT_ENUMERABLE";
  }
  if (XML_ELEMENT_REGEXP.test(tag)) {
    return tag.slice(8, -1) + "|" + value.outerHTML;
  }
  if (tag === OBJECT_CLASS_TYPE.DocumentFragment) {
    return OBJECT_CLASS[tag] + "|" + getStringifiedDocumentFragment(value);
  }
  if (TYPED_ARRAY_TAGS[tag]) {
    return OBJECT_CLASS[tag] + "|" + value.join(',');
  }
  if (tag === OBJECT_CLASS_TYPE.ArrayBuffer) {
    return OBJECT_CLASS[tag] + "|" + getStringifiedArrayBuffer(value);
  }
  if (tag === OBJECT_CLASS_TYPE.DataView) {
    return OBJECT_CLASS[tag] + "|" + getStringifiedArrayBuffer(value.buffer);
  }
  return value;
}
function createReplacer(cache, keys) {
  if (cache === void 0) {
    cache = [];
  }
  if (keys === void 0) {
    keys = [];
  }
  return function (key, value) {
    if (typeof value === 'object') {
      if (cache.length) {
        var thisCutoff = getCutoffIndex(cache, this);
        if (thisCutoff === 0) {
          cache.push(this);
        } else {
          cache.splice(thisCutoff);
          keys.splice(thisCutoff);
        }
        keys.push(key);
        var valueCutoff = getCutoffIndex(cache, value);
        if (valueCutoff !== 0) {
          return "[~" + (keys.slice(0, valueCutoff).join('.') || '.') + "]";
        }
        cache.push(value);
      } else {
        cache[0] = value;
        keys[0] = key;
      }
    }
    if (key && this[key] instanceof Date) {
      return getNormalizedValue(this[key], cache, keys, OBJECT_CLASS_TYPE.Date);
    }
    return getNormalizedValue(value, cache, keys);
  };
}
function stringify(value, cache, keys) {
  if (!value || typeof value !== 'object') {
    return getNormalizedValue(value, cache, keys);
  }
  var tag = toString$1.call(value);
  if (NORMALIZED_TAGS[tag]) {
    return getNormalizedValue(value, cache, keys, tag);
  }
  return JSON.stringify(value, createReplacer(cache, keys));
}
function hash(value) {
  return getUniqueIntegerFromString(stringify(value));
}
function is(value, otherValue) {
  return hash(value) === hash(otherValue);
}
function isAll(value) {
  for (var index = 0; index < (arguments.length <= 1 ? 0 : arguments.length - 1); ++index) {
    if (!is(value, index + 1 < 1 || arguments.length <= index + 1 ? undefined : arguments[index + 1])) {
      return false;
    }
  }
  return true;
}
function isAny(value) {
  for (var index = 0; index < (arguments.length <= 1 ? 0 : arguments.length - 1); ++index) {
    if (is(value, index + 1 < 1 || arguments.length <= index + 1 ? undefined : arguments[index + 1])) {
      return true;
    }
  }
  return false;
}
function isNot(value, otherValue) {
  return hash(value) !== hash(otherValue);
}
is.all = isAll;
is.any = isAny;
is.not = isNot;
hash.is = is;

/**
 * ????????????
 */
const abTestShunt = (ctx) => {
    const config = ctx.expConfig;
    const shuntResArr = {};
    config.forEach((val) => {
        const shuntRes = shuntAlgorithm(ctx.configOption.userId, val.experimentTrafficWeight);
        shuntResArr[val.experimentId] = {
            ...val,
            ...shuntRes,
        };
    });
    return shuntResArr;
};
/**
 * hash????????????
 * @param key
 * @param weight
 */
const shuntAlgorithm = (key, weight) => {
    const value = Math.abs(hash(key)) % 1000;
    const res = value / 10;
    return {
        isEntry: res <= weight,
        hashVal: res,
    };
};
/**
 * ????????????
 */
const abTestGrouping = (ctx, expShuntRes, defaultVal) => {
    let totalWeight = 0;
    const expShuntResVal = expShuntRes;
    const versionWeight = expShuntResVal.hashVal * (100 / expShuntResVal.experimentTrafficWeight);
    const res = {
        msg: 'group successfully',
        res: {
            isEntryVersion: false,
            versionId: 0,
            versionParam: {},
        },
        status: false,
    };
    for (let i = 0; i < expShuntResVal.versions.length; i++) {
        totalWeight += expShuntResVal.versions[i].versionTrafficWeight;
        // ?????????????????? ?????????????????????
        if (versionWeight < totalWeight &&
            (!expShuntResVal.versions[i].whitelist ||
                expShuntResVal.versions[i].whitelist.indexOf(ctx.configOption.userId) < 0)) {
            res.res = {
                isEntryVersion: true,
                versionId: expShuntResVal.versions[i].versionId,
                versionParam: expShuntResVal.versions[i].versionParam,
            };
            res.status = true;
            break;
        }
    }
    return res;
};

const sdk = {
    configOption: {},
    log: false,
    expConfig: [],
    timer: 0,
    isInit: false,
    shuntRes: {},
    groupRes: {},
    getExpConfig: Function,
    /**
     * ?????????sdk
     * ????????????
     */
    init(config$1, getExpConfigFunc) {
        this.log && log('init running');
        this.getExpConfig = getExpConfigFunc || getExperimentConfig;
        // ????????????
        this.configOption = mergeConfig(config$1, config);
        this.log = this.configOption.log;
        this.isInit = true;
    },
    /**
     * ??????????????????????????????????????????
     * ??????????????????????????????????????????????????????
     * ??????????????????sdk???????????????
     */
    async start(cb) {
        if (!this.isInit) {
            cb && cb({ res: undefined, msg: 'sdk not initialized', status: false });
            this.log && log('sdk not initialized');
            return;
        }
        this.log && log('start running');
        // ??????????????????(???????????????????????????)
        this.expConfig = await this.getExpConfig(this.configOption.appKey, this);
        // ???????????????????????????
        if (this.configOption.autoRefresh) {
            autoRefresh(this);
        }
        if (!this.expConfig || this.expConfig.length === 0) {
            return (cb &&
                cb({
                    res: { expConfig: [], shuntRes: {}, sdk: this },
                    msg: 'unknown exception',
                    status: false,
                }));
        }
        // ???????????????????????????????????????sdk??????
        this.shuntRes = abTestShunt(this);
        this.log && log('shunt successfully');
        return (cb &&
            cb({
                res: { expConfig: this.expConfig, shuntRes: this.shuntRes, sdk: this },
                msg: 'shunt successfully',
                status: true,
            }));
    },
    /**
     * ??????????????????????????????????????????????????????
     * ??????????????????id????????????????????????????????????????????????????????????
     * @param expId ??????id
     * @param defaultVal ????????????????????????????????????????????????????????????????????????????????????
     * @param cb ??????
     */
    getVar(expId, defaultVal, cb) {
        this.log && log('getVar running');
        // ????????????
        const expShuntRes = this.shuntRes[expId];
        // ?????????expId ??????????????????????????????
        if (expShuntRes && expShuntRes.isEntry) {
            this.groupRes = abTestGrouping(this, expShuntRes);
            this.log && log('group successfully');
            cb && cb(this.groupRes);
        }
        // ?????????expId ??????????????????
        if (expShuntRes && !expShuntRes.isEntry) {
            this.log && log('user did not enter the experiment');
            cb && cb({ res: defaultVal, msg: 'user did not enter the experiment', status: false });
        }
        // ??????????????????????????????id???
        if (!expShuntRes || this.expConfig.length === 0) {
            this.log && log('unknown exception');
            cb && cb({ res: defaultVal, msg: 'unknown exception', status: false });
        }
    },
    /**
     * ??????config,????????????????????????????????????????????????????????????start
     * ????????????
     */
    config(nConfig, cb) {
        // ????????????config ??????????????????
        this.configOption = mergeConfig(nConfig, this.configOption);
        this.log && log('config set success !');
    },
    /**
     * ???????????????????????????????????????????????????????????????????????????getVar
     */
    async refresh(cb) {
        if (!this.isInit) {
            cb && cb({ res: undefined, msg: 'sdk not initialized', status: false });
            this.log && log('sdk not initialized');
            return;
        }
        // ??????????????????
        this.expConfig = await this.getExpConfig(this.configOption.appKey, this);
        if (!this.expConfig || this.expConfig.length === 0) {
            return (cb &&
                cb({
                    res: { expConfig: [], shuntRes: {}, sdk: this },
                    msg: 'unknown exception',
                    status: false,
                }));
        }
        // ???????????????????????????????????????sdk??????
        this.shuntRes = abTestShunt(this);
        this.log && log('shunt successfully');
        return (cb &&
            cb({
                res: { expConfig: this.expConfig, shuntRes: this.shuntRes, sdk: this },
                msg: 'shunt successfully',
                status: true,
            }));
    },
    /**
     * ??????????????????
     */
    resetInstance() {
        this.configOption = {};
        this.log = false;
        this.expConfig = [];
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = 0;
        this.isInit = false;
        this.shuntRes = {};
        this.groupRes = {};
    },
    /**
     * ?????????????????????
     * (???????????????????????????)
     */
    /*triggerEvt() {
      if (!this.isInit) {
        this.log && log('sdk not initialized')
        return
      }
      this.log && log('triggerEvt')
    },*/
};
/**
 * ?????????api??????
 * @param nameKey
 * @param arg
 * ??????????????????
 * ????????????
 */
const sdkInstMap = new Map();
function cbdABTest(nameKey, ...arg) {
    let funcName = '';
    let sdkKey = '';
    // ???????????????????????????????????????
    if (isString(nameKey)) {
        funcName = nameKey;
    }
    else {
        funcName = nameKey.funcName;
        sdkKey = nameKey.sdkKey;
    }
    // sdkKey ????????? ???????????????????????????
    if (sdkKey) {
        if (!sdkInstMap.get(sdkKey) && funcName === 'init') {
            const resSDK = sdkFuncCall(funcName, sdk, ...arg);
            sdkInstMap.set(sdkKey, deepCopy(sdk));
            return resSDK;
        }
        if (!sdkInstMap.get(sdkKey) && funcName !== 'init') {
            return {
                res: { expConfig: {}, shuntRes: {}, sdk: sdkInstMap.get(sdkKey) },
                msg: 'sdkKey does not exist',
            };
        }
        return sdkFuncCall(funcName, sdkInstMap.get(sdkKey), ...arg);
    }
    else {
        return sdkFuncCall(funcName, sdk, ...arg);
    }
}
/**
 * sdk ????????????
 * @param funcName ?????????
 * @param sdkInst sdk????????????
 * @param arg ??????
 */
const sdkFuncCall = (funcName, sdkInst, ...arg) => {
    if (funcName === 'start' || funcName === 'refresh') {
        return new Promise(resolve => {
            sdkInst[funcName].call(sdkInst, resolve, ...arg);
        });
    }
    if (funcName !== 'init' && funcName !== 'resetInstance' && !sdk.isInit) {
        const res = { res: undefined, msg: 'sdk not initialized', status: false };
        if (funcName === 'getVar') {
            arg[2] && isFunction(arg[2]) && arg[2](res);
        }
        return res;
    }
    if (sdkInst[funcName] && isFunction(sdkInst[funcName])) {
        sdkInst[funcName].call(sdkInst, ...arg);
    }
    return sdkInst;
};
/**
 * ??????????????????
 * @param appKey
 * @param ctx
 * @param reqFunc
 * ????????????
 */
const getExperimentConfig = async (appKey, ctx, reqFunc = experimentConfig) => {
    const params = { appKey };
    const res = await reqFunc(params);
    if (!res) {
        ctx.log && log('Failed to get experimental parameters');
        return [];
    }
    ctx.log && log('The experimental parameters were successfully obtained');
    return res;
};
/**
 * ????????????????????????
 * @param ctx
 */
const autoRefresh = (ctx) => {
    const step = ctx.configOption.autoRefreshStep;
    // @ts-ignore
    ctx.timer = setInterval(async () => {
        ctx.refresh();
    }, step);
};

// ????????????????????????????????????
setRequestInst(Promise.resolve().then(function () { return fetchWechatDouyin; }));
const ABTest = (funcName, ...arg) => {
    return cbdABTest(funcName, ...arg);
};

var ContentType;
(function (ContentType) {
    ContentType["json"] = "application/json;charset=UTF-8";
})(ContentType || (ContentType = {}));
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["post"] = "POST";
})(HttpMethod || (HttpMethod = {}));
/**
 * ????????????,??????????????????????????????
 */
function interceptorsRequest(url, config) {
    const contentType = setContentType(config);
    const reqUrl = setRequestUrl(url);
    const headers = setHeader(contentType, config);
    return {
        contentType,
        reqUrl,
        headers,
    };
}
/**
 * ??????contentType
 * @param config
 */
const setContentType = (config) => {
    if (config && config['Content-Type'] !== undefined) {
        return config['Content-Type'];
    }
    else if (config && config.method === HttpMethod.post) {
        return ContentType.json;
    }
    else {
        return ContentType.json;
    }
};
/**
 * ???????????? url
 * @param url
 */
const setRequestUrl = (url) => {
    return `http://47.96.100.195/api/${url.replace('//', '/')}`;
};
/**
 * ???????????????
 * @param contentType
 * @param config
 */
const setHeader = (contentType, config) => {
    const token = !config || config.token === undefined ? '' : config.token;
    const currentEnv = `mini-wechat`;
    // @ts-ignore
    if (currentEnv === exports.ENV.MINI_WECHAT || currentEnv === exports.ENV.MINI_DOUYIN) {
        return {
            token,
            'Content-Type': contentType,
        };
    }
    else {
        return new Headers({
            token,
            'Content-Type': contentType,
        });
    }
};
/**
 * ????????????,??????????????????????????????
 */
const interceptorsResponse = (res, cb) => {
    return cb(res);
};

const request = async (url, config = {
    params: {},
    method: 'POST',
    headers: {
        'Content-Type': ContentType.json,
        token: '',
    },
    token: '',
    'Content-Type': ContentType.json,
}) => {
    // ????????????
    const { reqUrl, headers } = interceptorsRequest(url, config);
    // ????????????
    const promise = await sendRequest(reqUrl, headers, config);
    // ??????????????????(????????????)
    return interceptorsResponse(promise, handleRes);
};
/**
 * ????????????
 */
function sendRequest(url, headers, config) {
    return new Promise((resolve, reject) => {
        const currentEnv = `mini-wechat`;
        // @ts-ignore
        const pReq = currentEnv === exports.ENV.MINI_DOUYIN ? tt : wx;
        pReq.request({
            url,
            method: HttpMethod.post,
            data: config.params,
            header: {
                ...headers,
            },
            success: (res) => {
                if (res.statusCode === 200) {
                    resolve(res.data);
                }
                else {
                    reject(res);
                }
            },
            fail: (err) => {
                reject(err);
                log(err.message);
            },
        });
    });
}
/**
 * ????????????????????????????????????????????????
 * @param res
 */
const handleRes = (res) => {
    return res;
};

var fetchWechatDouyin = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': request
});

exports.ABTest = ABTest;
exports.abTestGrouping = abTestGrouping;
exports.abTestShunt = abTestShunt;
exports.autoRefresh = autoRefresh;
exports.cbdABTest = cbdABTest;
exports.deepCopy = deepCopy;
exports.experimentConfig = experimentConfig;
exports.extend = extend;
exports.getExperimentConfig = getExperimentConfig;
exports.isArray = isArray;
exports.isBool = isBool;
exports.isEmptyObj = isEmptyObj;
exports.isFunction = isFunction;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isString = isString;
exports.log = log;
exports.mergeConfig = mergeConfig;
exports.sdk = sdk;
exports.setConfig = setConfig;
exports.setRequestInst = setRequestInst;
exports.shuntAlgorithm = shuntAlgorithm;

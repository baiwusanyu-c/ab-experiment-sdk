export const log = (info: string) => {
    console.info(`[cbd -- A/B test sdk] ${info}`)
}
function uaMatch(ua:string) {
  const rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
  const rFirefox = /(firefox)\/([\w.]+)/;
  const rOpera = /(opera).+version\/([\w.]+)/;
  const rChrome = /(chrome)\/([\w.]+)/;
  const rSafari = /version\/([\w.]+).*(safari)/;
  let match = rMsie.exec(ua);
  if (match != null) {
    return {browser: "IE", version: match[2] || "0"};
  }
  match = rFirefox.exec(ua);
  if (match != null) {
    return {browser: match[1] || "", version: match[2] || "0"};
  }
  match = rOpera.exec(ua);
  if (match != null) {
    return {browser: match[1] || "", version: match[2] || "0"};
  }
  match = rChrome.exec(ua);
  if (match != null) {
    return {browser: match[1] || "", version: match[2] || "0"};
  }
  match = rSafari.exec(ua);
  if (match != null) {
    return {browser: match[2] || "", version: match[1] || "0"};
  }
  if (match != null) {
    return {browser: "", version: "0"};
  }
}
const getResolution = () =>{
  const width = window.screen.width * window.devicePixelRatio
  const height = window.screen.height * window.devicePixelRatio
  return {
    width,
    height,
    resolution:`${width}x${height}`
  }
}

export function getOsVersion() {
  const u = navigator.userAgent
  let device_model = '',os_name = '',os_version = ''
  if (u.indexOf('Mac OS X') > -1) {
    // ios
    const regStr_saf = /OS [\d._]*/gi
    const verinfo = u.match(regStr_saf)
    device_model = `IOS${  (`${verinfo  }`).replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.')}`
    os_name = 'IOS'
  } else if (u.indexOf('Android') > -1 ||
      u.indexOf('Linux') > -1) {
    // android
    device_model = `Android${  u.substr(u.indexOf('Android') + 8, u.indexOf(';', u.indexOf('Android')) - u.indexOf('Android') - 8)}`
    os_name = 'Android'
  } else {
    const userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.indexOf('windows nt 5.1') > -1 || userAgent.indexOf('windows nt 5.2') > -1) {
      device_model = 'Windows XP'
      os_name = 'Windows'
      os_version = 'xp'
    }  else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {
      device_model = 'Windows NT 7'
      os_name = 'Windows'
      os_version = '7'
    }  else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows nt 10.0') > -1) {
      device_model = 'Windows NT 10'
      os_name = 'Windows'
      os_version = '10'
    } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows nt 11.0') > -1) {
      device_model = 'Windows NT 11'
      os_name = 'Windows'
      os_version = '11'

    }else {
      device_model = 'Unknown'
      os_name = 'Unknown'
      os_version = 'Unknown'
    }
  }
  return {
    device_model,
    os_name,
    language:navigator.language,
    os_version
  }
}

export const getSysInfo = () =>{
  const browserInfo = uaMatch(navigator.userAgent.toLocaleLowerCase()) || {browser: "", version: "0"};
  const resolutionInfo = getResolution()
  const osInfo = getOsVersion()
  if(window){
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

export const extend = (objFir:any,objSec:any) => {
  return Object.assign({}, objFir, objSec)
}

// 判定布尔
export const isBool = (val: unknown) => typeof val === 'boolean'
// 判定字符串
export const isString = (val: unknown) => typeof val == 'string' && val.constructor == String
// 判定数字
export const isNumber = (val: unknown) => typeof val === 'number'

// 判定 是否是方法
export const isFunction = (val: unknown) =>
    Object.prototype.toString.call(val) === '[object Function]'
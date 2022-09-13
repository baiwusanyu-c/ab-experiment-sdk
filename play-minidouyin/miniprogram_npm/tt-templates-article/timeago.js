/*
 * 摘自jquery1.9.1 稍加修改
 */
const whitespace = '[\\x20\\t\\r\\n\\f]'
const rtrim = new RegExp(`^${whitespace}+|((?:^|[^\\\\])(?:\\\\.)*)${whitespace}+$`, 'g')
const class2type = {}
const core_trim = String.prototype.trim
const core_toString = class2type.toString
const $trim =
  core_trim && !core_trim.call('\uFEFF\xA0')
    ? function (text) {
        return text === null ? '' : core_trim.call(text)
      }
    : // Otherwise use our own trimming functionality
      function (text) {
        return text == null ? '' : `${text}`.replace(rtrim, '')
      }

function $type(obj) {
  if (obj === null) {
    return String(obj)
  }
  return typeof obj === 'object' || typeof obj === 'function'
    ? class2type[core_toString.call(obj)] || 'object'
    : typeof obj
}

function $isFunction(obj) {
  return $type(obj) === 'function'
}

/*
 * 来自toutiao wap 修改
 */
function dateFormat(date, fmt) {
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      )
    }
  }
  return fmt
}
// Date.prototype.format = function (fmt) {
//     var o = {
//         'M+': this.getMonth() + 1,
//         'd+': this.getDate(),
//         'h+': this.getHours(),
//         'm+': this.getMinutes(),
//         's+': this.getSeconds(),
//         'q+': Math.floor((this.getMonth() + 3) / 3),
//         S: this.getMilliseconds()
//     };
//     if (/(y+)/.test(fmt)) {
//         fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
//     }
//     for (var k in o) {
//         if (new RegExp('(' + k + ')').test(fmt)) {
//             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
//         }
//     }
//     return fmt;
// };

let $t = {}

function timeago(datetime, options) {
  const text = $t.inWords($t.datetime(datetime))
  return text
}
function distance(date) {
  return new Date().getTime() - date.getTime()
}
function daysAgo(date) {
  const now = new Date()
  return now.getMonth() > date.getMonth() || now.getDate() > date.getDate()
}
function yearsAgo(date) {
  return new Date().getFullYear() > date.getFullYear()
}

$t = {
  settings: {
    relative: false,
    strings: {
      suffixAgo: '前',
      seconds: '刚刚',
      minute: '1分钟',
      minutes: '%d分钟',
      hour: '1小时',
      hours: '%d小时',
      days: '%d天',
      months: '%d月',
      years: '%d年',
      numbers: [],
    },
    yearsAgoFormat: 'yyyy-MM-dd',
    daysAgoFormat: 'MM-dd',
  },
  inWords(date) {
    const relative = $t.settings.relative
    // if (!relative && yearsAgo(date)) {
    //   console.log(1);
    //   return dateFormat(date, this.settings.yearsAgoFormat);
    // }
    // if (!relative && daysAgo(date)) {
    //   return dateFormat(date, this.settings.daysAgoFormat);
    // }
    const distanceMillis = distance(date)
    const $l = this.settings.strings
    const suffix = $l.suffixAgo
    const seconds = Math.abs(distanceMillis) / 1000
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24
    const months = days / 30
    const years = days / 365
    let words
    const myDate = new Date()
    const currentDays = new Date(myDate.getFullYear(), parseInt(myDate.getMonth()), 0).getDate()

    // console.log("秒:%d,分:%d,时:%d,天:%d,月:%d,年:%d",seconds, minutes, hours, days, months, years);
    function substitute(stringOrFunction, number) {
      const string = $isFunction(stringOrFunction)
        ? stringOrFunction(number, distanceMillis)
        : stringOrFunction
      const value = ($l.numbers && $l.numbers[number]) || number
      return string.replace(/%d/i, value)
    }
    function originDate(distanceMillis) {
      const d = new Date(+new Date() - distanceMillis)
      const M = d.getMonth() + 1,
        D = d.getDate(),
        H = d.getHours(),
        I = d.getMinutes()
      return `${M < 10 ? `0${M}` : M}-${D < 10 ? `0${D}` : D} ${H < 10 ? `0${H}` : H}:${
        I < 10 ? `0${I}` : I
      }`
    }
    if (seconds < 60) {
      words = substitute($l.seconds, Math.floor(seconds))
    } else if (minutes < 60) {
      words = substitute($l.minutes, Math.floor(minutes))
    } else if (hours < 24) {
      words = substitute($l.hours, Math.floor(hours))
    } else if (days < 3) {
      words = days < 2 ? '昨天' : '前天'
      return words
    } else if (3 <= days && days < 7) {
      words = substitute($l.days, Math.floor(days))
    } else if (days < 365) {
      return dateFormat(date, this.settings.daysAgoFormat)
    } else {
      return dateFormat(date, this.settings.yearsAgoFormat)
    }

    if (words === '刚刚') {
      return words
    }
    return `${words}${suffix}`
  },
  parse(iso8601) {
    // var s = $trim(iso8601);
    // s = s.replace(/\.\d+/, '');
    // s = s.replace(/-/, '/').replace(/-/, '/');
    // s = s.replace(/T/, ' ').replace(/Z/, ' UTC');
    // s = s.replace(/([+-]\d\d):?(\d\d)/, ' $1$2');
    // console.log('s', s)
    return new Date(iso8601)
  },
  datetime(datetime) {
    return $t.parse(datetime)
  },
}

module.exports = timeago

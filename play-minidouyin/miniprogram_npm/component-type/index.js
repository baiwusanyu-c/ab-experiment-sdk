!(function (e, t) {
  if ('object' == typeof exports && 'object' == typeof module) module.exports = t()
  else if ('function' == typeof define && define.amd) define([], t)
  else {
    const r = t()
    for (const n in r) ('object' == typeof exports ? exports : e)[n] = r[n]
  }
})(window, () => {
  return (function (e) {
    const t = {}
    function r(n) {
      if (t[n]) return t[n].exports
      const o = (t[n] = { i: n, l: !1, exports: {} })
      return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports
    }
    return (
      (r.m = e),
      (r.c = t),
      (r.d = function (e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n })
      }),
      (r.r = function (e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 })
      }),
      (r.t = function (e, t) {
        if ((1 & t && (e = r(e)), 8 & t)) return e
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e
        const n = Object.create(null)
        if (
          (r.r(n),
          Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (const o in e)
            r.d(
              n,
              o,
              (t => {
                return e[t]
              }).bind(null, o)
            )
        return n
      }),
      (r.n = function (e) {
        const t =
          e && e.__esModule
            ? function () {
                return e.default
              }
            : function () {
                return e
              }
        return r.d(t, 'a', t), t
      }),
      (r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }),
      (r.p = ''),
      r((r.s = 0))
    )
  })([
    function (e, t) {
      const r = Object.prototype.toString
      e.exports = function (e) {
        switch (r.call(e)) {
          case '[object Date]':
            return 'date'
          case '[object RegExp]':
            return 'regexp'
          case '[object Arguments]':
            return 'arguments'
          case '[object Array]':
            return 'array'
          case '[object Error]':
            return 'error'
        }
        return null === e
          ? 'null'
          : void 0 === e
          ? 'undefined'
          : e != e
          ? 'nan'
          : e && 1 === e.nodeType
          ? 'element'
          : (function (e) {
              return !(
                null == e ||
                !(
                  e._isBuffer ||
                  (e.constructor &&
                    'function' == typeof e.constructor.isBuffer &&
                    e.constructor.isBuffer(e))
                )
              )
            })(e)
          ? 'buffer'
          : typeof (e = e.valueOf ? e.valueOf() : Object.prototype.valueOf.apply(e))
      }
    },
  ])
})

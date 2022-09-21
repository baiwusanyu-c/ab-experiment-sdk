!(function (t, e) {
  if ('object' == typeof exports && 'object' == typeof module) module.exports = e()
  else if ('function' == typeof define && define.amd) define([], e)
  else {
    const r = e()
    for (const n in r) ('object' == typeof exports ? exports : t)[n] = r[n]
  }
})(window, () => {
  return (function (t) {
    const e = {}
    function r(n) {
      if (e[n]) return e[n].exports
      const o = (e[n] = { i: n, l: !1, exports: {} })
      return t[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports
    }
    return (
      (r.m = t),
      (r.c = e),
      (r.d = function (t, e, n) {
        r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n })
      }),
      (r.r = function (t) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 })
      }),
      (r.t = function (t, e) {
        if ((1 & e && (t = r(t)), 8 & e)) return t
        if (4 & e && 'object' == typeof t && t && t.__esModule) return t
        const n = Object.create(null)
        if (
          (r.r(n),
          Object.defineProperty(n, 'default', { enumerable: !0, value: t }),
          2 & e && 'string' != typeof t)
        )
          for (const o in t)
            r.d(
              n,
              o,
              (e => {
                return t[e]
              }).bind(null, o)
            )
        return n
      }),
      (r.n = function (t) {
        const e =
          t && t.__esModule
            ? function () {
                return t.default
              }
            : function () {
                return t
              }
        return r.d(e, 'a', e), e
      }),
      (r.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
      }),
      (r.p = ''),
      r((r.s = 4))
    )
  })([
    function (t, e) {
      const r = Object.prototype.toString
      t.exports = function (t) {
        switch (r.call(t)) {
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
        return null === t
          ? 'null'
          : void 0 === t
          ? 'undefined'
          : t != t
          ? 'nan'
          : t && 1 === t.nodeType
          ? 'element'
          : (function (t) {
              return !(
                null == t ||
                !(
                  t._isBuffer ||
                  (t.constructor &&
                    'function' == typeof t.constructor.isBuffer &&
                    t.constructor.isBuffer(t))
                )
              )
            })(t)
          ? 'buffer'
          : typeof (t = t.valueOf ? t.valueOf() : Object.prototype.valueOf.apply(t))
      }
    },
    function (t, e) {
      ;(e.set = function (t, e, r) {
        for (var n = e.split('.'), o = n.pop(), i = 0; i < n.length; i++) {
          const u = n[i]
          ;(t[u] = t[u] || {}), (t = t[u])
        }
        t[o] = r
      }),
        (e.get = function (t, e) {
          for (var r = e.split('.'), n = r.pop(), o = 0; o < r.length; o++) {
            const i = r[o]
            if (!t[i]) return
            t = t[i]
          }
          return t[n]
        })
    },
    function (t, e, r) {
      'use strict'
      function n(t) {
        return (n =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (t) {
                return typeof t
              }
            : function (t) {
                return t &&
                  'function' == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? 'symbol'
                  : typeof t
              })(t)
      }
      function o(t) {
        if (void 0 === t)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
        return t
      }
      function i(t) {
        const e = 'function' == typeof Map ? new Map() : void 0
        return (i = function (t) {
          if (
            null === t ||
            !(function (t) {
              return -1 !== Function.toString.call(t).indexOf('[native code]')
            })(t)
          )
            return t
          if ('function' != typeof t)
            throw new TypeError('Super expression must either be null or a function')
          if (void 0 !== e) {
            if (e.has(t)) return e.get(t)
            e.set(t, r)
          }
          function r() {
            return u(t, arguments, c(this).constructor)
          }
          return (
            (r.prototype = Object.create(t.prototype, {
              constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 },
            })),
            a(r, t)
          )
        })(t)
      }
      function u(t, e, r) {
        return (u = (function () {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1
          if (Reflect.construct.sham) return !1
          if ('function' == typeof Proxy) return !0
          try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], () => {})), !0
          } catch (t) {
            return !1
          }
        })()
          ? Reflect.construct
          : function (t, e, r) {
              const n = [null]
              n.push.apply(n, e)
              const o = new (Function.bind.apply(t, n))()
              return r && a(o, r.prototype), o
            }).apply(null, arguments)
      }
      function a(t, e) {
        return (a =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t
          })(t, e)
      }
      function c(t) {
        return (c = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
      }
      Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0)
      const s = (function (t) {
        function e(t, r) {
          let i
          return (
            (function (t, e) {
              if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function')
            })(this, e),
            (i = (function (t, e) {
              return !e || ('object' !== n(e) && 'function' != typeof e) ? o(t) : e
            })(this, c(e).call(this, t))),
            f(o(i), 'path', r),
            f(o(i), 'expose', !0),
            f(o(i), 'status', 400),
            Error.captureStackTrace && Error.captureStackTrace(o(i), e),
            i
          )
        }
        return (
          (function (t, e) {
            if ('function' != typeof e && null !== e)
              throw new TypeError('Super expression must either be null or a function')
            ;(t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && a(t, e)
          })(e, i(Error)),
          e
        )
      })()
      e.default = s
      var f = function (t, e, r) {
        Object.defineProperty(t, e, { enumerable: !1, configurable: !0, writable: !0, value: r })
      }
      t.exports = e.default
    },
    function (t, e, r) {
      'use strict'
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.assign = function (t, e, r) {
          if ('string' == typeof t) return void (r[t] = e)
          Object.keys(t).forEach(e => {
            return (r[e] = t[e])
          })
        }),
        (e.walk = function t(e, r, i) {
          const u = e.split(/\.\$(?=\.|$)/)
          const a = u.shift()
          const c = n.default.get(r, a)
          if (!u.length) return i(a, c)
          if (!Array.isArray(c)) return
          for (let s = 0; s < c.length; s++) {
            const f = o(s, a),
              l = f + u.join('.$')
            t(l, r, i)
          }
        }),
        (e.join = o)
      var n = (function (t) {
        return t && t.__esModule ? t : { default: t }
      })(r(1))
      function o(t, e) {
        return e ? ''.concat(e, '.').concat(t) : t
      }
    },
    function (t, e, r) {
      'use strict'
      Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0)
      const n = l(r(0)),
        o = l(r(1)),
        i = l(r(5)),
        u = l(r(6)),
        a = l(r(7)),
        c = l(r(8)),
        s = l(r(2)),
        f = r(3)
      function l(t) {
        return t && t.__esModule ? t : { default: t }
      }
      function p(t, e) {
        return (
          (function (t) {
            if (Array.isArray(t)) return t
          })(t) ||
          (function (t, e) {
            if (
              !(
                Symbol.iterator in Object(t) ||
                '[object Arguments]' === Object.prototype.toString.call(t)
              )
            )
              return
            let r = [],
              n = !0,
              o = !1,
              i = void 0
            try {
              for (
                var u, a = t[Symbol.iterator]();
                !(n = (u = a.next()).done) && (r.push(u.value), !e || r.length !== e);
                n = !0
              );
            } catch (t) {
              ;(o = !0), (i = t)
            } finally {
              try {
                n || null == a.return || a.return()
              } finally {
                if (o) throw i
              }
            }
            return r
          })(t, e) ||
          (function () {
            throw new TypeError('Invalid attempt to destructure non-iterable instance')
          })()
        )
      }
      function h(t, e) {
        for (let r = 0; r < e.length; r++) {
          const n = e[r]
          ;(n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
      }
      const y = (function () {
        function t() {
          const e = this,
            r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          !(function (t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function')
          })(this, t),
            (this.opts = n),
            (this.hooks = []),
            (this.props = {}),
            (this.messages = Object.assign({}, a.default)),
            (this.validators = Object.assign({}, c.default)),
            (this.typecasters = Object.assign({}, i.default)),
            Object.keys(r).forEach(t => {
              return e.path(t, r[t])
            })
        }
        return (
          (function (t, e, r) {
            e && h(t.prototype, e), r && h(t, r)
          })(t, [
            {
              key: 'path',
              value(e, r) {
                const n = this,
                  o = e.split('.'),
                  i = o.pop(),
                  a = o.join('.')
                if ((a && this.path(a), '$' === i && this.path(a).type(Array), r instanceof t))
                  return (
                    r.hook((t, r) => {
                      return n.path((0, f.join)(t, e), r)
                    }),
                    this.path(e, r.props)
                  )
                if (r instanceof u.default) return (this.props[e] = r), this.propagate(e, r), r
                const c = this.props[e] || new u.default(e, this)
                if (((this.props[e] = c), this.propagate(e, c), !r)) return c
                if ('string' == typeof r || 'function' == typeof r) return c.type(r), c
                if (Array.isArray(r))
                  return c.type(Array), 1 === r.length ? c.each(r[0]) : c.elements(r), c
                let s = !1
                for (const l in r)
                  if (r.hasOwnProperty(l) && 'function' != typeof c[l]) {
                    c.type(Object), (s = !0)
                    break
                  }
                return (
                  Object.keys(r).forEach(t => {
                    const o = r[t]
                    if (s) return n.path((0, f.join)(t, e), o)
                    c[t](o)
                  }),
                  c
                )
              },
            },
            {
              key: 'typecast',
              value(t) {
                for (
                  var e = function () {
                      const e = p(n[r], 2),
                        i = e[0],
                        u = e[1]
                      ;(0, f.walk)(i, t, (e, r) => {
                        if (null != r) {
                          const n = u.typecast(r)
                          n !== r && o.default.set(t, e, n)
                        }
                      })
                    },
                    r = 0,
                    n = Object.entries(this.props);
                  r < n.length;
                  r++
                )
                  e()
                return this
              },
            },
            {
              key: 'strip',
              value(t, e) {
                const r = this,
                  o = (0, n.default)(t)
                if ('array' === o)
                  return (
                    t.forEach((t, n) => {
                      return r.strip(t, (0, f.join)('$', e))
                    }),
                    this
                  )
                if ('object' !== o) return this
                for (let i = 0, u = Object.entries(t); i < u.length; i++) {
                  const a = p(u[i], 2),
                    c = a[0],
                    s = a[1],
                    l = (0, f.join)(c, e)
                  this.props[l] ? this.strip(s, l) : delete t[c]
                }
                return this
              },
            },
            {
              key: 'validate',
              value(t) {
                let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                  r = []
                ;(e = Object.assign(this.opts, e)).typecast && this.typecast(t),
                  !1 !== e.strip && this.strip(t)
                for (
                  var n = function () {
                      const e = p(i[o], 2),
                        n = e[0],
                        u = e[1]
                      ;(0, f.walk)(n, t, (e, n) => {
                        const o = u.validate(n, t, e)
                        o && r.push(o)
                      })
                    },
                    o = 0,
                    i = Object.entries(this.props);
                  o < i.length;
                  o++
                )
                  n()
                return r
              },
            },
            {
              key: 'assert',
              value(t, e) {
                const r = p(this.validate(t, e), 1)[0]
                if (r) throw r
              },
            },
            {
              key: 'message',
              value(t, e) {
                return (0, f.assign)(t, e, this.messages), this
              },
            },
            {
              key: 'validator',
              value(t, e) {
                return (0, f.assign)(t, e, this.validators), this
              },
            },
            {
              key: 'typecaster',
              value(t, e) {
                return (0, f.assign)(t, e, this.typecasters), this
              },
            },
            {
              key: 'hook',
              value(t) {
                return this.hooks.push(t), this
              },
            },
            {
              key: 'propagate',
              value(t, e) {
                return (
                  this.hooks.forEach(r => {
                    return r(t, e)
                  }),
                  this
                )
              },
            },
          ]),
          t
        )
      })()
      ;(e.default = y), (y.ValidationError = s.default), (t.exports = e.default)
    },
    function (t, e) {
      function r(t, e) {
        const n = r[e]
        if ('function' != typeof n) throw new Error(`cannot cast to ${e}`)
        return n(t)
      }
      ;(t.exports = r),
        (r.string = function (t) {
          return t.toString()
        }),
        (r.number = function (t) {
          const e = parseFloat(t)
          return isNaN(e) ? null : e
        }),
        (r.date = function (t) {
          const e = new Date(t)
          return isNaN(e.valueOf()) ? null : e
        }),
        (r.array = function (t) {
          if (t instanceof Array) return t
          for (var e = t.toString().split(','), r = 0; r < e.length; r++) e[r] = e[r].trim()
          return e
        }),
        (r.boolean = function (t) {
          return !!t && 'false' !== t
        })
    },
    function (t, e, r) {
      'use strict'
      Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0)
      const n = (function (t) {
          return t && t.__esModule ? t : { default: t }
        })(r(2)),
        o = r(3)
      function i(t) {
        return (
          (function (t) {
            if (Array.isArray(t)) {
              for (var e = 0, r = new Array(t.length); e < t.length; e++) r[e] = t[e]
              return r
            }
          })(t) ||
          (function (t) {
            if (
              Symbol.iterator in Object(t) ||
              '[object Arguments]' === Object.prototype.toString.call(t)
            )
              return Array.from(t)
          })(t) ||
          (function () {
            throw new TypeError('Invalid attempt to spread non-iterable instance')
          })()
        )
      }
      function u(t, e) {
        return (
          (function (t) {
            if (Array.isArray(t)) return t
          })(t) ||
          (function (t, e) {
            if (
              !(
                Symbol.iterator in Object(t) ||
                '[object Arguments]' === Object.prototype.toString.call(t)
              )
            )
              return
            let r = [],
              n = !0,
              o = !1,
              i = void 0
            try {
              for (
                var u, a = t[Symbol.iterator]();
                !(n = (u = a.next()).done) && (r.push(u.value), !e || r.length !== e);
                n = !0
              );
            } catch (t) {
              ;(o = !0), (i = t)
            } finally {
              try {
                n || null == a.return || a.return()
              } finally {
                if (o) throw i
              }
            }
            return r
          })(t, e) ||
          (function () {
            throw new TypeError('Invalid attempt to destructure non-iterable instance')
          })()
        )
      }
      function a(t, e) {
        for (let r = 0; r < e.length; r++) {
          const n = e[r]
          ;(n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
      }
      const c = (function () {
        function t(e, r) {
          !(function (t, e) {
            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function')
          })(this, t),
            (this.name = e),
            (this.registry = {}),
            (this._schema = r),
            (this._type = null),
            (this.messages = {})
        }
        return (
          (function (t, e, r) {
            e && a(t.prototype, e), r && a(t, r)
          })(t, [
            {
              key: 'message',
              value(t) {
                'string' == typeof t && (t = { default: t })
                for (let e = 0, r = Object.entries(t); e < r.length; e++) {
                  const n = u(r[e], 2),
                    o = n[0],
                    i = n[1]
                  this.messages[o] = i
                }
                return this
              },
            },
            {
              key: 'schema',
              value(t) {
                return this._schema.path(this.name, t), this
              },
            },
            {
              key: 'use',
              value(t) {
                const e = this
                return (
                  Object.keys(t).forEach(r => {
                    let n = t[r]
                    Array.isArray(n) || (n = [n])
                    const o = n.shift()
                    e._register(r, n, o)
                  }),
                  this
                )
              },
            },
            {
              key: 'required',
              value() {
                const t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]
                return this._register('required', [t])
              },
            },
            {
              key: 'type',
              value(t) {
                return (this._type = t), this._register('type', [t])
              },
            },
            {
              key: 'string',
              value() {
                return this.type(String)
              },
            },
            {
              key: 'number',
              value() {
                return this.type(Number)
              },
            },
            {
              key: 'array',
              value() {
                return this.type(Array)
              },
            },
            {
              key: 'date',
              value() {
                return this.type(Date)
              },
            },
            {
              key: 'length',
              value(t) {
                return this._register('length', [t])
              },
            },
            {
              key: 'size',
              value(t) {
                return this._register('size', [t])
              },
            },
            {
              key: 'enum',
              value(t) {
                return this._register('enum', [t])
              },
            },
            {
              key: 'match',
              value(t) {
                return this._register('match', [t])
              },
            },
            {
              key: 'each',
              value(t) {
                return this._schema.path((0, o.join)('$', this.name), t), this
              },
            },
            {
              key: 'elements',
              value(t) {
                const e = this
                return (
                  t.forEach((t, r) => {
                    e._schema.path((0, o.join)(r, e.name), t)
                  }),
                  this
                )
              },
            },
            {
              key: 'properties',
              value(t) {
                for (let e = 0, r = Object.entries(t); e < r.length; e++) {
                  const n = u(r[e], 2),
                    i = n[0],
                    a = n[1]
                  this._schema.path((0, o.join)(i, this.name), a)
                }
                return this
              },
            },
            {
              key: 'path',
              value() {
                let t
                return (t = this._schema).path.apply(t, arguments)
              },
            },
            {
              key: 'typecast',
              value(t) {
                let e = this._schema,
                  r = this._type
                if (!r) return t
                'function' == typeof r && (r = r.name)
                const n = e.typecasters[r] || e.typecasters[r.toLowerCase()]
                if ('function' != typeof n)
                  throw new Error('Typecasting failed: No typecaster defined for '.concat(r, '.'))
                return n(t)
              },
            },
            {
              key: 'validate',
              value(t, e) {
                for (
                  let r =
                      arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.name,
                    n = 0,
                    o = Object.keys(this.registry);
                  n < o.length;
                  n++
                ) {
                  const i = o[n],
                    u = this._run(i, t, e, r)
                  if (u) return u
                }
                return null
              },
            },
            {
              key: '_run',
              value(t, e, r, n) {
                if (this.registry[t]) {
                  const o = this._schema,
                    u = this.registry[t],
                    a = u.args
                  return (u.fn || o.validators[t]).apply(void 0, [e, r].concat(i(a), [n]))
                    ? void 0
                    : this._error(t, r, a, n)
                }
              },
            },
            {
              key: '_register',
              value(t, e, r) {
                return (this.registry[t] = { args: e, fn: r }), this
              },
            },
            {
              key: '_error',
              value(t, e, r, o) {
                let u = this._schema,
                  a =
                    this.messages[t] || this.messages.default || u.messages[t] || u.messages.default
                return (
                  'function' == typeof a && (a = a.apply(void 0, [o, e].concat(i(r)))),
                  new n.default(a, o)
                )
              },
            },
          ]),
          t
        )
      })()
      ;(e.default = c), (t.exports = e.default)
    },
    function (t, e, r) {
      'use strict'
      Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0)
      const n = {
        type(t, e, r) {
          return (
            'function' == typeof r && (r = r.name), ''.concat(t, ' must be of type ').concat(r, '.')
          )
        },
        required(t) {
          return ''.concat(t, ' is required.')
        },
        match(t, e, r) {
          return ''.concat(t, ' must match ').concat(r, '.')
        },
        length(t, e, r) {
          if ('number' == typeof r) return ''.concat(t, ' must have a length of ').concat(r, '.')
          const n = r.min,
            o = r.max
          return n && o
            ? ''.concat(t, ' must have a length between ').concat(n, ' and ').concat(o, '.')
            : o
            ? ''.concat(t, ' must have a maximum length of ').concat(o, '.')
            : n
            ? ''.concat(t, ' must have a minimum length of ').concat(n, '.')
            : void 0
        },
        size(t, e, r) {
          if ('number' == typeof r) return ''.concat(t, ' must have a size of ').concat(r, '.')
          const n = r.min,
            o = r.max
          return void 0 !== n && void 0 !== o
            ? ''.concat(t, ' must be between ').concat(n, ' and ').concat(o, '.')
            : void 0 !== o
            ? ''.concat(t, ' must be less than ').concat(o, '.')
            : void 0 !== n
            ? ''.concat(t, ' must be greater than ').concat(n, '.')
            : void 0
        },
        enum(t, e, r) {
          const n = r.slice(),
            o = n.pop()
          return ''.concat(t, ' must be either ').concat(n.join(', '), ' or ').concat(o, '.')
        },
        default(t) {
          return 'Validation failed for '.concat(t, '.')
        },
      }
      ;(e.default = n), (t.exports = e.default)
    },
    function (t, e, r) {
      'use strict'
      Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0)
      const n = (function (t) {
        return t && t.__esModule ? t : { default: t }
      })(r(0))
      const o = {
        required(t, e, r) {
          return !1 === r || (null != t && '' !== t)
        },
        type(t, e, r) {
          return (
            null == t || ('function' == typeof r ? t.constructor === r : (0, n.default)(t) === r)
          )
        },
        length(t, e, r) {
          if (null == t) return !0
          if ('number' == typeof r) return t.length === r
          const n = r.min,
            o = r.max
          return !(n && t.length < n) && !(o && t.length > o)
        },
        size(t, e, r) {
          if (null == t) return !0
          if ('number' == typeof r) return t === r
          const n = r.min,
            o = r.max
          return !(null != parseInt(n) && t < n) && !(null != parseInt(o) && t > o)
        },
        enum(t, e, r) {
          return null == t || r.includes(t)
        },
        match(t, e, r) {
          return null == t || r.test(t)
        },
      }
      ;(e.default = o), (t.exports = e.default)
    },
  ])
})

import {
  deepCopy,
  extend,
  isArray,
  isBool,
  isEmptyObj,
  isFunction,
  isNumber,
  isObject,
  isString,
} from '@ab-test-sdk/utils'

describe('test-utils.ts', () => {
  test('isBool', () => {
    expect(isBool(false)).toBeTruthy()
    expect(isBool(1)).not.toBeTruthy()
    expect(isBool('1')).not.toBeTruthy()
    expect(isBool(() => jest.fn)).not.toBeTruthy()
    expect(isBool({})).not.toBeTruthy()
  })

  test('isString', () => {
    expect(isString(false)).not.toBeTruthy()
    expect(isString(1)).not.toBeTruthy()
    expect(isString('1')).toBeTruthy()
    expect(isString(() => jest.fn)).not.toBeTruthy()
    expect(isString({})).not.toBeTruthy()
  })

  test('isNumber', () => {
    expect(isNumber(false)).not.toBeTruthy()
    expect(isNumber(1)).toBeTruthy()
    expect(isNumber('1')).not.toBeTruthy()
    expect(isNumber(() => jest.fn)).not.toBeTruthy()
    expect(isNumber({})).not.toBeTruthy()
  })

  test('isFunction', () => {
    expect(isFunction(false)).not.toBeTruthy()
    expect(isFunction(1)).not.toBeTruthy()
    expect(isFunction('1')).not.toBeTruthy()
    expect(isFunction(() => jest.fn)).toBeTruthy()
    expect(isFunction({})).not.toBeTruthy()
    expect(isFunction(async () => jest.fn)).toBeTruthy()
  })

  test('isEmptyObj', () => {
    expect(isEmptyObj(false)).not.toBeTruthy()
    expect(isEmptyObj(1)).not.toBeTruthy()
    expect(isEmptyObj('1')).not.toBeTruthy()
    expect(isEmptyObj({ s: 1 })).not.toBeTruthy()
    expect(isEmptyObj({})).toBeTruthy()
    expect(isEmptyObj(() => jest.fn)).not.toBeTruthy()
  })

  test('extend', () => {
    const foo = { a: 1 }
    const te = { b: 2 }
    expect(extend(foo, te).a === 1).toBeTruthy()
    expect(extend(foo, te).b === 2).toBeTruthy()
  })

  test('isObject', () => {
    expect(isObject({})).toBeTruthy()
    expect(isObject(null)).not.toBeTruthy()
    expect(isObject(1)).not.toBeTruthy()
    expect(isObject('null')).not.toBeTruthy()
    expect(isObject(true)).not.toBeTruthy()
    expect(isObject(undefined)).not.toBeTruthy()
    expect(isObject(() => jest.fn)).not.toBeTruthy()
    expect(isObject([])).not.toBeTruthy()
  })

  test('isArray', () => {
    expect(isArray({})).not.toBeTruthy()
    expect(isArray(null)).not.toBeTruthy()
    expect(isArray(1)).not.toBeTruthy()
    expect(isArray('null')).not.toBeTruthy()
    expect(isArray(true)).not.toBeTruthy()
    expect(isArray(undefined)).not.toBeTruthy()
    expect(isArray(() => jest.fn)).not.toBeTruthy()
    expect(isArray([])).toBeTruthy()
    expect(isArray([], null)).toBeTruthy()
  })

  test('deepCopy', () => {
    const obj = {
      1: 1,
      2: '2',
      3: true,
      4: [],
      5: {},
      6: () => jest.fn,
      7: null,
      8: undefined,
    }
    const obj2 = obj
    const obj3 = deepCopy(obj)
    expect(obj2 === obj).toBeTruthy()
    expect(obj3 !== obj).toBeTruthy()
  })
})

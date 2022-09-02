import { extend, isBool, isEmptyObj, isFunction, isNumber, isString } from '@ab-test-sdk/utils'

describe('test-utils.ts', () => {
  test('isBool', () => {
    expect(isBool(false)).toBeTruthy()
    expect(isBool(1)).not.toBeTruthy()
    expect(isBool('1')).not.toBeTruthy()
    expect(isBool(() => {})).not.toBeTruthy()
    expect(isBool({})).not.toBeTruthy()
  })

  test('isString', () => {
    expect(isString(false)).not.toBeTruthy()
    expect(isString(1)).not.toBeTruthy()
    expect(isString('1')).toBeTruthy()
    expect(isString(() => {})).not.toBeTruthy()
    expect(isString({})).not.toBeTruthy()
  })

  test('isNumber', () => {
    expect(isNumber(false)).not.toBeTruthy()
    expect(isNumber(1)).toBeTruthy()
    expect(isNumber('1')).not.toBeTruthy()
    expect(isNumber(() => {})).not.toBeTruthy()
    expect(isNumber({})).not.toBeTruthy()
  })

  test('isFunction', () => {
    expect(isFunction(false)).not.toBeTruthy()
    expect(isFunction(1)).not.toBeTruthy()
    expect(isFunction('1')).not.toBeTruthy()
    expect(isFunction(() => {})).toBeTruthy()
    expect(isFunction({})).not.toBeTruthy()
    expect(isFunction(async () => {})).toBeTruthy()
  })

  test('isEmptyObj', () => {
    expect(isEmptyObj(false)).not.toBeTruthy()
    expect(isEmptyObj(1)).not.toBeTruthy()
    expect(isEmptyObj('1')).not.toBeTruthy()
    expect(isEmptyObj({ s: 1 })).not.toBeTruthy()
    expect(isEmptyObj({})).toBeTruthy()
    expect(isEmptyObj(() => {})).not.toBeTruthy()
  })

  test('extend', () => {
    const foo = { a: 1 }
    const te = { b: 2 }
    expect(extend(foo, te).a === 1).toBeTruthy()
    expect(extend(foo, te).b === 2).toBeTruthy()
  })
})

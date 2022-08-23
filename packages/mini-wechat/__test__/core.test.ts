
import { cbdABTest,mergeConfig, sdk } from "../core";
import defaultConfig from '../config'

describe('test-mini-wechat--core.ts', () => {
    test('cbdABTest can call sdk instance function', () => {
        const callFn = jest.fn()
        sdk.start = callFn
        cbdABTest('start')
        expect(callFn).toBeCalled()
    })

    test('merge config', () => {
        expect(defaultConfig.appKey).toBe(undefined)
        const mergeRes = mergeConfig({
            appKey:123456
        } as any,defaultConfig)
        expect(mergeRes.appKey).toBe(123456)
    })

})
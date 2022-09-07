import defaultConfig, {mergeConfig, setConfig} from '../config'
import {isEmptyObj} from '@ab-test-sdk/utils'

const cloneConfig = JSON.parse(JSON.stringify(defaultConfig))
describe('core--config.ts', () => {
    test('can set config attr', () => {
        expect(defaultConfig.appKey).toBe(undefined)
        setConfig('appKey',123456)
        expect(defaultConfig.appKey).toBe(123456)
    })

    test('can set custom config attr', () => {
        expect(isEmptyObj(defaultConfig.customConfig)).toBe(true)
        setConfig('customAttr','customAttr')
        expect(defaultConfig.customConfig.customAttr).toBe('customAttr')
    })

    test('merge config', () => {
        expect(cloneConfig.appKey).toBe(undefined)
        const mergeRes = mergeConfig({
            appKey: 123456
        } as any, cloneConfig)
        expect(mergeRes.appKey).toBe(123456)
        const mergeResDefault = mergeConfig({
            appKey: 7890
        } as any)
        expect(mergeResDefault.appKey).toBe(7890)
    })
})

import { setConfig } from '../config'
import config from "../config";
import {isEmptyObj} from "@ab-test-sdk/utils";
describe('test-mini-wechat--config.ts', () => {
    test('can set config attr', () => {
        expect(config.appKey).toBe(undefined)
        setConfig('appKey',123456)
        expect(config.appKey).toBe(123456)
    })

    test('can set custom config attr', () => {
        expect(isEmptyObj(config.customConfig)).toBe(true)
        setConfig('customAttr','customAttr')
        expect(config.customConfig.customAttr).toBe('customAttr')
    })
})
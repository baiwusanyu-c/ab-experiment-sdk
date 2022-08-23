import { setConfig } from '../config'
import config from "../config";
describe('test-mini-wechat--config.ts', () => {
    test('can set config attr', () => {
        expect(config.appKey).toBe(undefined)
        setConfig('appKey',123456)
        expect(config.appKey).toBe(123456)
    })
})
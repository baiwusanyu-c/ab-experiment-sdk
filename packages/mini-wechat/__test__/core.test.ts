import {cbdABTest, mergeConfig, sdk, shuntAlgorithm, abTestShunt, abTestGrouping} from "../core";
import defaultConfig from '../config'
import {IConfigMiniWechat, IExpConfig, IOption} from "@ab-test-sdk/utils";

const expConfigObj = [
    {
        "experimentId": 1,
        "experimentKey": "MP_INDEX",
        "experimentTrafficWeight": 5.6,
        "versions": [
            {
                "versionId": 1,
                "versionTrafficWeight": 48,
                "whitelist": "123,234",
                "versionParam": {
                    "param3": "1",
                    "param1": "value1"
                }
            },
            {
                "versionId": 2,
                "versionTrafficWeight": 52,
                "whitelist": null,
                "versionParam": {
                    "param4": "2",
                    "param2": "value2"
                }
            }
        ]
    }
]
const expConfigObjChange = [
    {
        "experimentId": 2,
        "experimentKey": "MP_INDEX",
        "experimentTrafficWeight": 5.6,
        "versions": [
            {
                "versionId": 1,
                "versionTrafficWeight": 48,
                "whitelist": "123,234",
                "versionParam": {
                    "param3": "1",
                    "param1": "value1"
                }
            },
            {
                "versionId": 2,
                "versionTrafficWeight": 52,
                "whitelist": null,
                "versionParam": {
                    "param4": "2",
                    "param2": "value2"
                }
            }
        ]
    }
]
const getExpConfig = () => {
    return expConfigObj
}
describe('test-mini-wechat--core.ts', () => {

    test('cbdABTest can call sdk instance function', () => {
        const sdkInst = cbdABTest('resetInstance') as typeof sdk
        const callFn = jest.fn(()=>{
            sdkInst.configOption = {} as IConfigMiniWechat
            sdkInst.log = false
            sdkInst.expConfig = []
            if(sdkInst.timer){
                clearTimeout(sdkInst.timer)
            }
            sdkInst.timer = 0
            sdkInst.isInit = false
            sdkInst.shuntRes = {}
            sdkInst.groupRes = {}
        })
        sdkInst.resetInstance = callFn
        cbdABTest('resetInstance')
        expect(callFn).toBeCalled()
    })

    test('cbdABTest can return sdk instance', () => {
        const reSDK =  cbdABTest('resetInstance')
        expect(reSDK === sdk).toBeTruthy()
    })

    test('shunt algorithm', () => {
        const shuntResFalse = shuntAlgorithm('GACo74wkDIkDzEhkwRwgjGt1pqlk', 5.6)
        expect(!shuntResFalse.isEntry).toBeTruthy()
        expect(shuntResFalse.hashVal).toBe(91)
        const shuntResTrue = shuntAlgorithm('GACo74wkDIkDzEhkwRwgjGz1123', 5.6)
        expect(shuntResTrue.isEntry).toBeTruthy()
        expect(shuntResTrue.hashVal).toBe(2.2)
    })

    test('ab test shunt', () => {
        const ctx = {
            expConfig: expConfigObj,
            configOption: {
                userId: 'GACo74wkDIkDzEhkwRwgjGt1pqlk',
            } as IConfigMiniWechat
        }
        const shuntResArrFalse = abTestShunt(ctx as any)
        expect(shuntResArrFalse[expConfigObj[0].experimentId].experimentId).toBe(expConfigObj[0].experimentId)
        expect(shuntResArrFalse[expConfigObj[0].experimentId].isEntry).not.toBeTruthy()
        expect(shuntResArrFalse[expConfigObj[0].experimentId].hashVal).toBe(91)
        ctx.configOption.userId = 'GACo74wkDIkDzEhkwRwgjGz1123'
        const shuntResArrTrue = abTestShunt(ctx as any)
        expect(shuntResArrTrue[expConfigObj[0].experimentId].experimentId).toBe(expConfigObj[0].experimentId)
        expect(shuntResArrTrue[expConfigObj[0].experimentId].isEntry).toBeTruthy()
        expect(shuntResArrTrue[expConfigObj[0].experimentId].hashVal).toBe(2.2)
    })

    test('ab test grouping', () => {
        const ctx = {
            configOption: {
                userId: 'GACo74wkDIkDzEhkwRwgjGz1123',
            } as IConfigMiniWechat
        }
        const shuntRes = {
            '1': {
                experimentId: 1,
                experimentKey: 'MP_INDEX',
                experimentTrafficWeight: 5.6,
                versions: expConfigObj[0].versions,
                isEntry: false,
                hashVal: 2.2

            }
        }
        const groupRes = abTestGrouping(ctx as any, shuntRes['1'])
        expect(groupRes.res.isEntryVersion).toBe(true)
        expect(groupRes.msg).toBe('group successfully')
    })

    test('merge config', () => {
        expect(defaultConfig.appKey).toBe(undefined)
        const mergeRes = mergeConfig({
            appKey: 123456
        } as any, defaultConfig)
        expect(mergeRes.appKey).toBe(123456)
    })

    test('sdk instance function ———— init', () => {
        cbdABTest('resetInstance')
        const reSDK = cbdABTest('init', {
            appKey: 'CBD_WX_MP',
            log: true,
            userId: 'GACo74wkDIkDzEhkwRwgjGt1pqlk'
        }) as typeof sdk
        expect(reSDK.log).toBeTruthy()
        expect(reSDK.isInit).toBeTruthy()
        expect(reSDK.configOption.appKey).toBe('CBD_WX_MP')
        expect(reSDK.configOption.userId).toBe('GACo74wkDIkDzEhkwRwgjGt1pqlk')
    })

    test('sdk instance function ———— start', async () => {
        cbdABTest('resetInstance')
         cbdABTest('init', {
            appKey: 'CBD_WX_MP',
            userId: 'GACo74wkDIkDzEhkwRwgjGt1pqlk'
        },getExpConfig)

        const startSDK:any  = await cbdABTest('start')
        const initExpId =  startSDK.res.expConfig[0].experimentId
        expect(initExpId).toBe(1)
        expect(startSDK.res.shuntRes['1'].isEntry).not.toBeTruthy()
        expect(startSDK.res.shuntRes['1'].hashVal).toBe(91)
    })

    test('sdk instance function ———— getVar', async () => {
        cbdABTest('resetInstance')
        const reSDK = cbdABTest('init', {
            appKey: 'CBD_WX_MP',
            log: true,
            userId: 'GACo74wkDIkDzEhkwRwgjGt1pqlk'
        },getExpConfig) as typeof sdk
        await cbdABTest('start')
        cbdABTest('getVar','2','defaultVersion',(data:any)=>{
            expect(data.msg).toBe('unknown exception')
            expect(data.res).toBe('defaultVersion')
        })
        cbdABTest('getVar','1','defaultVersion',(data:any)=>{
            expect(data.msg).toBe('user did not enter the experiment')
            expect(data.res).toBe('defaultVersion')
        })
        cbdABTest('config',{
            appKey: 'CBD_DY_MP',
            userId: 'GACo74wkDIkDzEhkwRwgjGz1123'
        })
        await cbdABTest('start')
        cbdABTest('getVar','1','defaultVersion',(data:any)=>{
            expect(data.msg).toBe('group successfully')
            expect(data.res.isEntryVersion).toBeTruthy()
        })
    })

    test('sdk instance function ———— config', () => {
        const reSDK = cbdABTest('init', {
            appKey: 'CBD_WX_MP',
            userId: 'GACo74wkDIkDzEhkwRwgjGt1pqlk'
        }) as typeof sdk
        expect(reSDK.configOption.appKey).toBe('CBD_WX_MP')
        expect(reSDK.configOption.userId).toBe('GACo74wkDIkDzEhkwRwgjGt1pqlk')
        cbdABTest('config', {
            appKey: 'CBD_DY_MP',
            userId: 'GACo74wkDIkDzEhkwRwgjGt1pqlk--Change'
        })
        expect(reSDK.configOption.appKey).toBe('CBD_DY_MP')
        expect(reSDK.configOption.userId).toBe('GACo74wkDIkDzEhkwRwgjGt1pqlk--Change')
    })

    test('sdk instance function ———— resetInstance', () => {
        const reSDK = cbdABTest('init', {
            appKey: 'CBD_WX_MP',
            log: true,
            userId: 'GACo74wkDIkDzEhkwRwgjGt1pqlk'
        }) as typeof sdk
        expect(reSDK.log).toBeTruthy()
        expect(reSDK.isInit).toBeTruthy()
        expect(reSDK.configOption.appKey).toBe('CBD_WX_MP')
        expect(reSDK.configOption.userId).toBe('GACo74wkDIkDzEhkwRwgjGt1pqlk')
        cbdABTest('resetInstance')
        expect(reSDK.log).not.toBeTruthy()
        expect(reSDK.isInit).not.toBeTruthy()
        expect(reSDK.configOption.appKey).toBe(undefined)
        expect(reSDK.configOption.userId).toBe(undefined)
    })

    test('sdk instance function ———— refresh', async () => {
        cbdABTest('resetInstance')
        const initReSDK:any = cbdABTest('init', {
            appKey: 'CBD_WX_MP',
            userId: 'GACo74wkDIkDzEhkwRwgjGt1pqlk'
        },getExpConfig)

        const refreshSDK:any  = await cbdABTest('refresh')
        const initExpId =  refreshSDK.expConfig[0].experimentId
        expect(refreshSDK.shuntRes['1'].isEntry).not.toBeTruthy()
        expect(refreshSDK.shuntRes['1'].hashVal).toBe(91)

        initReSDK.getExpConfig = () =>{
            return expConfigObjChange
        }
        const refreshChangeSDK = await cbdABTest('refresh')
        expect(initExpId !== (refreshChangeSDK as {expConfig:Array<any>}).expConfig[0].experimentId).toBeTruthy()
    })

})
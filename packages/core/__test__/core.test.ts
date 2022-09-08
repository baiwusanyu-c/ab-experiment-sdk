import {
    cbdABTest,
    sdk,
    autoRefresh,
    getExperimentConfig
} from "../core";
import {IConfigMiniWechat, setRequestInst} from '@ab-test-sdk/utils'

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
describe('core--core.ts', () => {

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

   /* test('cbdABTest can be threaded into the object to build multiple sdk instances', () => {
        const sdkInst = cbdABTest('resetInstance') as typeof sdk

        const sdkKey = `GACo74wkSCABTESTDIkDzEhkwRwgjGt1pqlklength`
        cbdABTest({funcName:'init',sdkKey}, {
            appKey: 'SC_TEST_APP', // 替换成您的appKey
            log: false, // 是否打印log
            userId:'GACo74wkDIkDzEhkwRwgjGt1pqlk',
        })

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
    })*/

    test('cbdABTest can refresh', () => {
        jest.useFakeTimers();
        const callFn = jest.fn()
        const ctx = {
            configOption:{
                autoRefreshStep:100
            },
            timer:0,
            refresh:callFn
        }
        autoRefresh(ctx as any)
        jest.advanceTimersByTime(1000)
        expect(callFn).toBeCalled()
    })

    test('cbdABTest getExperimentConfig', async () => {
        setRequestInst(import('../../../utils/fetch/fetch-web'))
        const res = await getExperimentConfig(123,{log:false} as any)
        expect(res).toBe(undefined)

    })

    test('cbdABTest can return sdk instance', () => {
        const reSDK =  cbdABTest('resetInstance')
        expect(reSDK === sdk).toBeTruthy()
    })

    test('sdk instance not init',async () =>{
        const startSDK:any  = await cbdABTest('start')
        expect(startSDK).toBe(undefined)
        cbdABTest('getVar','1','defaultVersion',(data:any)=>{
            expect(data.res).toBe(undefined)
        })
        cbdABTest('config', {
            appKey: 'CBD_DY_MP',
            userId: 'GACo74wkDIkDzEhkwRwgjGt1pqlk--Change'
        },(data:any)=>{
            expect(data.res).toBe(undefined)
        })
        cbdABTest('refresh',(data:any)=>{
            expect(data.res).toBe(undefined)
        })
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

        cbdABTest('resetInstance')
        const sdkKey = `GACo74wkSCABTESTDIkDzEhkwRwgjGt1pqlklength`
        const reSDKInst = cbdABTest({funcName:'init',sdkKey}, {
            appKey: 'SC_TEST_APP', // 替换成您的appKey
            log: true, // 是否打印log
            userId:'GACo74wkSCABTESTDIkDzEhkwRwgjGt1pqlklength',
        })

        expect(reSDKInst.log).toBeTruthy()
        expect(reSDKInst.isInit).toBeTruthy()
        expect(reSDKInst.configOption.appKey).toBe('SC_TEST_APP')
        expect(reSDKInst.configOption.userId).toBe('GACo74wkSCABTESTDIkDzEhkwRwgjGt1pqlklength')

        const startSDK = cbdABTest({funcName:'start',sdkKey:'wqdasdqwdwqd'})
        expect(startSDK.msg).toBe('sdkKey does not exist')

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

    test('sdk instance function ———— resetInstance', async () => {
        const initReSDK:any = cbdABTest('init', {
            appKey: 'CBD_WX_MP',
            userId: 'GACo74wkDIkDzEhkwRwgjGt1pqlk'
        },getExpConfig)
        console.log(initReSDK.configOption.appKey)
        expect(initReSDK.configOption.appKey).toBe('CBD_WX_MP')
        initReSDK.timer = 1
        cbdABTest('resetInstance')
        expect(initReSDK.configOption.appKey).toBe(undefined)
        expect(initReSDK.timer).toBe(0)

    })

})

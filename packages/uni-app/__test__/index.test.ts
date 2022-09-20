import {ABTest, IConfigMiniWechat, sdk} from "../index";
describe('uni-app--index.ts', () => {
    test('ABTest function', () => {
        const sdkInst = ABTest('resetInstance') as typeof sdk
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
        ABTest('resetInstance')
        expect(callFn).toBeCalled()
    })

})

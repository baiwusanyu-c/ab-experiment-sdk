import {IConfigMiniWechat} from '@ab-test-sdk/utils'
import {abTestGrouping, abTestShunt,shuntAlgorithm} from "../shunt-group";

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

describe('core--shunt-group.ts', () => {

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
        const groupRes = abTestGrouping(ctx as any, shuntRes['1'],'')
        expect(groupRes.res.isEntryVersion).toBe(true)
        expect(groupRes.msg).toBe('group successfully')
    })

})

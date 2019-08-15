

const configlist = {
    "code": "200",
    "msg": null,
    "data": {
        "records": [
            {
                envId: 1,
                publicGatewayUrl: 'pb_gwl0',
                privateGatewayUrl:'pr_gwl0',
                agentUrl: 'agent_url0',
                envName: 'env_name0',
                status: 'SUCCESS',
                fileServerUrl: '/f/fsul0',
                ifSelected: 'T',
            },
            {
                envId: 2,
                publicGatewayUrl: 'pb_gwl1',
                privateGatewayUrl:'pr_gwl1',
                agentUrl: 'agent_url1',
                envName: 'env_name1',
                status: 'FAIL',
                fileServerUrl: '/f/fsul1',
                ifSelected: 'T',
            },
            {
                envId: 3,
                publicGatewayUrl: 'pb_gwl2',
                privateGatewayUrl:'pr_gwl2',
                agentUrl: 'agent_url2',
                envName: 'env_name2',
                status: 'SUCCESS',
                fileServerUrl: '/f/fsul2',
                ifSelected: 'F',
            },
            {
                envId: 4,
                publicGatewayUrl: 'pb_gwl3',
                privateGatewayUrl:'pr_gwl3',
                agentUrl: 'agent_url3',
                envName: 'env_name3',
                status: 'SUCCESS',
                fileServerUrl: '/f/fsul3',
                ifSelected: 'T',
            },
            {
                envId: 5,
                publicGatewayUrl: 'pb_gwl4',
                privateGatewayUrl:'pr_gwl4',
                agentUrl: 'agent_url4',
                envName: 'env_name4',
                status: 'SUCCESS',
                fileServerUrl: '/f/fsul4',
                ifSelected: 'T',
            },
            {
                envId: 6,
                publicGatewayUrl: 'pb_gwl5',
                privateGatewayUrl:'pr_gwl5',
                agentUrl: 'agent_url5',
                envName: 'env_name5',
                status: 'FALI',
                fileServerUrl: '/f/fsul5',
                ifSelected: 'T',
            },
            {
                envId: 7,
                publicGatewayUrl: 'pb_gwl6',
                privateGatewayUrl:'pr_gwl6',
                agentUrl: 'agent_url6',
                envName: 'env_name6',
                status: 'SUCCESS',
                fileServerUrl: '/f/fsul6',
                ifSelected: 'F',
            },
            {
                envId: 8,
                publicGatewayUrl: 'pb_gwl7',
                privateGatewayUrl:'pr_gwl7',
                agentUrl: 'agent_url07',
                envName: 'env_name7',
                status: 'FAIL',
                fileServerUrl: '/f/fsul7',
                ifSelected: 'F',
            },
            {
                envId: 9,
                publicGatewayUrl: 'pb_gwl8',
                privateGatewayUrl:'pr_gwl8',
                agentUrl: 'agent_url8',
                envName: 'env_name8',
                status: 'SUCCESS',
                fileServerUrl: '/f/fsul8',
                ifSelected: 'T',
            },
            {
                envId: 10,
                publicGatewayUrl: 'pb_gwl9',
                privateGatewayUrl:'pr_gwl9',
                agentUrl: 'agent_url9',
                envName: 'env_name9',
                status: 'SUCCESS',
                fileServerUrl: '/f/fsul9',
                ifSelected: 'T',
            },
            {
                envId: '11',
                publicGatewayUrl: 'pb_gwl10',
                privateGatewayUrl:'pr_gwl10',
                agentUrl: 'agent_url10',
                envName: 'env_name10',
                status: 'SUCCESS',
                fileServerUrl: '/f/fsul10',
                ifSelected: 'T',
            },
        ]
    }
}
const configlistDataResource = configlist.data.records

export function configlistFunc(req, res, b) {
    const result = {
        "code": "200",
        "msg": null,
        "data": {
            "records": configlistDataResource
        }

    }
    
    if (res && res.json) {
        return res.json(result);
    }
    return result;
}
export default {
    'GET /baseInfo/sysdata/configList': configlistFunc,
}

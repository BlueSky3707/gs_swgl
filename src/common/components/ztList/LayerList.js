export const AllZt: [
    {
        title: '气环境专题',
        typeList: [
            {
                name: '大气站',
                layerid: "sx_dqzdid",
                active:false,
                child: [
                    {
                        filter:"stationattri=0",
                        name:'国考',
                        active:false
                    },
                    {
                        filter:"stationattri=1",
                        name:'省考',
                        active:false
                    },
                    {
                        filter:"stationattri=2",
                        name:'市考',
                        active:false
                    },
                    {
                        filter:"stationattri=9",
                        name:'微站1',
                        active:false
                    },
                    {
                        filter:"stationattri=8",
                        name:'微站2',
                        active:false
                    },
                    {
                        filter:"stationattri=5",
                        name:'微站3',
                        active:false
                    },
                ]
            },
            {
                layerid: "sx_qwryid",
                name: '气污染源',
                active:false,
                child: [
                    {
                        filter:"isonline='0'",
                        name:'重点',
                        active:false
                    },
                    {
                        filter:"isonline='1'",
                        name:'在线',
                        active:false
                    },
                    {
                        filter:"isonline='2'",
                        name:'许可证',
                        active:false
                    },
                ]
            },
            {
                layerid: "sx_ylqyid",
                name: '运力企业',
                active:false,
            },
            {
                layerid: "sx_cljczid",
                name: '车辆检测站',
                active:false,
            },
            {
                layerid:"sx_clzlzid",
                name: '车辆治理站',
                active:false,
            },
            {

                name: '遥感监测',
                active:false,
            },
            {

                name: '施工工地',
                active:false,
            },
            {
                layerid:"sx_qxzid",
                name: '气象站',
                active:false,
                child: [
                    {
                        filter:"grade='一般站'",
                        name:'一般站',
                        active:false
                    },
                    {
                        filter:"grade='基本站'",
                        name:'基本站',
                        active:false
                    },
                    {
                        filter:"grade='基准站'",
                        name:'基准站',
                        active:false
                    },
                ]
            },
            {
                name: '加油站',
                active:false,
            },
            {
                name: '储油库',
                active:false,
            },
            {
                name: '锅炉',
                active:false,
            },
        ]
    },
    {
        title: '水环境专题',
        typeList: [
            {
                layerid:"sx_jcdmid",
                name: '监测断面',
                active:false,
                child: [
                    {
                        name:'国考',
                        active:false
                    },
                    {
                        name:'省考',
                        active:false
                    },
                    {
                        name:'市考',
                        active:false
                    },
                    {
                        name:'跨省界',
                        active:false
                    },
                    {
                        name:'跨市界',
                        active:false
                    },
                ]
            },
            {

                layerid:"sx_swryid",
                name: '水污染源',
                active:false,
                child: [
                    {
                        name:'重点',
                        active:false
                    },
                    {
                        name:'在线',
                        active:false
                    },
                    {
                        name:'许可证',
                        active:false
                    },
                ]
            },
            {
                layerid:"sx_wsclcid",
                name: '污水处理厂',
                active:false,
            },
            {
                name: '城市集中式饮用水源地',
                active:false,
            },
            {
                name: '其他水源地',
                active:false,
            },
            {
                name: '水文监测站',
                active:false,
            },
        ]
    },
    {
        title: '生态专题',
        typeList: [
            {
                layerid: "sx_sgnqid",
                name: '水功能区',
                active:false,
            },
            {

                layerid:"sx_bhq_hxqid",
                name: '核心区',
                active:false,
            },
            {
                layerid:"sx_bhq_hcqid",
                name: '缓冲区',
                active:false,
            },
            {
                layerid:"sx_bhq_syqid",
                name: '试验区',
                active:false,
            },
            {
                layerid: "sx_stgyid",
                name: '生态公园',
                active:false,
            },
            {
                name: '保护区',
                active:false,
            },
        ]
    } ,
    {
        title: '土壤专题',
        typeList: [
            {
                name: '土壤监测站',
                active:false,
            },
        ]
    },
    {
        title: '固废专题',
        typeList: [
            {
                name: '垃圾处理厂',
                active:false,
            },
            {
                name: '固废企业',
                active:false,
            },
        ]
    },
    {
        title: '辐射专题',
        typeList: [
            {
                name: '辐射监测站',
                active:false,
            },
            {
                name: '辐射企业',
                active:false,
            },
        ]
    },
    {
        title: '执法专题',
        typeList: [
            {
                name: '执法案件',
                active:false,
                child: [
                    {
                        name: '举报投诉',
                        active: false
                    },
                    {
                        name: '双随机',
                        active: false
                    },
                    {
                        name: '行政处罚',
                        active: false
                    },
                    {
                        name: '其他',
                        active: false
                    },
                ]
            },
            {
                name: '被执法企业',
                active:false,
            },
        ]
    },
    {
        title: '应急专题',
        typeList: [
            {
                layerid:"sx_yjztid",
                name: '敏感源',
                active:false,
                child: [
                    {
                        filter:"talbletype=0",
                        name: '政府',
                        active: false
                    },
                    {
                        filter:"talbletype=2",
                        name: '学校',
                        active: false
                    },
                    {
                        filter:"talbletype=1",
                        name: '医院',
                        active: false
                    },
                    {
                        filter:"talbletype=3",
                        name: '景区',
                        active: false
                    },
                ]
            },
            {
                name: '应急避难场所',
                active:false,
            },
            {
                name: '应急物资库',
                active:false,
            },
            {
                name: '无人机',
                active:false,
            },
            {
                name: '自动监测车',
                active:false,
            },
        ]
    },
]

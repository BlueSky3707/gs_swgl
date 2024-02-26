import instance from "@/common/axios"
//国考、省考、市考、微站实时数据，带等级
export const getRealTimeData = (params)=>{
    return instance({
        url:'/gapi/sqCommon/yzt2/aqi/getRealTimeData',
        params
    })
}
//站点AQI日历
export const getStationAqiCalendar = (params)=>{
    return instance({
        url:'/gapi/sqCommon/yzt2/aqi/getStationAqiCalendar',
        params
    })
}
//历史监测数据
export const getStationAqiHistory = (params)=>{
    return instance({
        url:'/gapi/sqCommon/yzt2/aqi/getStationAqiHistory',
        params
    })
}
/** ...................................... 气象站 .................................................   **/

//气象站点历史数据-根据时间段查询
export const getQx24hData = (params)=>{
    return instance({
        url:'/gapi/gis/gis/getQx24hData',
        params
    })
}
/** ...................................... 气象站 .................................................   **/

//各地市减排企业（填过减排清单数据的企业）统计
export const countReduceListByCity = (params)=>{
    return instance({
        url:'/gapi/airEmergency/airEmergencyGis/countReduceListByCity',
        params
    })
}
//预警响应数量和对应区域
export const getWarnCountAndAreaList = (params)=>{
    return instance({
        url:'/gapi/airEmergency/airEmergencyGis/getWarnCountAndAreaList',
        params
    })
}
//重污染天响应列表、总数量（带分页）
export const getEmergencyManageWarnInfoList = (params)=>{
    return instance({
        url:'/gapi/airEmergency/airEmergencyGis/getEmergencyManageWarnInfoList',
        params
    })
}
//地市字典
export const cityApi = (params)=>{
    return instance({
        url:'/gapi/sqCommon/common/area/cityList',
        params
    })
}
//企业数量统计（限产、停产）
export const countAirEnergencyReduceCorp = (params)=>{
    return instance({
        url:'/gapi/airEmergency/airEmergencyGis/countAirEnergencyReduceCorp',
        params
    })
}
//统计总的排放值（PM2.5 、PM10、SO2、NO2、VOCs）。
export const airEnergencyReduceHz = (params)=>{
    return instance({
        url:'/gapi/airEmergency/airEmergencyGis/airEnergencyReduceHz',
        params
    })
}
//某预警具体执行的减排清单列表
export const airEnergencyReduceList = (params)=>{
    return instance({
        url:'/gapi/airEmergency/airEmergencyGis/airEnergencyReduceList',
        params
    })
}
//地市AQI预测数据
export const aqiPreRealList = (params)=>{
    return instance({
        url:'/gapi/airEmergency/airEmergencyGis/aqiPreRealList',
        params
    })
}
//aqi日均值（默认日期最大值数据，可查询历史） GIS
export const getAqiDailyAverage = (params)=>{
    return instance({
        url:'/gapi/sqCommon/yzt2/waterEnvironment/getAqiDatapublishlive',//getAqiDailyAverage
        params
    })
}
//aqi日均值（默认日期最大值数据，可查询历史）
export const AqiAverage = (params)=>{
    return instance({
        url:'/gapi/sqCommon/yzt2/aqi/getAqiDailyAverage',
        params
    })
}
//各地市减排企业列表
export const reduceCorpList = (params)=>{
    return instance({
        url:'/gapi/airEmergency/airEmergencyGis/reduceCorpList',
        params
    })
}

//超标记录
export const recordExceedingStandard = (params)=>{
    return instance({
        url:'/gapi/sqCommon/yzt2/waterEnvironment/recordExceedingStandard',
        params
    })
}

//预警记录
export const earlyWarningRecord = (params)=>{
    return instance({
        url:'/gapi/sqCommon/yzt2/waterEnvironment/earlyWarningRecord',
        params
    })
}

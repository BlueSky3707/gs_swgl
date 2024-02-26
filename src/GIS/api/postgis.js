import axios from 'axios'
// *表名layerName
// *isReturnGeometry默认true
//spatialFilter空间过滤数据wkt
//spatialRel空间位置关系INTERSECTS,CONTAINS,DISJOINT,TOUCHES,CROSSES,WITHIN,OVERLAPS
//filter属性过滤条件
// outFields 属性字段，默认全部
// orderByFields 排序语句
// current 当前页，默认1
// limit每页记录数，默认100
export const search = (params) => {

    return axios({
      url: '/dbapi/api/search',
      params
    })
}
//*表名layerName
//*isReturnGeometry默认true
//缓冲距离buffDis,默认0
//spatialFilter要缓冲的空间数据wkt，为空则显示全部
//filter属性过滤条件
// outFields 属性字段，默认全部
// orderByFields 排序语句
// current 当前页，默认1
// limit每页记录数，默认100
export const bufferSearch = (params) => {
    return axios({
      url: '/dbapi/bufferSearch',
      params
    })
}
//*表名layerName
//*行政区表cityLayerName
//*isReturnGeometry默认true
//行政区cityname名称条件语句 name='延安市'
//或citycode编码条件语句citycode='600061000'
//where属性过滤条件
// outFields 属性字段，默认全部
// orderByFields 排序语句
// current 当前页，默认1
// limit每页记录数，默认100
export const getDataByNameOrCode = (params) => {
    return axios({
      url: '/dbapi/getDataByNameOrCode',
      params
    })
}
// 城市数据统计
// *layername要统计表名"cun_sx"
// *citytablename城市表"city_gz"
// outFields城市表字段cityname,citycode
// *type统计格式 数量"count(*)",求和"sum(length)",平均"avg(length)"
export const getGroupData = (params) => {
  return axios({
    url: '/dbapi/getGroupData',
    params
  })
}





// import { getDQZdata} from "../api/server";

let getZDdata = null; //大气匹配数据

//根据要素和后台数据动态匹配
export const getFeaturesBydata = (pfeatrues, pdata, field, dfiled) => {
  if (pfeatrues && pfeatrues.length) {
    pfeatrues.forEach((item) => {
      if (item.values_.attributes.hasOwnProperty(field)) {
        if (pdata && pdata.length) {
          let filterData = pdata.filter(
            (itm) => itm[dfiled] == item.values_.attributes[field]
          );
          if (filterData && filterData.length) {
            Object.assign(item.values_.attributes, filterData[0]);
          } else {
            item.values_.attributes.rqCategory = "Ⅰ";
          }
        }
      }
    });
    return pfeatrues;
  }
};
// 实时数据匹配级添加匹配图层
export const getFeaturesByLayerid = async (layerid, pfeatrues, style) => {
  let features = [];
  
    return pfeatrues;

};


// 搜索数据匹配
export const getDatasByLayerid = async (layerid, item) => {
  let features = [];
  
    return item;
 
};
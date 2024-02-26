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
  // if (layerid === "sx_dqzdid") {
  //   //大气实时匹配
  //   if (!getZDdata) {
  //     getZDdata = await getDQZdata();
  //   }
  //   features = getFeaturesBydata(
  //     pfeatrues,
  //     getZDdata,
  //     "stationcode",
  //     "stationcode"
  //   );
    // return features;
  // }  else {
    return pfeatrues;
  // }
};


// 搜索数据匹配
export const getDatasByLayerid = async (layerid, item) => {
  let features = [];
  if (layerid === "sx_dqzdid") {
    //大气实时匹配
    if (!getZDdata) {
      getZDdata = await getDQZdata();
    }
    features = getZDdata.filter(ite=>ite.stationcode===item.stationcod)
    if(features.length>0){
      features[0].positionname=item.positionna
      features[0].stationattri= item.stationatt
      features[0].stationcode=item.stationcod
      features[0].unifiedcode_p=item.unifiedc_1
      features[0].unifiedcode=item.unifiedcod
    }
    return features.length>0?{...features[0],...item}:{...item};
  } else {
    return item;
  }
};
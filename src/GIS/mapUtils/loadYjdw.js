import { addCssLayer } from "@/GIS/mapUtils/gifLayer";
import { removeOverlaysById } from "@/GIS/mapUtils/baselayer";
import { layers } from "../config/layerConfig";
import { initLayers } from "../mapUtils/layersManger";
import { search } from "@/GIS/api/postgis";
import * as dayjs from "dayjs";
// let yjInterval = null;
// 预警点位图层
export const addYjLayer = () => {
  close();
  getYjData();

  initLayers(layers["yzt"], null)
};
export const addAllLayer = () => { };
// 获取应急点位数据
const getYjData = async () => {
  // 预警

  let param = {
    layerName: "byswgl_yjjl",
    isReturnGeometry: false,
    spatialRel: "INTERSECTS",
    isCache: false,
    filter: "zytime = '" + dayjs().format("YYYY-MM-DD") + "'"
  };
  let res = await search(param)
  if (res.data.data.features && res.data.data.features.length > 0) {
    let list = res.data.data.features.map(ite => ite.attributes)
    addCssLayer("yj_sbid", list, "ns", "we", "jcz");
  }

};
// 关闭应急点位图层
export const close = () => {
  // if (yjInterval) {
  removeOverlaysById("yj_sbid");
  // }
};
// 取消报警
export const qxBj = async (param) => {
  // let res= await saveCancelBjData(param)
  // if(res&&res.msg&&res.msg=="success"){
  // addYjLayer();
  // }
};

const nip203gs='/ngin84gis';
const nipargs='/nginarcgis';
export const mapConfig = {
    // 84在线天地图
    img84:"http://t{0-7}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=46b833e035265afa143efa1e728a54cd",
    vec84:"http://t{0-7}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=46b833e035265afa143efa1e728a54cd",
    road84:"http://t{0-7}.tianditu.gov.cn/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=46b833e035265afa143efa1e728a54cd",
    label84:"http://t{0-7}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=46b833e035265afa143efa1e728a54cd" ,
    bytile: `${nip203gs}/HXMAP_TS/Layers/_alllayers/`,
    byUrl: `${nipargs}/arcgis/rest/services/gs/MapServer`,
}

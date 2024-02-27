import { addCssLayer } from "@/GIS/mapUtils/gifLayer";
import { removeOverlaysById } from "@/GIS/mapUtils/baselayer";

let yjInterval = null
// 预警点位图层
export const addYjLayer = () => {
    close()
    getYjData()
    yjInterval = setInterval(getYjData, 300000)
}
// 获取应急点位数据
const getYjData = async() => {
    // 监测站预警
    let jczlist= [{LAT:34.2, LNG:108.5,name:"ass"},{LAT:34.8, LNG:108.5,name:"css"}]

   if(jczlist&&jczlist.length>0){
    addCssLayer("yj_jczid",jczlist,"LNG", "LAT",'jcz')
   }
    // 水表预警
   let sblist=[{LAT:35.2, LNG:109.5,name:"abss"}]

   if(sblist&&sblist.length>0){
    addCssLayer("yj_sbid",sblist,"LNG", "LAT",'sb')
   }
  
}
// 关闭应急点位图层
export const close = () => {
    if (yjInterval) {
        clearInterval(yjInterval)
        yjInterval = null
        removeOverlaysById("yj_jczid")
        removeOverlaysById("yj_sbid")
      
    }
}
// 取消报警
export const qxBj=async(param)=>{
    // let res= await saveCancelBjData(param)
    // if(res&&res.msg&&res.msg=="success"){
        addYjLayer()
    // }
}


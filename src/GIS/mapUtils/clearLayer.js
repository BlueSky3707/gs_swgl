
import { getLayerByid, reMoveLayerById, hiddenLayerById } from "../mapUtils/baselayer"
import { layers } from '../config/layerConfig'
import router from '@/common/router'
import store from '@/common/store'
import { list as searchlist } from "../mapview/searchConfig";

//清空所有图层
export const clearAllLayer = () => {
    store.commit("setxzq", "陕西省");

    Object.keys(layers).forEach(name => {
        layers[name].forEach(item => {
         
                reMoveLayerById(item.layerId)
           
        })
    })
    

    // 清空缓冲图层
    let bufferlayerids = ["buffmian", "qsdid_buffer", "ysqyid_buffer", "jczid_buffer"]
    bufferlayerids.forEach(ite => {
        reMoveLayerById(ite);
    })
  
  
    //清空其他临时图层
    clearQt()
}
//按路由清空图层
export const clearAllLayerByRouter = () => {

    const rname = router.currentRoute.value.name

}
//清空当前路由下所有图层
export const clearAllLayerInRouter = () => {
    const rname = router.currentRoute.value.name
    layers[rname].forEach(item => {
       
                reMoveLayerById(item.layerId)
       
    })
   
}
export const clearQt = () => {
    searchlist.map(item => item.active = false)
    let marklayer = getLayerByid('mark')
    marklayer.getSource().clear()
    window.$olMap.getView().setCenter([108.88, 35.9])
    window.$olMap.getView().setZoom(6.3)
    let poup = window.$olMap.getOverlayById("popupid")
    if (poup) {
        poup.setPosition(null)
    }
    let ptmlayer = getLayerByid("tmpid");
    ptmlayer.getSource().clear()
    let searchptmlayer = getLayerByid("searchtmpid");
    searchptmlayer.getSource().clear()
    let bufferlayer = getLayerByid("temp_buff_pointid");
    bufferlayer.getSource().clear()

    reMoveLayerById("ztTemp");
    store.commit("setLayerInfo", null);
    store.commit("setLayerInfo2", null);

}

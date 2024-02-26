<template>
<div>
  <div id="popup" class="ol-popup">
    <div id="contentId"></div>
  </div>

</div>
</template>

<script>
import Overlay from 'ol/Overlay'

import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createApp,onMounted } from 'vue'
import * as baseLayerUtils from '../mapUtils/baselayer'
import publicpoup from "../popup/publicpoup.vue"
import {attrs} from '../config/arrtbuteConfig'
import { reactive, toRefs } from 'vue'
export default {
  setup() {
    let mapPopup = null
    var overlay=null
      var overlaycontext=null
      const state = reactive({
           Pvalue:null,
           isFlag:false,
           top:0,
           left:0
        })
    onMounted(() => {
      addPopup()

    })
    //设置地图平移中心的动画
    const addPopup = () => {
      let container = document.getElementById('popup')
       overlay = new Overlay({
        id:"popupid",
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
        positioning:"top-center",
        offset:[0,20]
      })
      overlay.setPosition(undefined)
      window.$olMap.addOverlay(overlay)
      window.$olMap.on('click', function(evt) {
        if(overlaycontext){
            overlaycontext.setPosition(null)
          }
         state.Pvalue=null
        if (mapPopup) {
          mapPopup.unmount()
          mapPopup = null
        }
        let marklayer = baseLayerUtils.getLayerByid('mark')
        marklayer.getSource().clear()
         let feature = window.$olMap.forEachFeatureAtPixel(evt.pixel, function(
          feature,
          layer
        ) {
          if (layer&&layer.values_&&layer.values_.id) {
            feature.set("id",layer.values_.id)
            return feature;
          }else{
            return null
          }
        });
        if (feature && feature.get('attributes') && feature.get('id')) {
          // 可配置化属性弹窗
          if (attrs[feature.get('id')]) {
            mapPopup = createApp(publicpoup).use(ElementPlus,{
                locale: zhCn
            })
            feature.get('attributes').attrid=feature.get('id')
         
          }
          
          if (mapPopup) {
        
            marklayer.getSource().addFeature(feature)
            mapPopup.config.globalProperties.$pValue = feature.get('attributes')
            mapPopup.mount('#contentId')
            var coordinate =[];
            if(feature.getGeometry().getType().toLowerCase()==="point"){
               coordinate= feature.getGeometry().getCoordinates()
            }else{
               coordinate=evt.coordinate
            }      
            overlay.setPosition(coordinate)
            window.$olMap.getView().animate({
               center: coordinate,
               zoom:13,
               duration: 1000
            }) 
            let closer = document.getElementById('spanClose')
            if(closer){
                closer.onclick = function() {
                  overlay.setPosition(undefined)
                  closer.blur()
                  mapPopup.unmount()
                  marklayer.getSource().clear()
                  return
                }
            }
           
          } else {
            overlay.setPosition(null)
          }
        } else {
          overlay.setPosition(null)
        }
      })
    }

   
   
    return {
            ...toRefs(state)
          
    }
  }

}
</script>

<style lang="scss">
.ol-popup {
  border-radius: 6px;
  transform: translate(0, 0);
  transition: all 1s ease;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {

  display: none;
}
.ol-popup:before {
  
  display: none;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: '✖';
}
#poup-table {
  margin-top: 14px;
}
#poup-title {
  position: absolute;
  top: -1px;
  left: 16px;
  line-height: 35px;
  min-width: 233px;
}


</style>

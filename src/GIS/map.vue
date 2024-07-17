<template>
  <div id="content">
    <MapView ></MapView>
   
    <OnlineData ></OnlineData>

    <MapSearchBox ></MapSearchBox>

  </div>
</template>
<script setup>
import MapView from "./mapview/MapView.vue";
 import OnlineData from "./mapview/OnlineData.vue";
import MapHover from "./mapview/MapHover.vue";
import MapSearchBox from "./mapview/MapSearchBox.vue";

import * as baselayer from "./mapUtils/baselayer";
import { layers } from "./config/layerConfig";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { watch, onMounted, ref,watchEffect } from "vue";
import { initLayers } from "./mapUtils/layersManger";
import { clearAllLayer } from "./mapUtils/clearLayer";



const store = useStore();
const router = useRouter();
watch(
  () => [store.state.xzq],
  (newValue) => {
    if(newValue[0]!==""){
 changeLayer(newValue[0]);
    }
   
  }
);

watch(
  () => router.currentRoute.value.name,
  (newValue) => {
    store.state.isQhzt=false;
    clearAllLayer();
    if(layers[newValue]){
    let curlayers = layers[newValue].filter(item=>(item.default));
     
    initLayers(curlayers, null);
    }
    

  }
);
const changeLayer = (xzq) => {
  let r = router.currentRoute.value.name;
  let curlayers=[]

    if(xzq==="白银市"&&layers[r]){
       clearAllLayer();
       curlayers = layers[r].filter(item=>(item.default));
      
    }else{
       curlayers = JSON.parse(JSON.stringify(layers[r])).filter(item=>{
          let blayer= baselayer.getLayerByid(item.layerId)
          if((item.layerType === 1||item.layerType === 4) &&blayer){
            if(blayer.get("where")){
                if(blayer.get("where")){
                  item.filter= blayer.get("where")
                }
                // if(blayer.get("where2")){
                //     if(item.layerId==="sx_qwryid"||item.layerId==="sx_swryid"||item.layerId==="sx_wsclcid"){
                //       item.renderStyle.filter=blayer.get("where2")
                //     }
                // }
            }
          return item;
          }
       });
    }

  
  initLayers(curlayers, xzq);
};


</script>
<style scoped lang="scss">
#content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0px;
  margin: 0px;
}

.map-btn {
  position: absolute;
  height: 100px;
  left: 400px;
    top: 138px;
    
}
</style>

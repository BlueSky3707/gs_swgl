<template>
  <div id="mapid"></div>
  <img src="../../assets/header/left.png" class="left">
  <img src="../../assets/header/right.png" class="right">
</template>
<script setup>
import "ol/ol.css";
import {intMap} from "../mapUtils/map";
import {onMounted} from "vue";
import * as baseLayerUtils from "../mapUtils/baselayer";
import { initLayers } from "../mapUtils/layersManger";

import Feature from "ol/Feature";
import { layers } from "../config/layerConfig";

import {useStore} from "vuex";
import {addYjLayer  } from "../mapUtils/loadYjdw";
const store = useStore();

onMounted(async () => {
  intMap("mapid");
  addEvent();
  addYjLayer()
});
const addEvent = () => {
  window.$olMap.on("click", async (evt) => {
    let features = [];
    window.$olMap.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
      if (layer && layer.values_ && layer.values_.id) {
        feature.set("typeid", layer.values_.id);
        features.push(feature);
      }
    });
    if (features.length > 0) {
      let marklayer = baseLayerUtils.getLayerByid("mark");
      marklayer.getSource().clear();
      console.log("获取空间数据信息：" + features[0].values_.typeid);
      console.log(features[0]);
      if (features[0].getGeometry().getType().toLowerCase() === "point" && ["mark", "tmpid"].indexOf(features[0].values_.id) == -1
      ) {
         marklayer.getSource().addFeature(
              new Feature({
                // attributes: features[0].values_.attributes,
                geometry: features[0].getGeometry(),
                fromid: features[0].values_.typeid,
              })
          );
        if (features[0].values_.typeid.indexOf("_buffer") == -1) {
          store.commit("setLayerInfo", features[0]);

        }else{
           console.log("缓冲数据属性弹窗");
          // store.commit("setsubStation", {
          //     id: features[0].values_.typeid,
          //     value: features[0],
          //   });
        }
         let coordinate = features[0].getGeometry().getCoordinates();
          window.$olMap.getView().animate({
            center: coordinate,
            zoom: 13,
            duration: 500,
          });
      }
    }
  });
};
</script>
<style>
#mapid {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  overflow: hidden;
}

.ol-scale-line {
  background-color: inherit;
}

.ol-scale-line-inner {
  border: 1px solid black;
  border-top: none;
  color: black;
}

.ol-zoom {
  top: inherit;
  left: 0.5em;
  bottom: 2.5em;
}

.ol-zoom-extent button {
  background-color: #7f9dc3;
  background-image: url(../../assets/home.png);
  background-repeat: no-repeat;
  background-size: cover;
}

.ol-zoom-extent {
  top: initial;
  left: 0.5em;
  bottom: 6em;
}

.ol-rotate.ol-hidden {
  opacity: 1;
  visibility: inherit;
}

.ol-rotate {
  top: inherit;
  right: inherit;
  bottom: 8em;
  left: 0.5em;
}
.left{
  position: fixed;
  top: 100px;
  left: 0;
  z-index: 999;
}
.right{
  position: fixed;
  top: 100px;
  right: 0;
  z-index: 999;
}
</style>

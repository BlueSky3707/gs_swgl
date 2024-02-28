<template>
  <div id="mapid"></div>
</template>
<script setup>
import "ol/ol.css";
// import { Style,Icon, Stroke } from 'ol/style'
import { intMap } from "../mapUtils/map";
import { onMounted } from "vue";
import { useStore } from "vuex";
import { Feature } from "ol";
import * as baseLayerUtils from "../mapUtils/baselayer";
import { Point } from "ol/geom";
import { layers } from "../config/layerConfig";
import { initLayers } from "../mapUtils/layersManger";
const store = useStore();
onMounted(async () => {
  intMap("mapid");
  let curlayers = layers["yzt"].filter(item=>(item.default));
  initLayers(curlayers, null);
  window.$olMap.on("click", function (evt) {
    let features = [];
    window.$olMap.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
      if (layer && layer.values_ && layer.values_.id) {
        feature.set(
          "typeid",
          layer.values_.id === "searchtmpid"
            ? feature.values_.ptypeid
            : layer.values_.id
        );
        features.push(feature);
      }
    });

    if (features.length > 0) {
      let marklayer = baseLayerUtils.getLayerByid("mark");
      marklayer.getSource().clear();
      let feature = features[0];
      console.log("获取空间数据信息：");
      console.log(feature);
      let typeid = feature.values_.typeid;
      if (
        feature.getGeometry().getType().toLowerCase() === "point" ) {
        if (typeid.indexOf("_buffer") > -1) {
          store.commit("setLayerInfo2", feature);
        } else {
          store.commit("setLayerInfo", feature);
           let bufferlayer = baseLayerUtils.getLayerByid("temp_buff_pointid");
          bufferlayer.getSource().clear();
          baseLayerUtils.reMoveLayerById("qsdid_buffer");
           baseLayerUtils.reMoveLayerById("ysqyid_buffer");
            baseLayerUtils.reMoveLayerById("jczid_buffer");
            baseLayerUtils.reMoveLayerById("buffmian");
            store.commit("setLayerInfo2", null);
        }

        let coordinate = feature.getGeometry().getCoordinates();
        marklayer.getSource().addFeature(feature);
        if (["qsdid", "ysqyid", "jczid"].indexOf(typeid) > -1) {
          //缓冲分析临时图层
          let bufferlayer = baseLayerUtils.getLayerByid("temp_buff_pointid");
          bufferlayer.getSource().clear();
          bufferlayer.getSource().addFeature(feature);
        }
      
        window.$olMap.getView().animate({
          center: coordinate,
          zoom: 12,
          duration: 1000,
        });
      } 
    }
  });
});
</script>
<style>
#mapid {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}
.aqi24t {
  width: 63px;
  height: 31px;
  position: absolute;
  top: 71px;
  right: 131px;
  background: white;
  z-index: 100;
}
.aqi7d {
  width: 63px;
  height: 31px;
  position: absolute;
  top: 120px;
  right: 131px;
  background: white;
  z-index: 100;
}
.aqi5d {
  width: 63px;
  height: 31px;
  position: absolute;
  top: 170px;
  right: 131px;
  background: white;
  z-index: 100;
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
</style>

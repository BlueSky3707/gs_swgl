<template>
  <div>
    <div class="_hoverContent" id="hoverid">
      <div class="_itmHover" v-for="item in hoverData" :key="item.keys">
        {{ item.values }}
      </div>
    </div>

  </div>
</template>
<script>
import { onMounted, reactive, toRefs } from "vue";

import { getLayerByid } from "../mapUtils/baselayer";
export default {

  setup() {
    const pdata = reactive({
      hoverData: [
        
      ],
      datakeys: {
       
        
      },
   
    });

    onMounted(() => {
      addHover();
    });
    const showInf = (evt) => {
      
      document.getElementById("hoverid").style.top =
        evt.originalEvent.offsetY + "px";
      document.getElementById("hoverid").style.display = "block";
      document.getElementById("hoverid").style.left =
        evt.originalEvent.offsetX + 15 + "px";
    };
    const addHover = () => {
      let that = this;
      window.$olMap.on("pointermove", function (evt) {
        // 鼠标hover要素
        document.getElementById("hoverid").style.display = "none";
        pdata.isShowWaterPop = false;
        pdata.isShowWaterRlPop = false;
        window.$olMap.forEachFeatureAtPixel(
          evt.pixel,
          function (feature, layer) {
            if (
              layer &&
              layer.values_ &&
              layer.values_.id &&
              layer.values_.id !== "xzqm2id"
            ) {
              if (
                feature &&
                layer.values_.id &&
                pdata.datakeys[layer.values_.id]
              ) {
                pdata.hoverData=[]
                let vas = pdata.datakeys[layer.values_.id].split(",");
                vas.forEach((item) => {
                  pdata.hoverData.push({keys: feature.values_.attributes[item],
                 values:feature.values_.attributes[item]});
                });

                showInf(evt);

                pdata.isShowWaterPop = false;
              } else if (
                layer.values_.id === "sx_watermodelid" &&
                feature.get("type") === "line"
              ) {
                let marklayer = getLayerByid("mark");
                marklayer.getSource().clear();
                marklayer.getSource().addFeature(feature);
                pdata.waterPvalue = {
                  ...feature.get("attributes"),
                  top: evt.originalEvent.offsetY - 250,
                  left: evt.originalEvent.offsetX,
                };
                pdata.isShowWaterPop = true;
              } else if (layer.values_.id === "sx_fhfxid") {
                pdata.waterRlPvalue = {
                  ...feature.get("attributes"),
                  top: evt.originalEvent.offsetY - 150,
                  left: evt.originalEvent.offsetX - 120,
                };
                pdata.isShowWaterRlPop = true;
              } else {
                document.getElementById("hoverid").style.display = "none";
                pdata.isShowWaterPop = false;
                pdata.isShowWaterRlPop = false;
              }
            } else {
              pdata.isShowWaterPop = false;
              pdata.isShowWaterRlPop = false;
              // document.getElementById("hoverid").style.display = "none";
            }
          }
        );
      });
    };
    return { ...toRefs(pdata) };
  },
};
</script>

<style>
._hoverContent {
  padding: 0px 2px 0 2px;
  position: absolute;
  background: #638ce8;
  border-radius: 5px;
  /* box-shadow: 10px 10px 5px #888888; */
  display: none;
  text-align: center;
  height: auto;
  line-height: 30px;
  font-size: 14px;
  color: #fff;
}
._itmHover {
  height: auto;
  width: 100%;
}
</style>

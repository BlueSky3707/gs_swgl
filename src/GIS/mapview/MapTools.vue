<template>
  <div class="tools">


    <!-- 图层切换 -->
    <el-tooltip content="图层切换" effect="light" placement="left">
      <img v-if="state.gisShow" src="/tool/gis1.png" @click="changeGisShow"/>
      <img v-else src="/tool/gis2.png" @click="changeGisShow"/>
    </el-tooltip>

    <div class="xian"></div>


    <!-- 工具箱 -->
    <el-tooltip content="工具箱" effect="light" placement="left">
      <img src="/tool/bag2.png" v-if="state.gjbShow" @click="changToolShow"/>
      <img src="/tool/bag.png" v-else @click="changToolShow"/>
    </el-tooltip>

  </div>
  <div v-show="state.gjbShow" class="tool">
    <img src="/tool/bag_0.png" @click="Draw('Point')"/>
    <img src="/tool/bag_1.png" @click="Draw('LineString')"/>
    <img src="/tool/bag_2.png" @click="Draw('Polygon')"/>
    <img src="/tool/bag_3.png" @click="Draw('del')"/>
  </div>
</template>
<script setup>
import {measure} from "../mapUtils/Measure";
import {reactive} from "vue";
import {hiddenLayerById, showLayerById} from "../mapUtils/baselayer";
import {clearAllLayer, clearAllLayerByRouter} from "../mapUtils/clearLayer";
import {useStore} from "vuex";

const store = useStore();
const state = reactive({
  gisShow: true,
  gjbShow: false,
});
const changeGisShow = () => {
  state.gisShow = !state.gisShow;
  if (state.gisShow) {
    vectorClick();
  } else {
    imageClick();
  }
};
const imageClick = () => {

  showLayerById("yxdt");
  showLayerById("yxdtL");

  hiddenLayerById("dzdt");
    hiddenLayerById("dzdtl");

};
const vectorClick = () => {
  
  showLayerById("dzdt");
    showLayerById("dzdtl");

  hiddenLayerById("yxdt");
  hiddenLayerById("yxdtL");

};
const changToolShow = () => {
  state.gjbShow = !state.gjbShow;
};
const Draw = (type) => {
  measure(window.$olMap, type);
  if (type === "del") {
    if (store.state.showZhuanTi) {
      clearAllLayer();
    } else {
      clearAllLayerByRouter();
    }
  }
};
</script>

<style scoped lang="scss">
.tools {
  position: absolute;
  top: 60px;
  right: 16px;
  width: 44px;
  height: 114px;
  background: #fff;
  border: 1px solid #8db0f0;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.17);
  border-radius: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  box-sizing: border-box;

  .xian {
    width: 24px;
    height: 2px;
    background: #8db0f0;
    opacity: 0.1;
    border-radius: 4px;
  }

  img {
    cursor: pointer;
  }
}

.tool {
  position: absolute;
  top: 124px;
  right: 82px;
  width: 165px;
  background-color: #2690ec;
  height: 35px;
  border-radius: 5px;

  img {
    margin: 8px 10px;
    width: 20px;
    height: 19px;
    cursor: pointer;
  }
}
</style>

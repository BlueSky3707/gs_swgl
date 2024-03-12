<template>
  <div>
    <Station_component @close="close"></Station_component>
  </div>
</template>

<script setup>
import { defineAsyncComponent, provide } from "vue";
import * as baseLayerUtils from "@/GIS/mapUtils/baselayer";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
const route = useRoute();
const store = useStore();
const type = $computed(() => store.state.layerInf?.values_?.typeid);
const typeid = $computed(
  () => store.state.layerInf?.values_?.attributes?.typeid
);

// 创建组件
const Station_component = defineAsyncComponent(() => {
  console.log(type);
  // 一张图
  if (route.path === "/yzt") {
    if (type == "qskxxid") {
      // 取水口
      return import("../yzt_qsd");
    }
    if (type == "qskjcsbid") {
      // 水表
      return import("../yzt_qsksb");
    }
    if (type == "ysqyid") {
      // 用水企业
      return import("../yzt_ysqy");
    }
    if (type == "jczid") {
      //监测点
      return import("../yzt_jcd");
    }

    // 驾驶舱
  } else if (route.path === "/jsc") {
    if (type == "yj_jczid") {
      // 监测站预警
      return import("../jsc_jcz");
    }
    if (type == "yj_sbid") {
      // 水表预警
      return import("../jsc_sb");
    }
    if (type == "qskxxid" || type == "ysqyid" || type == "jczid") {
      // 其他
      return import("../jsc_com");
    }
  }

  store.commit("setLayerInfo", null);
  // 空页面
  return import("../station_null");
});

// 关闭站点公共方法
const close = () => {
  store.commit("setLayerInfo", null);
  let marklayer = baseLayerUtils.getLayerByid("mark");
  marklayer.getSource().clear();
};
// 传递参数
provide("attributes", store.state.layerInf?.values_?.attributes);
</script>

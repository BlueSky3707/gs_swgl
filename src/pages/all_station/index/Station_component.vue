<template>
  <div>
    <Station_component @close="close"></Station_component>
  </div>
</template>

<script setup>
import {defineAsyncComponent, provide} from 'vue'
import * as baseLayerUtils from '@/GIS/mapUtils/baselayer'
import {useStore} from 'vuex'
import {useRoute} from "vue-router"
const route = useRoute()
const store = useStore();
const type = $computed(() => store.state.layerInf?.values_?.typeid)
const typeid = $computed(() => store.state.layerInf?.values_?.attributes?.typeid)

// 创建组件
const Station_component = defineAsyncComponent(() => {
  console.log(type);
  // 一张图
 if(route.path==="/yzt"){
   if (type == 'sx_dqzdid') {
      // 大气
      return import('../station_dq')
    }
    // 驾驶舱
  }else if(route.path==="/jsc"){
    if (type == 'sx_dqzdid') {
      // 大气
      return import('../kq')
    }
  }

  store.commit('setLayerInfo', null)
  // 空页面
  return import('../station_null')
})

// 关闭站点公共方法
const close = () => {
  store.commit('setLayerInfo', null)
  let marklayer = baseLayerUtils.getLayerByid('mark')
  marklayer.getSource().clear()
}
// 传递参数
provide('attributes', store.state.layerInf?.values_?.attributes)
</script>


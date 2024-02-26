<template>
  <TuliBox>
    <img :src="tiliList[$store.state.tuliIndex]" style="display: block">
  </TuliBox>
</template>

<script setup>
import {onMounted} from "vue";
import {useStore} from "vuex";

import AQI日均值 from "@/assets/tuli/kq/aqiTuli.png";


const store = useStore()

onMounted(()=>{
  // 默认aqi图例
    store.commit("setTuliIndex", 'AQI日均值');
})

const tiliList = {
  AQI日均值
 
}
</script>


<template>
  <!-- 左侧展示 -->
  <div v-show="!$store.state.layerInf">
  
    <cityBox v-show="$store.state.navIndex !==0&&$store.state.navIndex !==-1" :label="label"/>
  </div>


</template>

<script setup>



import cityBox from './leftBox'
import {useStore} from "vuex";

const store = useStore()
let label = $ref('')

const changelabel = (e)=>{
  label = e
}


</script>

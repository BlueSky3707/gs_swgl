<template>
   <div class="jbxx_grid" >
      <div class="grid_tit">站点名称</div>
      <div >{{ attributes.name }}</div>
      <div class="grid_tit">站点编号</div>
      <div >{{ attributes.address }}</div>
      <div class="grid_tit">站点类型</div>
      <div > {{attributes.lxr }}</div>
      <div class="grid_tit">所属区域</div>
      <div >{{ attributes.phone }}</div>
       <div class="grid_tit">经度</div>
      <div >{{ attributes.jd }}</div>
       <div class="grid_tit">纬度</div>
      <div >{{ attributes.wd }}</div>
    </div>
 
 
</template>

<script setup>
import {inject, onMounted} from "vue";
const emit = defineEmits(['close'])
const attributes = inject('attributes')


</script>

<style scoped lang="scss">

  .jbxx_grid{
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    grid-row-gap: 16px;
    padding: 8px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    width: 320px;

    .grid_tit{
      color: #2173E9;
    }
    .grid_text{
      color: #333333;
    }
  }
  .pos{
    padding: 8px 13px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #666666;
    display: flex;
    justify-content: space-between;
  }

</style>

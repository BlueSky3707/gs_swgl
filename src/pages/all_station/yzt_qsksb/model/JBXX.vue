<template>
   <div class="jbxx_grid" >
      <div class="grid_tit">单位名称</div>
      <div >{{ attributes.dwmc }}</div>
      <div class="grid_tit">单位编号</div>
      <div >{{ attributes.dwbh }}</div>
      <div class="grid_tit">单位地址</div>
      <div > {{attributes.dwdz }}</div>
       <div class="grid_tit">经度</div>
      <div >{{ attributes.ddjd }}</div>
       <div class="grid_tit">纬度</div>
      <div >{{ attributes.ddwd }}</div>
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
    width: 309px;

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

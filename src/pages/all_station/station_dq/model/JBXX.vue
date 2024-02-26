<template>
  <Box class="box" title="基本信息" @close="emit('close')">
    <div class="jbxx_grid" >
      <div class="grid_tit">站点名称</div>
      <div >{{ attributes.positionname }}</div>
      <div class="grid_tit">站点编号</div>
      <div >{{ attributes.stationcode }}</div>
      <div class="grid_tit">站点类型</div>
      <div > {{ type[attributes.type] }}</div>
      <div class="grid_tit">所属区域</div>
      <div >{{ attributes.area }}</div>
    </div>
    <div class="pos">
      <span>经度 {{ attributes.longitude }} </span>
      <span>纬度 {{ attributes.latitude }}</span>
    </div>
  </Box>
</template>

<script setup>
import {inject, onMounted} from "vue";
const emit = defineEmits(['close'])
const attributes = inject('attributes')
const type = {
  0:' 国控',
  1:'省控',
  2:'市控',
  9:'微站',
}

</script>

<style scoped lang="scss">
.box{
  top: 525px;
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
}
</style>

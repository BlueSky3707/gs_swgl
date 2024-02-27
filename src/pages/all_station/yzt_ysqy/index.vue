<template>
  <div class="sjfx">
    <div class="navs">
      <div class="item" :class="navIndex == index ? 'active':''"
           v-for="(item,index) in navs" :key="index" @click="tabClick(index)">
        {{ item }}
      </div>
      <img src="@/assets/common/close.png" class="back" @click="emit('close')"/>
    </div>

    <!-- 具体内容 -->
    <keep-alive>
      <component :is="componentList[navIndex]"></component>
    </keep-alive>
  </div>
</template>

<script setup>
import { reMoveLayerById } from '@/GIS/mapUtils/baselayer'
import model0 from './model/model0'
import model1 from './model/model1'

const componentList = [model0, model1]

const emit = defineEmits(['close'])
const navs = ['基本信息', '历史数据']
let navIndex = $ref(0)
const tabClick=(index)=>{
  navIndex = index
  if(index!==3){
    reMoveLayerById("sx_zwrqxid")
  }
}
</script>

<style scoped lang="scss">
.sjfx {
 position: fixed;
  left: 16px;
  top: 60px;
  background: #fff;
  border: 1px solid #8DB0F0;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.17);
  opacity: 1;
  border-radius: 4px;
 z-index: 99;

  .navs {
    width: 100%;
    height: 36px;
    border-bottom: 1px solid #8DB0F0;
    background: linear-gradient(180deg, #FFFFFF 0%, #DBEAFF 100%);
    color: rgba(33, 115, 233, .5);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    align-items: center;
    position: relative;

    .back {
      position: absolute;
      right: 20px;
      cursor: pointer;
    }

    .item {
      padding: 0 20px;
      cursor: pointer;
    }

    .active {
      color: rgba(33, 115, 233, 1);
    }
  }
}
</style>

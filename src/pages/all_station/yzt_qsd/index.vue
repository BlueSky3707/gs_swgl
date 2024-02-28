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
  <div class="buttonlist">
        
        <el-button class="buttonbox"  @click="state.isHistory=true">历史数据</el-button>
       
      </div>
  </div>
 <LSSJ v-if="state.isHistory" @close="state.isHistory=false"/>
</template>

<script setup>
import { reMoveLayerById } from '@/GIS/mapUtils/baselayer'
import model0 from './model/model0'
import model1 from './model/model1'
import model2 from './model/model2'
import LSSJ from './model/LSSJ'
import { reactive,inject  } from "vue";
const componentList = [model0, model1,model2]

const emit = defineEmits(['close'])
const attributes = inject('attributes')
const navs = ['基本信息', '基本信息2','基本信息3']
let navIndex = $ref(0)
const state=reactive({
isHistory:false
})
const tabClick=(index)=>{
  navIndex = index

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
 .buttonlist {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 15px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px;
    background-color: rgba(248, 251, 255, 1);

    .buttonbox {
      width: 128px;
      height: 32px;
      margin-left: 0px !important;
    }

  }
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
      padding: 0 10px;
      cursor: pointer;
    }

    .active {
      color: rgba(33, 115, 233, 1);
    }
  }
}
</style>

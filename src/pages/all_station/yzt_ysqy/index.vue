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
import JBXX from './model/JBXX'
import model1 from './model/model1'
import model2 from './model/model2'
import model3 from './model/model3'
import LSSJ from './model/LSSJ'
import { reactive,inject  } from "vue";
const componentList = [JBXX, model1,model2,model3]

const emit = defineEmits(['close'])
const attributes = inject('attributes')
const navs = ['基本信息', '企业信息1','企业信息2','企业信息3']
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
  top: 100px;
  z-index: 99;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.8);
  background-image: url("../../src/assets/common/bgBox.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 8px;
  box-sizing: border-box;

  .title {
    width: 100%;
    height: 38px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-image: url("@/assets/common/title.png");
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: left;
    padding: 0 12px;
    box-sizing: border-box;
    font-size: 14px !important;

    .titleText {
      width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: zoom-in;
      padding-left: 20px;
    }
  }
  .navs {
    width: 100%;
    height: 36px;
    border-bottom: 1px solid #8DB0F0;
     align-items: center;
    justify-content: space-between;
    background-image: url("@/assets/common/title.png");
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: left;
    padding: 0 12px;
    box-sizing: border-box;
    font-size: 14px !important;
    display: flex;
    align-items: center;
    position: relative;

    .back {
     
      cursor: pointer;
      margin: 0 20px;
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

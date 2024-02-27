<template>
  <JscBox :title="attributes.STATIONNAME" v-if="showIndex == 0" @close="$emit('close')">
    <div class="title">
      <span>报警信息</span>
    </div>
    <div class="bj_content">
      <div class="con_item">
        <div class="con_tit">报警时间：</div>
        <div class="con_txt">{{ attributes.BJTIME }}</div>
      </div>
      <div class="con_item">
        <div class="con_tit">报警类型：</div>
        <div class="con_tit">
          <img src="@/assets/image/cb.png"/>
        </div>
      </div>
      <div class="con_item">
        <div class="con_tit">报警详情：</div>
        <div class="con_tit">
          <div class="con_txt">{{ attributes.CONTENT }}</div>
        </div>
      </div>
      <div class="con_item">
        <div class="con_tit">报警通知：</div>
        <div class="con_tit">
          <div class="con_txt">已发送通知，通知人数为12。</div>
        </div>
      </div>
      <!-- <div class="gbbj" @click="closeBj">
        <img src="@/assets/water/gbbj.png"/>
        关闭报警
      </div> -->
    </div>


    <div class="title">
      <span>最新数据</span>
      <div class="timepoint">
        <span>{{ attributes.BJTIME }}</span>
        <el-icon @click="upDateDw" style="transform: translateY(3px);margin-left: 8px;cursor: pointer" :size="20"
                 color="#8BB5FF">
          <RefreshRight/>
        </el-icon>
      </div>
    </div>
    <div class="wrw" v-loading="state.loading" element-loading-background="rgba(0,0,0,0.4)">
      <div class="wrw_item" :style="isCb('PM2.5')">
        <div class="item_tit">
          <span class="tit_1">PM₂.₅</span>
          <span class="tit_2">μg/m³</span>
        </div>
        <div class="item_dw">{{  0 }}</div>
      </div>
      <div class="wrw_item" :style="isCb('PM10')">
        <div class="item_tit">
          <span class="tit_1">PM₁₀</span>
          <span class="tit_2">μg/m³</span>
        </div>
        <div class="item_dw">{{  0 }}</div>
      </div>
      <div class="wrw_item" :style="isCb('NO2')">
        <div class="item_tit">
          <span class="tit_1">NO₂</span>
          <span class="tit_2">μg/m³</span>
        </div>
        <div class="item_dw">{{  0 }}</div>
      </div>
      <div class="wrw_item" :style="isCb('O3')">
        <div class="item_tit">
          <span class="tit_1">O₃</span>
          <span class="tit_2">μg/m³</span>
        </div>
        <div class="item_dw">{{  0 }}</div>
      </div>
      <div class="wrw_item" :style="isCb('CO')">
        <div class="item_tit">
          <span class="tit_1">CO</span>
          <span class="tit_2">mg/m³</span>
        </div>
        <div class="item_dw">{{  0 }}</div>
      </div>
      <div class="wrw_item" :style="isCb('SO2')">
        <div class="item_tit">
          <span class="tit_1">SO₂</span>
          <span class="tit_2">μg/m³</span>
        </div>
        <div class="item_dw">{{  0 }}</div>
      </div>
    </div>
    <div class="button">
     
      <div class="btn_item" @click="showIndex=4">
        <img src="@/assets/common/zdxx.png"/>
        站点信息
      </div>
    </div>
  </JscBox>

  <transition-group name="el-zoom-in-left">
    
    
    <Jbxx v-if="showIndex == 4" @close="showIndex = 0"/>
  </transition-group>
</template>

<script setup>

import Jbxx from './jbxx'
import {inject, onMounted, reactive} from "vue";
import {RefreshRight} from "@element-plus/icons-vue"
import {ElMessage} from "element-plus";

import {useStore} from 'vuex'
import * as baseLayerUtils from "@/GIS/mapUtils/baselayer";

const store = useStore()
const attributes = inject('attributes')
console.log(attributes);

import cbbg from "@/assets/image/cbbg.png";

const state = reactive({
  loading: true,
  data: {},
  videoList:[]
})

const upDateDw = () => {
  state.loading = true
  setTimeout(() => {
    init()
    state.loading = false
  }, 500)
}

let showIndex = $ref(0)
const isCb = wrw =>{
  
    return {}
  
}


const getVideoList = ()=>{

}

const init =()=>{
 upDateDw()
}
onMounted(() => {
  init()
})
const closeBj=()=>{

}
</script>

<style scoped lang="scss">
@import '../index/common.scss';
</style>

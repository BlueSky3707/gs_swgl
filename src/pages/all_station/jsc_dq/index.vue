<template>
  <JscBox :title="attributes.STATIONNAME" v-if="showIndex == 0" @close="emit('close')">
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
      <div class="wrw_item">
        <div class="item_tit">
          <span class="tit_1">PM₂.₅</span>
          <span class="tit_2">μg/m³</span>
        </div>
        <div class="item_dw">{{ state.data.PM2_5 || 0 }}</div>
      </div>
      <div class="wrw_item">
        <div class="item_tit">
          <span class="tit_1">PM₁₀</span>
          <span class="tit_2">μg/m³</span>
        </div>
        <div class="item_dw">{{ state.data.PM10 || 0 }}</div>
      </div>
      <div class="wrw_item">
        <div class="item_tit">
          <span class="tit_1">NO₂</span>
          <span class="tit_2">μg/m³</span>
        </div>
        <div class="item_dw">{{ state.data.NO2 || 0 }}</div>
      </div>
      <div class="wrw_item">
        <div class="item_tit">
          <span class="tit_1">O₃</span>
          <span class="tit_2">μg/m³</span>
        </div>
        <div class="item_dw">{{ state.data.O3 || 0 }}</div>
      </div>
      <div class="wrw_item">
        <div class="item_tit">
          <span class="tit_1">CO</span>
          <span class="tit_2">mg/m³</span>
        </div>
        <div class="item_dw">{{ state.data.CO || 0 }}</div>
      </div>
      <div class="wrw_item">
        <div class="item_tit">
          <span class="tit_1">SO₂</span>
          <span class="tit_2">μg/m³</span>
        </div>
        <div class="item_dw">{{ state.data.SO2 || 0 }}</div>
      </div>
    </div>

    <div class="title">基本信息</div>
    <div class="jbxx" v-if="!state.loading">
      <div class="jbxx_1">
        <div class="jbxx1_item" tit="站点编码" :num="state.mn"></div>
        <div class="jbxx1_item" tit="区域所属" :num="'延安市'+'-'+(attributes.AREA||attributes.countyname)"></div>
      </div>
      <div class="jbxx_2">
        <div class="jbxx2_item">
          <div class="j2_tit">站点属性</div>
          <div class="type">空气自动站</div>
        </div>
        <div class="jbxx2_item">
          <div class="j2_tit">站点类型</div>
          <img v-if="state.data.TYPE != '微站'" :src="getImageUrl(state.data.TYPE)"/>
          <div v-else>微站</div>
        </div>
        <div class="jbxx2_item">
          <div class="j2_tit">本期AQI</div>
          <div class="AQI" :style="{backgroundImage:'url('+getImageUrl(state.data.QUALITY)+')'}">
            {{ state.data.AQI }}
          </div>
        </div>
        <div class="jbxx2_item">
          <div class="j2_tit">空气状态</div>
          <img :src="getImageUrl('aqi'+state.data.QUALITY)"/>
        </div>
      </div>
      <div class="jbxx_3">
        <div>
          <span style="color: #799DE5;">经度</span>
          <span style="margin: 0 10px">--</span>
          <span style="color: #DBE7FF;">{{ state.data.LONGITUDE || state.data.LNG }}</span>
        </div>
        <div>
          <span style="color: #799DE5;">纬度</span>
          <span style="margin: 0 10px">--</span>
          <span style="color: #DBE7FF;">{{ state.data.LATITUDE || state.data.LAT}}</span>
        </div>
      </div>
    </div>

    <div class="button">
      
      <div class="btn_item" @click="showIndex=2">
        <img src="@/assets/dq/lssj.png"/>
        历史数据
      </div>
    
    </div>
  </JscBox>

  <transition-group name="el-zoom-in-left">
  
    <Lssj v-if="showIndex == 2" @close="showIndex=0"/>
   
  </transition-group>
</template>

<script setup>
import Lssj from './lssj'

import {inject, nextTick, onMounted, reactive} from "vue";
import {RefreshRight} from "@element-plus/icons-vue"
// import {getKQZDZdata, getWZdata, getZJZdata,cameraIndexCode} from './server.js'
import {useStore} from 'vuex'

const store = useStore()
const attributes = inject('attributes')
const emit = defineEmits(['close'])
import {getImageUrl} from "./imgUrl"
import {ElMessage} from "element-plus";

const state = reactive({
  loading: true,
  data: {},
  mn:'',
  videoList:[]
})

const upDateDw = () => {
  state.loading = true
  setTimeout(() => {
    state.loading = false
  }, 500)
}

let showIndex = $ref(0)

const getQUALITY = (AQI) => {
  if (!AQI) {
    return '无数据'
  }
  if (AQI < 50) {
    return '优'
  }
  if (AQI >= 50 && AQI < 100) {
    return '良'
  }
  if (AQI >= 100 && AQI < 150) {
    return '轻度'
  }
  if (AQI >= 150 && AQI < 200) {
    return '中度'
  }
  if (AQI >= 200 && AQI < 250) {
    return '重度'
  }
  if (AQI >= 250) {
    return '严重'
  }
}

const getVideoList = ()=>{
  // cameraIndexCode(attributes.STATIONNAME).then(res=>{
  //   if(res.data.length > 0){
  //     state.videoList = res.data.map(val=>val.cameraIndexCode)
  //     showIndex = 3
  //   }else{
  //     ElMessage.info('此站点暂无视频')
  //   }
  // })
}

onMounted(() => {
  state.loading = true
  const mn = attributes.MN || attributes.mn || attributes.STATIONCODE
  state.mn = mn

      state.data = {
      
        TYPE: '省控',
        QUALITY: getQUALITY(0)
      }
      state.loading = false
  
 
})

</script>

<style scoped lang="scss">
@import '../index/common.scss';
</style>

<template>
  <JscBox :title="attributes.name" @back="$emit('close')"  @close="$emit('close')" >
    <div class="title">基本信息</div>
    <div class="jbxx" v-if="state.loading" >
      <div class="jbxx_1">
        <div class="jbxx1_item" tit="站点编码" :num="attributes.name"></div>
        <!-- <div class="jbxx1_item" tit="区域所属" :num="'延安市'+'-'+attributes.AREA"></div> -->
      </div>
        <div class="jbxx_2">
        <div class="jbxx2_item">
          <div class="j2_tit">预警类型</div>
          <div class="type">监测站</div>
        </div>
       
      </div>
      <div class="jbxx_3">
        <div>
          <span style="color: #799DE5;">经度</span>
          <span style="margin: 0 10px">--</span>
          <span style="color: #DBE7FF;">{{ attributes.LNG }}</span>
        </div>
        <div>
          <span style="color: #799DE5;">纬度</span>
          <span style="margin: 0 10px">--</span>
          <span style="color: #DBE7FF;">{{ attributes.LAT }}</span>
        </div>
      </div>
    </div>
  </JscBox>
</template>

<script setup>
import {onMounted, reactive, inject} from "vue";
const attributes = inject('attributes')
import {getImageUrl} from "./imgUrl"
import {useStore} from 'vuex'
const store = useStore()
const state = reactive({
 
  loading:false
})


onMounted(() => {
  
})
</script>

<style scoped lang="scss">
@import '../index/common.scss';
</style>

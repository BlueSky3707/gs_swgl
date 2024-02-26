<template>
  <Box class="box" title="周围污染源" @close="clickClose">
    <div class="zd_wry">
      <el-checkbox-group v-model="state.check">
        <el-checkbox label="重点" ></el-checkbox>
        <el-checkbox label="在线" ></el-checkbox>
        <el-checkbox label="许可证" ></el-checkbox>
      </el-checkbox-group>
      <el-slider :format-tooltip="tip" size="small" show-tooltip :max="10000" v-model="state.dis" show-input/>
      <div style="font-size: 14px">单位：米</div>
      <div style="margin: 22px 0">
        <el-button style="width: 128px" size="small" type="primary" @click="buffSearch"
        >查询
        </el-button
        >
        <el-button style="width: 128px" size="small" @click="reset">重置</el-button>
      </div>
      <div class="wry">
        <div class="wry_tit">
          <span>共找到污染源:</span>
          <span style="margin-left: 10px;color: #333333">{{state.total}}</span>
        </div>
        <div class="wry_cont">
          <el-scrollbar max-height="200px">
            <div class="cont_item" v-for="(v,i) in state.list" :key="i" @click="cardClick(v)">
              <div class="item_tit" style="cursor: pointer;">{{ v.cname }}</div>
              <div class="item_info">
                <img src=""/>
                <span>间距：{{ getDis(v) }}</span>
                <span class="tabs1" v-if="v.ws==0">重点</span>
                <span class="tabs2" v-if="v.yq==0">许可证</span>
                <span class="tabs3" v-if="v.sfcb">超标</span>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </Box>
</template>

<script setup>
import {reactive,inject,onUnmounted} from "vue";
import {reMoveLayers, startBuffer} from "@/GIS/mapUtils/layersManger";
import {getLayerByid} from "@/GIS/mapUtils/baselayer";
import {layers} from '@/GIS/config/layerConfig';
import * as turf from '@turf/turf'
const attributes = inject('attributes')
const emit = defineEmits(["close"]);
const state = reactive({
  check: [],
  dis: 0,
  total: 0, // 污染源 总数
  list: [], // 列表
  checkvalue:{
    重点:"ite.values_.attributes.zdy==='1'",
    在线:"ite.values_.attributes.zaixian==='1'",
    许可证:"ite.values_.attributes.xkz==='1'"
  }
});

const getDis=(item)=>{
    var from = turf.point([attributes.longitude, attributes.latitude]);
    var to = turf.point([item.longitude,item.latitude]);
    var options = {units: 'kilometers'};
    var distance = turf.distance(from, to, options);
    return Number(distance).toFixed(1)+"km" ;
}
const buffSearch =async () => {
  let allLayers = [];
  Object.keys(layers).forEach((route) => {
    allLayers = allLayers.concat(layers[route]);
  });
  let curlayers = JSON.parse(
      JSON.stringify(allLayers.filter((item) => item.layerId === "sx_qwryid"))
  );
  let marklayer = getLayerByid("temp_buff_pointid");
  let features = marklayer.getSource().getFeatures()
  let pfeatures = features.filter(item => (item.values_.typeid === "sx_dqzdid"))
    reset()
  if (curlayers.length && pfeatures.length) {
    curlayers[0].layerId = curlayers[0].layerId + "_buffer";
    if(state.check.length){
      let checkvalue=[]
      state.check.forEach(item=>{
        checkvalue.push(state.checkvalue[item])
      })
     curlayers[0].renderStyle.filter=checkvalue.join(" ohoxr ")
    }else{
      curlayers[0].renderStyle.filter="all"
    }

    let player=await startBuffer(curlayers[0], pfeatures[0].getGeometry().getCoordinates(), state.dis);
    if(player){
     console.log(player.getSource().getFeatures())
      state.total=player.getSource().getFeatures().length
      state.list=player.getSource().getFeatures().map(e=>e.values_).map(e=>e.attributes)
    }

  }
};
const reset = () => {
  reMoveLayers(["sx_qwryid_buffer", "buffmian"]);
  state.list = [] // 列表清空
  state.total = 0 // 总数清空
};
const tip = (val) => {
  return `${val}m`;
}
const clickClose = () => {
  emit('close')
  reMoveLayers(["sx_qwryid_buffer", "buffmian"]);
} 
const cardClick = async(item) => {
  window.$olMap.getView().setCenter([Number(item.longitude),item.latitude]);
  window.$olMap.getView().setZoom(14);
}
// onUnmounted(()=>{
//   reMoveLayers(["sx_qwryid_buffer", "buffmian"]);
// })
</script>

<style scoped lang="scss">
.box {
  top: 525px;

  .zd_wry {
    width: 325px;
    box-sizing: border-box;
    padding: 10px 18px;

    .wry {
      .wry_tit {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
      }

      .wry_cont {
        .cont_item {
          margin: 16px 0;

          .item_tit {
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }

          .item_info {
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            margin-top: 10px;

            span:nth-child(2) {
              color: #2173E9;
            }

            .tabs1 {
              background: rgba(131, 203, 200, 1);
              border-radius: 10px;
              color: #FFFFFF;
              padding: 2px 10px;
              text-align: center;
              margin: 0 5px;
            }

            .tabs2 {
              background: rgba(130, 174, 238, 1);
              border-radius: 10px;
              color: #FFFFFF;
              padding: 2px 10px;
              text-align: center;
              margin: 0 5px;
            }
            .tabs3 {
              background: red;
              border-radius: 10px;
              color: #FFFFFF;
              padding: 2px 10px;
              text-align: center;
              margin: 0 5px;
            }
          }
        }
      }
    }
  }
}
</style>

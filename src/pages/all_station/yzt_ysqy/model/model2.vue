<template>
  <el-table
    :data="state.tableData"
    stripe
    max-height="350"
    height="350"
    style="width: 100%"
    @row-click="itemClick"
  >
    <el-table-column prop="madeno" label="水表编号" align="center" />
    <el-table-column prop="metername" label="所属企业" align="center" />
    <el-table-column prop="todaytraffic" label="当日用水量" align="center" />
    <el-table-column prop="totaltraffic" label="总共用水量" align="center" />
    <el-table-column prop="state" label="水表状态" align="center" />
    <el-table-column prop="gtime" label="上传时间" align="center" />
  </el-table>

  <LSSJ :madeno="state.madeno" v-if="state.isHistory" @close="state.isHistory=false"/>
</template>

<script setup>
import { inject, onMounted, reactive ,provide} from "vue";
import * as postgis from "@/GIS/api/postgis";
import LSSJ from './LSSJ'
const emit = defineEmits(["close"]);
const attributes = inject("attributes");

const state = reactive({
  madeno:"",
  isHistory:false,
  tableData: [
    {
      madeno: "",
      metername: "",
      todaytraffic: "",
      totaltraffic: "",
      state: "在用",
      gtime: "",
    },
  ],
});
onMounted(() => {
  state.tableData = [];
  let param = {
    layerName: "byswj_sbxx",
    filter: "metername='" + (attributes.metername??attributes.name) + "'",
    isReturnGeometry: false,
    isCache: false,
    spatialRel: "INTERSECTS",
  };
  postgis.search(param).then((res) => {
    console.log(res)
    if (res.data.data.features && res.data.data.features.length > 0) {
      state.tableData = res.data.data.features.map((it) => {
        it.attributes.state = it.attributes.state == "1" ? "在用" : "停用";
        return it.attributes;
      });
    }
  });
});
const itemClick=(v)=>{
  state.madeno=v.madeno
  state.isHistory=true
}
</script>

<style scoped lang="scss">
.jbxx3 {
  width: 320px;
  /* height: 300px; */
}
</style>

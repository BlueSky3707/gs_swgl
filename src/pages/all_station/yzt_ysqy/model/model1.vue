<template>
  <el-table
    :data="state.tableData"
    stripe
    max-height="350"
    height="350"
    style="width: 100%"
  >
    <el-table-column prop="cnlx" label="产能类型" align="center" />
    <el-table-column prop="cngm" label="产能规模" align="center" />
    <el-table-column prop="cnzl" label="产能时间" align="center" />
    <el-table-column prop="cngh" label="产能规划" align="center" />
  </el-table>
</template>

<script setup>
import { inject, onMounted, reactive } from "vue";
import * as postgis from "@/GIS/api/postgis";
const emit = defineEmits(["close"]);
const attributes = inject("attributes");
const state = reactive({
  tableData: [{
    cnlx:'煤矿',
    cngm:'50000',
     cnzl:'2020',
    cngh:'55000'
  },
  {
    cnlx:'铁矿',
    cngm:'50000',
    cnzl:'2021',
    cngh:'55000'
  },
 {
    cnlx:'铜矿',
    cngm:'50000',
     cnzl:'2022',
    cngh:'55000'
  },
  {
    cnlx:'铁矿',
    cngm:'50000',
     cnzl:'2023',
    cngh:'55000'
  },
],
});
onMounted(() => {
  // state.tableData = [];
  // let param = {
  //   layerName: "by_qycngl",
  //   filter: "qyid=" + attributes.gid,
  //   isReturnGeometry: false,
  //   isCache: false,
  //   spatialRel: "INTERSECTS",
  // };
  // postgis.search(param).then((res) => {
  //   if (res.data.data.features && res.data.data.features.length > 0) {
  //     state.tableData = res.data.data.features.map((it) => {
  //       return it.attributes;
  //     });
  //   }
  // });
});
</script>

<style scoped lang="scss">
.jbxx2 {
  width: 320px;
  /* height: 300px; */
}
</style>

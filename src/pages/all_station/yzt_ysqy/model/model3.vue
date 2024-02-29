<template>
  <el-table
    :data="state.tableData"
    stripe
    max-height="350"
    height="350"
    style="width: 100%"
  >
    <el-table-column prop="sj" label="时间年度" align="center" />
    <el-table-column prop="defpqssj" label="起始时间" align="center" />
    <el-table-column prop="defpjsjj" label="结束时间" align="center" />
    <el-table-column prop="ysde" label="用水定额" align="center" />
    <el-table-column prop="ejde" label="二阶定额" align="center" />
  </el-table>
</template>

<script setup>
import { inject, onMounted, reactive } from "vue";
import * as postgis from "@/GIS/api/postgis";
const emit = defineEmits(["close"]);
const attributes = inject("attributes");
const state = reactive({
  tableData: [],
});
onMounted(() => {
  state.tableData = [];
  let param = {
    layerName: "by_qyysdegl",
    filter: "qyid=" + attributes.gid,
    isReturnGeometry: false,
    isCache: false,
    spatialRel: "INTERSECTS",
  };
  postgis.search(param).then((res) => {
    if (res.data.data.features && res.data.data.features.length > 0) {
      state.tableData = res.data.data.features.map((it) => {
        return it.attributes;
      });
    }
  });
});
</script>

<style scoped lang="scss">
.jbxx3 {
  width: 320px;
  /* height: 300px; */
}
</style>

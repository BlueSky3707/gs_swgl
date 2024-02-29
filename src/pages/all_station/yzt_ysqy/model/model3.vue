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
    <el-table-column prop="ysde" label="用水定额(吨)" align="center" />
    <el-table-column prop="ejde" label="二阶定额(吨)" align="center" />
  </el-table>
</template>

<script setup>
import { inject, onMounted, reactive } from "vue";
import * as postgis from "@/GIS/api/postgis";
const emit = defineEmits(["close"]);
const attributes = inject("attributes");
const state = reactive({
  tableData: [
    {
      sj: "2020",
      defpqssj: "2020-01-01",
      defpjsjj: "2020-12-30",
      ysde: "2000",
      ejde: "3000",
    },
    {
      sj: "2021",
      defpqssj: "2021-01-01",
      defpjsjj: "2021-12-30",
      ysde: "2000",
      ejde: "3000",
    },
    {
      sj: "2022",
      defpqssj: "2022-01-01",
      defpjsjj: "2022-12-30",
      ysde: "2000",
      ejde: "3000",
    },
    {
      sj: "2023",
      defpqssj: "2023-01-01",
      defpjsjj: "2023-12-30",
      ysde: "2000",
      ejde: "3000",
    },
  ],
});
onMounted(() => {
  // state.tableData = [];
  // let param = {
  //   layerName: "by_qyysdegl",
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
.jbxx3 {
  width: 320px;
  /* height: 300px; */
}
</style>

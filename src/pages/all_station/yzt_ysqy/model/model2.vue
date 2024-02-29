<template>
  <el-table
    :data="state.tableData"
    stripe
    max-height="350"
    height="350"
    style="width: 100%"
  >
    <el-table-column prop="sbbh" label="水表编号" align="center" />
    <el-table-column prop="sblx" label="水表类型" align="center" />
    <el-table-column prop="sbcj" label="水表厂家" align="center" />
    <el-table-column prop="sbdd" label="水表读数" align="center" />
  </el-table>
</template>

<script setup>
import { inject, onMounted, reactive } from "vue";
import * as postgis from "@/GIS/api/postgis";
const emit = defineEmits(["close"]);
const attributes = inject("attributes");
const state = reactive({
  tableData: [,
  {
    sbbh:'bh1',
    sblx:'水表1',
    sbcj:'白银仪器公司',
    sbdd:'350'
  },
  {
    sbbh:'bh3',
    sblx:'水表3',
    sbcj:'白银仪器公司',
    sbdd:'350'
  },
  {
    sbbh:'bh4',
    sblx:'水表4',
    sbcj:'白银仪器公司',
    sbdd:'490'
  }

  ],
});
onMounted(() => {
  // state.tableData = [];
  // let param = {
  //   layerName: "by_qysbgl",
  //   filter: "ssqy=" + attributes.gid,
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

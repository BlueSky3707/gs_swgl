<template>
  <Box :title="attributes.dwmc" @close="emit('close')">
    <JBXX />
    <div class="buttonlist">
      <el-button class="buttonbox" @click="state.isHistory = true"
        >历史数据</el-button
      >
    </div>
  </Box>
  <LSSJ v-if="state.isHistory" @close="state.isHistory = false" />
</template>

<script setup>
import { reMoveLayerById } from "@/GIS/mapUtils/baselayer";
import JBXX from "./model/JBXX";

import LSSJ from "./model/LSSJ";
import { reactive, inject } from "vue";

const emit = defineEmits(["close"]);
const attributes = inject("attributes");

const state = reactive({
  isHistory: false,
});
</script>

<style scoped lang="scss">

  .buttonlist {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 15px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px;

    .buttonbox {
      width: 128px;
      height: 32px;
      margin-left: 0px !important;
    }
  }
  
</style>

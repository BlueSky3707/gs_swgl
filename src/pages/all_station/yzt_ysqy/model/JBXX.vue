<template>
  <div class="max">
    <div class="rows">
      <div class="rows_left">名称</div>
      <div>{{ attributes.metername||attributes.name }}</div>
    </div>
    <div class="rows">
      <div class="rows_left">地址</div>
      <div>{{ attributes.address }}</div>
    </div>
    <div class="rows">
      <div class="rows_left">区域</div>
      <div>{{ attributes.city }}</div>
    </div>
    <div class="rows">
      <div class="rows_left">经度</div>
      <div>{{ attributes.lon }}</div>
    </div>
    <div class="rows">
      <div class="rows_left">纬度</div>
      <div>{{ attributes.lat }}</div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted } from "vue";
const emit = defineEmits(["close"]);
const attributes = inject("attributes");
</script>

<style scoped lang="scss">
.max {
  width: 300px;

  .rows {
    width: 100%;
    min-height: 36px;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 2.5fr;
    box-sizing: border-box;
    padding: 8px 14px;
    font-size: 14px;
    color: $text-color;

    // &:nth-child(2n){
    //   background-color: #F8FBFF;
    // }

    .rows_left {
      color: $title-color;
    }
  }
}
</style>

<template>
  <div class="max">
    <div class="rows">
      <div class="rows_left">监测站名称</div>
      <div>甘肃省白银市白银区四龙镇取水口</div>
    </div>
    <div class="rows">
      <div class="rows_left">所在行政区</div>
      <div>白银市</div>
    </div>
    <div class="rows">
      <div class="rows_left">证照编号</div>
      <div>D620402S2021-0020</div>
    </div>
    <div class="rows">
      <div class="rows_left">监测时间</div>
      <div>2024-0101至2024-01-30</div>
    </div>
    <div class="rows">
      <div class="rows_left">综合水量(m3)</div>
      <div>1090</div>
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

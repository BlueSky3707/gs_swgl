<template>
  <div class="right-body">
    <div class="right-top public-bg">
      <div class="public-title">水质污染TOP5</div>
      <div class="title-nav"></div>
    </div>
    <div class="right-con public-bg">
      <div class="public-title">水质类别占比</div>
      <div class="title-nav" id="huaxing"></div>
    </div>
    <div class="right-bottom public-bg">
      <div class="public-title">预警列表</div>

      <model3 />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import model3 from "./components/model3.vue";
const state = reactive({});
onMounted(async () => {});
</script>

<style scoped lang="scss">
.public-bg {
  background: rgba(12, 26, 63, 0.3);
}
.public-title {
  width: calc(100% - 20px);
  height: 30px;
  position: relative;
  top: 0;
  left: 5px;
  color: white;
  padding-left: 16px;
  line-height: 30px;
  font-size: 13px;
}
.public-title:before {
  width: 4px;
  height: 20px;
  top: 5px;
  position: absolute;
  content: "";
  background: #2997e4;
  border-radius: 2px;
  left: 5px;
}
.right-body {
  width: 22%;
  right: 0px;
  margin: 0 0.3%;
  top: 75px;
  height: calc(100% - 75px);
  position: absolute;
}

.right-body .right-top {
  width: 100%;
  height: 32%;
}

.right-body .right-con {
  width: 100%;
  height: 25%;
  margin-top: 2%;
}
.right-body .right-bottom {
  width: 100%;
  height: 39%;
  margin-top: 2%;
}
</style>

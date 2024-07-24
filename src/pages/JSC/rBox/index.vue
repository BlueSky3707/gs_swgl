<template>
  <div class="right-body">
    <div class="right-top public-bg">
      <div class="public-title">用水类别统计</div>
      <div class="title-nav">
        <div class="tile-img">
          <div class="type_img">
            <img class="loc_img" src="/layers/dq_cljcz.png" alt="" />
            <span class="texsp">203</span>
            <div class="texttile">用水企业数量</div>
          </div>
          <div class="type_img">
            <img class="loc_img" src="/layers/dq_ygjc.png" alt="" />
            <span class="texsp">26</span>
            <div class="texttile">取水口数量</div>
          </div>
          <div class="type_img">
            <img class="loc_img" src="/layers/dq_clzlz.png" alt="" />
            <span class="texsp">12</span>
            <div class="texttile">监测点数量</div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-con public-bg">
      <div class="public-title" style="top: 4px">不同时段行业类型占比</div>
      <div class="title-nav" id="huaxing">
        <model2 />
      </div>
    </div>
    <div class="right-bottom public-bg">
      <div class="public-title" style="top: 8px">预警列表</div>
      <div class="title-nav" id="huaxing">
        <model3 />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import model3 from "./components/model3.vue";
import model2 from "./components/model2.vue";
const state = reactive({});
onMounted(async () => {});
</script>

<style scoped lang="scss">
.public-bg {
  /* background: rgba(12, 26, 63, 0.3); */
  background-image: url("@/assets/image/leftkuang.png");
  background-size: 100% 100%; /* 背景图片覆盖整个容器 */
  background-position: center; /* 背景图片居中 */
  background-repeat: no-repeat; /* 背景图片不重复 */
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
  padding-top: 4px;
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
  display: none;
}
.right-body {
  overflow: hidden;
  width: 22vw;
  right: 0px;
  margin: 0 0.3%;
  top: 75px;
  height: calc(100vh - 75px);
  position: absolute;
}

.right-body .right-top {
  width: 100%;
  height: 12vh;
}
.tile-img {
  display: flex;
  padding-left: 10px;
  width: 100%;
  height: 55px;
  text-align: center;
  line-height: 55px;
}
.type_img {
  width: 130px;
  height: 55px;
}
.type_img .loc_img {
  width: 30px;
  height: 30px;
}
.texsp {
  position: relative;
  top: -8px;
  padding-left: 10px;
}
.texttile {
  position: relative;
  top: -10px;
  width: 130px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding-left: 10px;
}
.right-body .right-con {
  width: 100%;
  height: 28vh;
  margin-top: 1vh;
  margin-bottom: 0.3vh;
}
.right-body .right-bottom {
  width: 100%;
  height: 51vh;
  /* margin-top: 1vh; */
}
</style>

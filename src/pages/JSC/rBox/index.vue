<template>
  <div class="right-body">
    <div class="right-top public-bg">
      <div class="public-title">水质污染TOP5</div>
      <div class="title-nav">
        <div class="tile-img">
          <div class="type_img">
            <img class="loc_img" src="/layers/dq_cljcz.png" alt="" />
            <span class="texsp">200</span>
            <div class="texttile">用水企业数量</div>
          </div>
          <div class="type_img">
            <img class="loc_img" src="/layers/dq_ygjc.png" alt="" />
            <span class="texsp">200</span>
             <div class="texttile">取水口数量</div>
          </div>
          <div class="type_img">
            <img class="loc_img" src="/layers/dq_clzlz.png" alt="" />
            <span class="texsp">200</span>
            <div class="texttile">监测点数量</div>
          </div>
        </div>
      </div>
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
  overflow: hidden;
  width: 22%;
  right: 0px;
  margin: 0 0.3%;
  top: 75px;
  height: calc(100% - 75px);
  position: absolute;
}

.right-body .right-top {
  width: 100%;
  height: 12%;
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
.texttile{
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
  height: 45%;
  margin-top: 2%;
}
.right-body .right-bottom {
  width: 100%;
  height: 39%;
  margin-top: 2%;
}
</style>

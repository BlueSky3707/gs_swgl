<template>
  <div class="header">
    <div class="leftNavs">
      <div
        v-for="item in leftNavs"
        class="item"
        :class="$route.path == item.router ? 'active' : ''"
        :key="item.title"
        @click="changeRouter(item)"
      >
        <img v-if="isIcon" :src="item.icon" alt="" />
        <div>{{ item.title }}</div>
      </div>
    </div>
    <img
      src="@/assets/common/logo.png"
     
      style="cursor: pointer"
    />
    <div class="rightNavs">
      <div
        v-for="item in rightNavs"
        class="item"
        :class="$route.path == item.router ? 'active' : ''"
        :key="item.title"
        @click="changeRouter(item)"
      >
        <img v-if="isIcon" :src="item.icon" alt="" />
        <div>{{ item.title }}</div>
      </div>
      <div class="item" style="opacity: 0; cursor: unset">
        <img :src="kq" alt="" />
        <div>暂未</div>
      </div>
    </div>
    <img src="@/assets/common/back.png" class="back" />
  </div>
</template>

<script setup>
import kq from "@/assets/common/kq.png";

import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessageBox,ElMessage } from "element-plus";

let isIcon = $ref(window.innerWidth > 1650);

window.addEventListener("resize", () => {
  isIcon = window.innerWidth > 1650;
});

const leftNavs = [
  { title: "气环境", router: "/yzt", icon: kq }

];
const rightNavs = [

];

const route = useRoute();
const router = useRouter();
const store = useStore();

const changeRouter = (item) => {

    store.commit("setNavIndex", 1);
  store.commit("setShowRightBox", false);
  store.state.isQhzt=true;
   store.commit("setShowZhuanTi", false);
  if(item.router){
    router.push(item.router)
  }else{
   
    window.open(item.url)
  }
};
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 48px;
  z-index: 999;
  background: #24468b;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  .back {
    position: absolute;
    right: 20px;
    top: 12px;
    cursor: pointer;
  }

  .rightNavs,
  .leftNavs {
    display: flex;
    height: 100%;

    .item {
      padding: 0 20px;
      overflow: hidden;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      img {
        transform: translateY(3px);
      }
    }

    .active {
      background-color: rgba(67, 134, 255, 0.6);
    }
  }
}
</style>

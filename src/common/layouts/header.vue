<template>
  <div class="header">
     <img
      class="logClass"
      src="@/assets/common/swlogs.png"
      style="cursor: pointer"
    /> 
    <div class="leftNavs">
      <div
        v-for="item in leftNavs"
        class="item"
        :class="$route.path == item.router ? 'active' : ''"
        :key="item.title"
        @click="changeRouter(item)"
      >
        <img :src="item.icon" alt="" />
        <div>{{ item.title }}</div>
      </div>
    </div>

    <!-- <img src="@/assets/common/back.png" class="back" /> -->
  </div>
</template>

<script setup>
import kq from "@/assets/common/kq.png";
import jsc from "@/assets/common/gf.png";
import fs from "@/assets/common/fs.png";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const leftNavs = [
  { title: "驾驶舱", router: "/jsc", icon: jsc },
  { title: "一张图", router: "/yzt", icon: kq },
  { title: "后台管理", url: "http://localhost:80/", icon: fs },
];
const rightNavs = [];

const route = useRoute();
const router = useRouter();
const store = useStore();

const changeRouter = (item) => {
  store.commit("setNavIndex", 1);

  if (item.router) {
    router.push(item.router);
  } else {
    window.open(item.url);
  }
};
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 160vw;
  height: 48px;
  z-index: 999;
  background:rgba($color: #213d5b, $alpha: 0.5);
  //background: url("../../assets/common/header.svg") no-repeat;
  color: #fff;
  display: flex;
  align-items: center;
  .logClass {
     //position: absolute;
     //padding-left: 776px;
  }

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
      padding: 0 30px;
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
      background-image: url("../../assets/common/active.png");
    }
  }
}
</style>

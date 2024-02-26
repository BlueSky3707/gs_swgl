<template>
  <div class="header">
    <div class="time">{{time}}</div>
    <div class="date">{{date}}</div>
  </div>
  <img src="../../assets/header/left.png" class="left">
  <img src="../../assets/header/right.png" class="right">
</template>

<script setup>
import dayjs from "dayjs"
import {onMounted, onUnmounted} from "vue";
let time = $ref(dayjs().format("HH:mm:ss"))
let date = $ref(['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][dayjs().day()] + ' / ' + dayjs().format("YYYY.MM.DD"));
let temp = $ref(null)
onMounted(()=>{
  temp = setInterval(()=>{
    time = dayjs().format("HH:mm:ss")
  },1000)
})
onUnmounted(()=>{
  clearInterval(temp)
})
</script>

<style scoped lang="scss">
.header{
  width: 100vw;
  background-image: url("../../assets/header/header.png");
  background-position: left;
  background-repeat: no-repeat;
  background-size: 1920px 100%;
  height: 82px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .time{
    position: absolute;
    left: 80%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 32px;
    font-family: DIN-Regular, DIN;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 38px;
    text-shadow: 0px 0px 6px #2466FF;
    -webkit-background-clip: text;
  }
  .date{
    position: absolute;
    left: 89%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #DFECFF;
    line-height: 40px;
    -webkit-background-clip: text;
  }
}
.left{
  position: fixed;
  top: 100px;
  left: 0;
  z-index: 999;
}
.right{
  position: fixed;
  top: 100px;
  right: 0;
  z-index: 999;
}
</style>

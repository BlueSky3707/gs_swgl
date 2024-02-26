<template>
  <div class="box">
    <div class="bian"></div>

    <div class="title">
      <div>{{title}}</div>
      <img src="../../../assets/Box/close.png" @click="emit('close',2)">
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps(['title'])
const emit = defineEmits(['close'])
</script>

<style scoped lang="scss">
:slotted(.title){
  box-sizing: border-box;
  width: 100%;
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  padding-left: 8px;
  position: relative;
  margin: 12px 0;
  background: linear-gradient(90deg, #508FFF90 0%,#508FFF00 40%,#0000);

  &:after{
    position: absolute;
    bottom: -6px;
    left: 0;
    content: '';
    margin-top: 10px;
    width: 100%;
    height: 1px;
    background-image: url("@/assets/image/line.png");
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
  }
}

.box {
  position: fixed;
  top: 100px;
  left: 20px;
  padding: 12px;
  min-width: 480px;
  min-height: 300px;
  height: auto;
  width: auto;
  box-sizing: border-box;
  background-image: url("../../../assets/Box/top.png");
  background-position: top center;
  background-repeat: no-repeat;
  background-color: rgba(8, 13, 36, 0.90);
  border: 1px solid rgba(68,149,255,0.8);
  color: #fff;

  &:before{
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 12px;
    height: 12px;
    background-image: url("../../../assets/Box/bian.png");
  }

  &:after{
    position: absolute;
    top: 0;
    right: 0;
    content: '';
    width: 12px;
    height: 12px;
    transform: rotate(90deg);
    background-image: url("../../../assets/Box/bian.png");
  }

  .bian{
    &:before{
      position: absolute;
      bottom: 0;
      left: 0;
      content: '';
      width: 12px;
      height: 12px;
      transform: rotate(-90deg);
      background-image: url("../../../assets/Box/bian.png");
    }

    &:after{
      position: absolute;
      bottom: 0;
      right: 0;
      content: '';
      width: 12px;
      height: 12px;
      transform: rotate(180deg);
      background-image: url("../../../assets/Box/bian.png");
    }
  }


  .title{
    width: 100%;
    background-image: url("../../../assets/Box/title.png");
    background-repeat: no-repeat;
    background-size: 100% 36px;
    height: 36px;
    line-height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
    font-family: PingFang SC-Bold, PingFang SC;

    div{
      width: 380px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    img{
      cursor: pointer;
    }
  }
}
</style>

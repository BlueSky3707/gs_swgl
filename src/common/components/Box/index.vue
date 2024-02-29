<template>
  <div class="leftBox" v-draggable="draggable">
    <div class="title">
      <el-tooltip :content="title" placement="bottom-start">
        <div class="titleText">{{ title }}</div>
      </el-tooltip>
      <img v-if="hideclose == undefined" src="@/assets/common/close.png" class="back" @click="emit('close')"/>
    </div>
    <div class="boxMain">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['title', 'hideclose', 'draggable'])
const emit = defineEmits(['close'])
</script>

<style scoped lang="scss">
.leftBox {
  position: fixed;
  left: 16px;
  top: 100px;
  z-index: 99;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.8);
  background-image: url("../../src/assets/common/bgBox.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 8px;
  box-sizing: border-box;

  .title {
    width: 100%;
    height: 38px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-image: url("@/assets/common/title.png");
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: left;
    padding: 0 12px;
    box-sizing: border-box;
    font-size: 14px !important;

    .titleText {
      width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: zoom-in;
      padding-left: 20px;
    }

    .back {
      cursor: pointer;
      width: 16px;
      height: 16px;
    }
  }

  .boxMain {
    min-width: 300px;
    min-height: 50px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.17);
    border-radius: 0px 0px 4px 4px;
  }
}

</style>

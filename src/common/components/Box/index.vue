<template>
  <div class="leftBox" v-draggable="draggable">
    <div class="title">
      <div class="titleText" v-if="title && title.length < 16">{{ title }}</div>
      <el-tooltip :content="title" placement="bottom-start" v-else>
        <div class="titleText">{{ title }}</div>
      </el-tooltip>
<!--      <img v-if="hideclose == undefined" src="@/assets/common/right.svg" class="back" @click="emit('close')"/>-->
      <img v-if="hideclose == undefined" src="@/assets/common/close.png" class="back" @click="emit('close')"/>
    </div>
    <div class="boxMain">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['title','hideclose','draggable'])
const emit = defineEmits(['close'])
</script>

<style scoped lang="scss">
.leftBox {
  position: fixed;
  left: 16px;
  top: 60px;
  z-index: 99;
  border: 1px solid #8DB0F0;
  border-radius: 4px;

  .title {
    width: 100%;
    height: 38px;
    background: linear-gradient(180deg, #FFFFFF 0%, #DBEAFF 100%);
    border-radius: 4px 4px 0px 0px;
    box-sizing: border-box;
    color: #2173E9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    font-size: 14px!important;
    position: relative;

    &:after{
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      content: '';
      width: 100%;
      height: 1px;
      background: #8DB0F0;
    }

    .titleText{
      width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: zoom-in;
    }

    .back {
      cursor: pointer;
      width: 13px;
      height: 13px;
    }
  }

  .boxMain {
    min-width: 300px;
    min-height: 50px;
    background: #fff;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.17);
    border-radius: 0px 0px 4px 4px;
  }
}

</style>

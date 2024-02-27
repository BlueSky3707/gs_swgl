<template>
  <div class="tuli2" v-if="!showTuli">
    <img src="@/assets/TuLi/tuli.png" @click="showTuli = true"/>
  </div>
  <div class="tuli" v-else>
    <div class="tuli_tit">
      <div>
        <img class="tit_img" src="@/assets/TuLi/dw.png"/>
        <span>点位图例</span>
      </div>
      <img class="tit_img" src="@/assets/TuLi/close.png" @click="showTuli = false"/>
    </div>
    <div class="tuli_con">
      <div class="con_item" v-for="(item,index) in Tuli" :key="index">
        <div class="con_tit">{{item.name}}</div>
        <div class="list_warp">
          <div class="list_item" v-for="(v,i) in item.List" :key="i">
            <img :src="getImageUrl(v.name)"/>
            <span class="tit">{{v.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Tuli,getImageUrl} from "./tuli"

const showTuli = $ref(true)
</script>

<style scoped lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
@mixin flex(){
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tuli2{
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  background: rgba(8, 13, 36, .8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.tuli{
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 360px;
height: 120px;
  background-image: url("@/assets/image/tuliBg.png");
  .tuli_tit{
    width: 100%;
    height: 39px;
    padding: 0 12px;
    font-size: 16px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    @include flex();
    .tit_img{
      transform: translateY(2px);
      margin-right: 7px;
      cursor: pointer;
    }
  }
  .tuli_con {
    padding: 12px;
    .con_item{
      .con_tit{
        font-size: 13px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #BFD4FF;
        margin-bottom: 4px;
      }
      .list_warp{
        display: grid;
        grid-template-columns: repeat(3,1fr);
        align-items: center;
        grid-row-gap: 14px;
        border-top: 1px solid rgba(93, 150, 251, 0.5);
        width: 100%;
        background: rgba(94, 134, 213, 0.1);
        margin-bottom: 12px;
        padding: 15px 18px;
      }
      .list_item {
        width: 100%;
        font-size: 13px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #BFD4FF;
        display: flex;
        align-items: center;
        img{
          width: 22px;
          height: 22px;
        }
        .tit{
          margin-left: 8px;
        }
      }
    }

  }
}
</style>

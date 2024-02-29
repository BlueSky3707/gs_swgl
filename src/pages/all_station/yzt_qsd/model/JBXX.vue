<template>
 <div class="max">
      <div class="rows">
        <div class="rows_left">取水口名称</div>
        <div>{{attributes.qskmc}}</div>
      </div>
       <div class="rows">
        <div class="rows_left">所在行政区</div>
        <div>{{attributes.szxzq}}</div>
      </div>
       <div class="rows">
        <div class="rows_left">取水地点</div>
        <div>{{attributes.qsdd}}</div>
      </div>
       <div class="rows">
        <div class="rows_left">运行状态</div>
        <div>{{attributes.qsgczt}}</div>
      </div>
       <div class="rows">
        <div class="rows_left">水源类型</div>
        <div>{{attributes.qssylx}}</div>
      </div>
   	<div class="rows">
        <div class="rows_left">取水用途</div>
        <div>{{attributes.qsyt}}</div>
      </div><div class="rows">
        <div class="rows_left">取水类型</div>
        <div>{{attributes.qslx}}</div>
      </div><div class="rows">
        <div class="rows_left">发证单位</div>
        <div>{{attributes.fzdw}}</div>
      </div><div class="rows">
        <div class="rows_left">取水单位</div>
        <div>{{attributes.qsdw}}</div>
      </div>

	

  </div>
 
 
</template>

<script setup>
import {inject, onMounted} from "vue";
const emit = defineEmits(['close'])
const attributes = inject('attributes')


</script>

<style scoped lang="scss">
.max{
  width: 300px;

  .rows{
    width: 100%;
    min-height: 36px;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 2.5fr;
    box-sizing: border-box;
    padding: 8px 14px;
    font-size: 14px;
    color: $text-color;

    // &:nth-child(2n){
    //   background-color: #F8FBFF;
    // }

    .rows_left{
      color: $title-color;
    }
  }
}
</style>

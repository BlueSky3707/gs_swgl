<template>
  <div class="bjlbList">
    <div class="tableList">
      <!-- 表头 -->
      <div class="table">
        <div style="text-align: center">序号</div>
        <div>编号</div>
        <div>报警名称</div>
        <div>报警时间</div>
        <div>报警内容</div>
      </div>
      <!-- 表数据 -->
   
        <vue3-seamless-scroll
          :list="state.tableList"
          class="list"
          hover
          :step="0.5"
        >
          <div
            v-for="(item, index) in state.tableList"
            :key="index"
            class="list_row"
            :class="index % 2 == 0 ? 'bjColor' : ''"
            @click="clickRow(item)"
          >
            <div class="row_span1">{{ index + 1 }}</div>
            <div class="row_span2" :title="item.madeno">{{ item.madeno }}</div>
            <div class="row_span2" :title="item.metername">
              {{ item.metername }}
            </div>
            <div class="row_span3" :title="item.zytime">{{ item.zytime }}</div>
            <div class="row_span4" :title="item.nr">{{ item.nr }}</div>
          </div>
        </vue3-seamless-scroll>
      </div>
    </div>

</template>

<script setup>
import { onMounted, reactive } from "vue";
import dayjs from "dayjs";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import {Vue3SeamlessScroll} from "vue3-seamless-scroll";
import { search } from "@/GIS/api/postgis";
import * as baseLayerUtils from "@/GIS/mapUtils/baselayer";
const state = reactive({
  // monthcount: 0,
  // curcount: 0,
  dateList: null,
  valueList: null,
  // 列表数据
  tableList: [],
});
onMounted(async () => {
  let param = {
    layerName: "byswgl_yjjl",
    isReturnGeometry: false,
    spatialRel: "INTERSECTS",
    isCache: false,
    filter: "zytime = '" + dayjs().format("YYYY-MM-DD") + "'",
  };
  let res = await search(param);
  if (res.data.data.features && res.data.data.features.length > 0) {
    state.tableList = res.data.data.features.map((ite) => {
      ite.attributes.nr = "数据异常";
      ite.attributes.zytime = dayjs(ite.attributes.zytime).format("YYYY-MM-DD");
      return ite.attributes;
    });
    state.curcount = res.data.data.features.length;
  } else {
    state.tableList = [];
    state.curcount = 0;
  }

  // let param2 = {
  //   layerName: "byswgl_yjjl_month_v",
  //   isReturnGeometry: false,
  //   spatialRel: "INTERSECTS",
  //   isCache: false,
  //   filter: "zytime = '" + dayjs().format("YYYY-MM-01") + "'",
  // };
  // let res2 = await search(param2);
  // if (res2.data.data.features && res2.data.data.features.length > 0) {
  //   state.monthcount = res2.data.data.features[0]?.attributes.count;
  // } else {
  //   state.monthcount = 0;
  // }
});

// 列表 点击
const clickRow = (item) => {
  let marklayer = baseLayerUtils.getLayerByid("mark");
  marklayer.getSource().clear();
  marklayer.getSource().addFeature(
    new Feature({
      attributes: item,
      geometry: new Point([Number(item.ns), Number(item.we)]),
    })
  );
  window.$olMap.getView().animate({
    center: [Number(item.ns), Number(item.we)],
    zoom: 15,
    duration: 1000,
  });
};
</script>

<style scoped lang="scss">
.bjlbList {
      width: 100%;

  height:calc(39vh - 70px);
  /* border: 1px solid rgba(255, 152, 62, 0.8); */
  
 
  .tableList {
    width: 100%;
    padding: 16px 8px 0px 8px;
    box-sizing: border-box;
   height:calc(39vh - 70px);
     .table {
      width: 100%;
      height: 30px;
      color: #ffffff;
      font-size: 13px;
      /* border-bottom: 1px solid rgba(255, 152, 62, 0.7); */
      padding-bottom: 4px;
      display: grid;
      grid-template-columns: 40px 90px 90px 90px 1fr;
      grid-column-gap: 5px;

      div {
        width: 100%;
      }
    }

    .list {
      width: 100%;
       height:calc(39vh - 120px);
      overflow: hidden;
      .list_row {
        width: 100%;
        height: 36px;
        color: rgba(255, 179, 80, 1);
        font-size: 13px;
        display: grid;
        align-items: center;
        grid-template-columns: 40px 90px 90px 90px 1fr;
        grid-column-gap: 5px;

        div {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .bjColor {
        background-color: rgba(255, 102, 33, 0.1);
      }

      .row_span1 {
        text-align: center;
        color: #e3c7af;
      }

      .row_span4 {
        color: #ff6621;
        cursor: pointer;
      }

      .row_span5 {
        img {
          width: 14px;
          height: 14px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }

   

   

   
  }
}
</style>

<template>
  <!-- 报警列表 按钮 -->
  <div class="bjlbBottonD" v-if="!state.openType" @click="openList">
    <img src="@/assets/image/botton.png" />
    <span>上传列表</span>
  </div>

  <!-- 报警列表 -->
  <div class="bjlbListD" v-if="state.openType">
    <!-- 标题 -->
    <div class="title">
      <div class="title_left divFlex">
        <img src="@/assets/image/botton.png" />
        <span>上传列表</span>
      </div>
      <div class="title_right divFlex">
        <img src="@/assets/image/close.png" @click="closeList" />
      </div>
    </div>

    <!-- 顶部块new URL("/layers/mark.png", import.meta.url).href -->
    <div class="topCard">
      <div class="topCard_title">
        <img src="/layers/dq_cljcz.png" />
        <div class="topCards topCard_left_1">
          <div class="span1"> {{dayjs().format('YYYY-MM-DD HH:mm:ss')}}时上传电表数 :{{ state.curcount }}</div>
          <!-- <div class="span2">
            <span class="span2_1">{{ state.curcount }}</span>
            <span class="span2_2">个</span>
          </div> -->
        </div>
      </div>
      <div class="topCard_title tjData ">
        <img src="@/assets/image/top2.png" />
        <div class="topCards topCard_left_2">
          <div class="span1">本月报警次数</div>
          <div class="span2">
            <span class="span2_1">{{ state.monthcount }}</span>
            <span class="span2_2">次</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 列表 -->
    <div class="tableList">
      <!-- 表头 -->
      <div class="table">
        <div style="text-align: center">序号</div>
        <div>编号</div>
        <div>企业名称</div>
        <div>接收时间</div>
        <div>当日用水量(立方米)</div>
      </div>
      <!-- 表数据 -->
      <div class="list">
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
          <div class="row_span4" :title="item.nr">{{ item.todaytraffic }}</div>
          <!--          <div class="row_span5">-->
          <!--            <img src="@/assets/image/row.png" @click="clickRow(item)">-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import dayjs from "dayjs";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import * as echarts from "echarts";
import { search } from "@/GIS/api/postgis";
import * as baseLayerUtils from "@/GIS/mapUtils/baselayer";
import markRaws from "@/common/tools/markRaws";
const state = reactive({
  durl:new URL("/layers/mark.png", import.meta.url).href,
  openType: true, // 列表显示
  monthcount: 0,
  curcount: 0,
  dateList: null,
  valueList: null,
  // 列表数据
  tableList: [],
});
onMounted(async () => {
  let param = {
    layerName: "new_lssj",
    isReturnGeometry: false,
    spatialRel: "INTERSECTS",
    isCache: false,
    filter: "to_char(time, 'YYYY-MM-DD') = '" + dayjs().add(-1,'day').format("YYYY-MM-DD") + "'" ,
  };
  let res = await search(param);
  if (res.data.data.features && res.data.data.features.length > 0) {
    state.tableList = res.data.data.features.map((ite) => {
      ite.attributes.zytime = new dayjs(ite.attributes.time).format("YYYY-MM-DD HH:mm:ss");
      return ite.attributes;
    });
    state.curcount = res.data.data.features.length;
  } else {
    state.tableList = [];
    state.curcount = 0;
  }
});

// 打开列表
const openList = () => {
  state.openType = true;
};
// 关闭列表
const closeList = () => {
  state.openType = false;
};
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
    zoom: 12.5,
    duration: 1000,
  });
};
</script>

<style scoped lang="scss">
.bjlbBottonD {
  width: 120px;
  height: 40px;
  border: 1px solid #3e4eff;
  background: linear-gradient(
    90deg,
    rgba(62, 152, 255, 0.7) 0%,
    rgba(255, 152, 62, 0) 100%
  );
  padding-left: 12px;
  box-sizing: border-box;
  position: absolute;
  right: 0px;
  top: 98px;
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  span {
    color: #ffffff;
    font-size: 16px;
  }
}

.bjlbListD {
  width: 440px;
  height: 86vh;
  border: 1px solid rgba(31, 135, 191, 0.657);
  background-color: rgba(6, 17, 39, 0.8);
  position: absolute;
  right: 22px;
  top: 98px;

  .title {
    width: 100%;
    height: 40px;
    background: linear-gradient(
      90deg,
      rgba(62, 152, 255, 0.7) 0%,
      rgba(255, 152, 62, 0) 100%
    );
    padding-left: 12px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;

    .divFlex {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .title_left {
      img {
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }

      span {
        color: #ffffff;
        font-size: 16px;
      }
    }

    .title_right {
      justify-content: end;

      img {
        width: 16px;
        height: 16px;
        margin-right: 16px;
        cursor: pointer;
      }
    }
  }

  .topCard {
    width: 424px;
    height: 72px;
    margin: 12px 8px 0px 8px;
    background-color: rgba(221, 203, 187, 0.12);
    padding: 16px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 70px;

    .topCard_title {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 40px 1fr;
      grid-column-gap: 12px;

      img {
        width: 30px;
        height: 30px;
      }

      .topCards {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .span1 {
          width: 100%;
          color: #ffffff;
          font-size: 14px;
        }

        .span2 {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: end;

          .span2_1 {
            color: #ffffff;
            font-size: 16px;
          }

          .span2_2 {
            color: #e3c7af;
            font-size: 10px;
          }
        }
      }

      .topCard_left_1 {
        width: 255px;
        font-size: 14px;
      }

      .topCard_left_2 {
        width: 84px;
      }
    }
    .tjData{
        display: none;
    }
  }

  .tableList {
    width: 100%;
    padding: 16px 8px 0px 8px;
    box-sizing: border-box;

    .table {
      width: 100%;
      color: #ffffff;
      font-size: 13px;
      border-bottom: 1px solid rgba(255, 152, 62, 0.7);
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
      height: 63vh;
      margin-top: 3px;
      overflow-y: auto;

      .list_row {
        width: 100%;
        height: 36px;
        // color: rgba(255, 179, 80, 1);
      
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

    .list::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }

    .list::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(255, 152, 62, 0.5);
    }

    .list::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: rgba(255, 152, 62, 0.12);
    }
  }
}
</style>

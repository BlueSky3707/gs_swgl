<template>
  <!-- 报警列表 按钮 -->
  <div class="bjlbBotton" v-if="!state.openType" @click="openList">
    <img src="@/assets/image/botton.png" />
    <span>报警列表</span>
  </div>

  <!-- 报警列表 -->
  <div class="bjlbList" v-if="state.openType">
    <!-- 标题 -->
    <div class="title">
      <div class="title_left divFlex">
        <img src="@/assets/image/botton.png" />
        <span>报警列表</span>
      </div>
      <div class="title_right divFlex">
        <img src="@/assets/image/close.png" @click="closeList" />
      </div>
    </div>

    <!-- 顶部块 -->
    <div class="topCard">
      <div class="topCard_title">
        <img src="@/assets/image/top1.png" />
        <div class="topCards topCard_left_1">
          <div class="span1">当前报警站点数量</div>
          <div class="span2">
            <span class="span2_1">{{ 3 }}</span>
            <span class="span2_2">个</span>
          </div>
        </div>
      </div>
      <div class="topCard_title">
        <img src="@/assets/image/top2.png" />
        <div class="topCards topCard_left_2">
          <div class="span1">本月报警次数</div>
          <div class="span2">
            <span class="span2_1">{{ 9 }}</span>
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
        <div>报警名称</div>
        <div>报警时间</div>
        <div>报警内容</div>
      </div>
      <!-- 表数据 -->
      <div class="list">
        <div
          v-for="(item, index) in state.tableList"
          :key="index"
          class="list_row"
          :class="index % 2 == 0 ? 'bjColor' : ''"
        >
          <div class="row_span1">{{ index + 1 }}</div>
          <div class="row_span2" :title="item.name">{{ item.name }}</div>
          <div class="row_span3" :title="item.time">{{ item.time }}</div>
          <div class="row_span4" :title="item.nr">{{ item.nr }}</div>
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
import * as echarts from "echarts";
import markRaws from "@/common/tools/markRaws";
const state = reactive({
  openType: false, // 列表显示
   data: [
    ["2024-02-05", 116],
    ["2024-02-06", 129],
    ["2024-02-07", 135],
    ["2024-02-08", 86],
    ["2024-02-09", 73],
    ["2024-02-10", 85],
    ["2024-02-11", 73],
    ["2024-02-12", 68],
    ["2024-02-13", 92],

  ],
  dateList: null,
  valueList: null,
  // 列表数据
  tableList: [],
});
onMounted(() => {
   state.dateList = state.data.map(function (item) {
    return item[0];
  });
  state.valueList = state.data.map(function (item) {
    return item[1];
  });
  state.tableList = [
    { name: "监测站A", time: "2024-02-28", nr: "数据异常" },
    { name: "监测站B", time: "2024-02-27", nr: "数据异常" },
    { name: "监测站C", time: "2024-02-27", nr: "数据异常" },
    { name: "监测站A", time: "2024-02-01", nr: "数据异常" },
    { name: "监测站B", time: "2024-02-10", nr: "数据异常" },
    { name: "监测站C", time: "2024-02-09", nr: "数据异常" },
    { name: "监测站A", time: "2024-02-08", nr: "数据异常" },
    { name: "监测站B", time: "2024-02-07", nr: "数据异常" },
    { name: "监测站C", time: "2024-02-03", nr: "数据异常" },
  ];
});
//历史监测数据
const initEchart = () => {
  state.loading = true;
  if (chartInit) {
    chartInit.dispose();
  }
  chartInit = markRaws(echarts.init(echartRef));
  let option = {
    // Make gradient line here
    visualMap: [
      {
        show: false,
        type: "continuous",
        seriesIndex: 0,
        min: 0,
        max: 400,
      },
      {
        show: false,
        type: "continuous",
        seriesIndex: 1,
        dimension: 0,
        min: 0,
        max: state.dateList.length - 1,
      },
    ],

    title: [
      {
        left: "center",
        text: "监测数据",
      },
    ],
    tooltip: {
      trigger: "axis",
    },
    xAxis: [
      {
        name: "监测时间",

        data: state.dateList,
      },
    ],
    yAxis: [
      {
        name: "监测值",
      },
    ],
    grid: [
      {
        bottom: "10%",
      },
    ],
    series: [
      {
        type: "line",
        showSymbol: false,
        data: state.valueList,
        areaStyle: {}
      },
    ],
  };
  chartInit.setOption(option, true);

  state.loading = false;
};
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
  console.log(item);
};
</script>

<style scoped lang="scss">
.bjlbBotton {
  width: 120px;
  height: 40px;
  border: 1px solid #ff983e;
  background: linear-gradient(
    90deg,
    rgba(255, 152, 62, 0.7) 0%,
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

.bjlbList {
  width: 440px;
  height: 86vh;
  border: 1px solid rgba(255, 152, 62, 0.8);
  background-color: rgba(6, 17, 39, 0.8);
  position: absolute;
  right: 22px;
  top: 98px;

  .title {
    width: 100%;
    height: 40px;
    background: linear-gradient(
      90deg,
      rgba(255, 152, 62, 0.6) 0%,
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
    background-color: rgba(255, 152, 62, 0.12);
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
        width: 40px;
        height: 40px;
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
        width: 112px;
      }

      .topCard_left_2 {
        width: 84px;
      }
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
      grid-template-columns: 40px 90px 90px 1fr;
      grid-column-gap: 5px;

      div {
        width: 100%;
      }
    }

    .list {
      width: 100%;
      height: 67vh;
      margin-top: 3px;
      overflow-y: auto;

      .list_row {
        width: 100%;
        height: 36px;
        color: rgba(255, 179, 80, 1);
        font-size: 13px;
        display: grid;
        align-items: center;
        grid-template-columns: 40px 90px 90px 1fr 40px;
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

      .row_span2 {
      }

      .row_span3 {
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

<template>
  <Box class="box" title="历史数据" @close="emit('close')">
    <div class="main">
      <!-- 顶部搜索 -->
      <el-row style="margin-bottom: 10px">
        <el-col :span="10">
          <span>监测时间：</span>

          <el-date-picker
            style="width: 220px"
            type="daterange"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            v-model="state.time"
          ></el-date-picker>
        </el-col>

        <el-col :span="5">
          <el-button type="primary" style="width: 90px" @click="initEchart()"
            >查询</el-button
          >
          <el-button @click="initEchart()">
            <el-icon style="vertical-align: middle">
              <refreshRight />
            </el-icon>
          </el-button>
        </el-col>
      </el-row>

      <div class="con" v-loading="state.loading">
        <!-- 列表 -->
        <div class="list" id="echartRef" ref="echartRef"></div>
      </div>
    </div>
  </Box>
</template>

<script setup>
import { RefreshRight } from "@element-plus/icons";
import { inject, onMounted, onUnmounted, reactive } from "vue";
import dayjs from "dayjs";
import * as echarts from "echarts";
import markRaws from "@/common/tools/markRaws";
const emit = defineEmits(["close"]);
const attributes = inject("attributes");
let chartInit = $ref(null);
let echartRef = $ref(null);
console.log(attributes);
const state = reactive({
  loading: false,
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
    ["2024-02-14", 130],
    ["2024-02-15", 245],
    ["2024-02-16", 92],
    ["2024-02-17", 130],
    ["2024-02-18", 137],
    ["2024-02-19", 120],
    ["2024-02-20", 130],
    ["2024-02-21", 145],
  ],
  dateList: null,
  valueList: null,
  time: [],
});

onMounted(() => {
  state.dateList = state.data.map(function (item) {
    return item[0];
  });
  state.valueList = state.data.map(function (item) {
    return item[1];
  });
  timeformate();
  initEchart();
});

const timeformate = () => {
  state.time = [
    dayjs().subtract(1, "week").format("YYYY-MM-DD"),
    dayjs().format("YYYY-MM-DD"),
  ];
};
onUnmounted(() => {});

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
</script>

<style scoped lang="scss">
.box {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .main {
    width: 800px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: $text-color;
    padding: 15px 12px;
    position: relative;
    box-sizing: border-box;
    .switch {
      display: flex;
      align-items: center;
      width: 48px;
      height: 24px;
      background: rgba(255, 255, 255, 0.39);
      border: 1px solid #c1cedf;
      box-sizing: border-box;
      opacity: 1;
      border-radius: 2px;
      position: absolute;
      right: 28px;
      top: 60px;
      z-index: 99;
      &:hover {
        cursor: pointer;
      }
      .item {
        width: 24px;
        height: 24px;
        line-height: 27px;
        text-align: center;
      }
      .active {
        width: 24px;
        height: 24px;
        line-height: 27px;
        text-align: center;
        background: rgba(58, 131, 239, 1);
      }
    }
    .echart {
      width: 100%;
      height: 400px;
    }
    .list {
      width: 100%;
      height: 400px;

      .titles {
        width: 100%;
        height: 30px;
        line-height: 30px;
      }

      .tables {
        width: 100%;
        .table {
          width: 100%;
          font-size: 14px;
          font-weight: 400;

          .table-header,
          .table-body {
            width: 100%;
            line-height: 33px;
            font-size: 14px;
            display: grid;
            grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr;
            align-items: center;
            text-align: center;
          }

          .table-header {
            color: #3e8bec;
          }

          .table-body {
            color: rgba(0, 0, 0, 0.6);
            border-bottom: 1px #666 solid;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            height: 32px;
            .tr:nth-child(1),
            .tr:nth-child(2),
            .tr:nth-child(3),
            .tr:nth-child(4) {
              color: #ffffff;
            }
            .tr:nth-child(5) {
              background: rgba(145, 210, 102, 1);
              opacity: 1;
              border-radius: 50px;
              margin: 0 auto;
              font-size: 12px;
              width: 48px;
              height: 18px;
              line-height: 18px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
}
</style>

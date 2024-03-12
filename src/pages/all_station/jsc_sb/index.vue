<template>
  <JscBox :title="attributes.name" v-if="showIndex == 0" @close="emit('close')">
    <div class="title">
      <span>报警信息</span>
    </div>
    <div class="bj_content">
      <div class="con_item">
        <div class="con_tit">报警时间：</div>
        <div class="con_txt">1111</div>
      </div>
      <div class="con_item">
        <div class="con_tit">报警类型：</div>
        <div class="con_tit">
          <img src="@/assets/image/cb.png" />
        </div>
      </div>
      <div class="con_item">
        <div class="con_tit">报警详情：</div>
        <div class="con_tit">
          <div class="con_txt">监测站数据传输异常</div>
        </div>
      </div>
      <div class="con_item">
        <div class="con_tit">报警通知：</div>
        <div class="con_tit">
          <div class="con_txt">已发送通知，通知人数为12。</div>
        </div>
      </div>
      <!-- <div class="gbbj" @click="closeBj">
        <img src="@/assets/water/gbbj.png"/>
        关闭报警
      </div> -->
    </div>

    <div class="title">
      <span>最新数据</span>
      <div class="timepoint">
        <el-icon
          @click="upDateDw"
          style="transform: translateY(3px); margin-left: 8px; cursor: pointer"
          :size="20"
          color="#8BB5FF"
        >
          <RefreshRight />
        </el-icon>
      </div>
    </div>
    <div
      class="wrw"
      id="echartRef"
      ref="echartRef"
      v-loading="state.loading"
      element-loading-background="rgba(0,0,0,0.4)"
    ></div>
  </JscBox>
</template>

<script setup>
import Jbxx from "./jbxx";
import { inject, onMounted, reactive } from "vue";
import { RefreshRight } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import * as echarts from "echarts";
import markRaws from "@/common/tools/markRaws";
import { useStore } from "vuex";
import * as baseLayerUtils from "@/GIS/mapUtils/baselayer";
let chartInit = $ref(null);
let echartRef = $ref(null);
const store = useStore();
const attributes = inject("attributes");
const emit = defineEmits(["close"]);
console.log(attributes);
import cbbg from "@/assets/image/cbbg.png";

const state = reactive({
  loading: true,
  data: {},

  tiles: "报警详情",
  data: [
    ["2024-02-05", 116],
    ["2024-02-06", 260],
    ["2024-02-07", 135],
    ["2024-02-08", 300],
    ["2024-02-09", 73],
    ["2024-02-10", 280],
    ["2024-02-11", 73],
  ],
  dateList: null,
  valueList: null,
  videoList: [],
});

const upDateDw = () => {
  state.loading = true;
  setTimeout(() => {
    init();
    state.loading = false;
  }, 500);
};

let showIndex = $ref(0);
const isCb = (wrw) => {
  return {};
};

const getVideoList = () => {};

const init = () => {
  initEchart();
};
onMounted(() => {
  state.dateList = state.data.map(function (item) {
    return item[0];
  });
  state.valueList = state.data.map(function (item) {
    return item[1];
  });
  initEchart();
});
const closeBj = () => {};
const initEchart = () => {
  state.loading = true;
  if (chartInit) {
    chartInit.dispose();
  }
  if (!echartRef) {
    return;
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
        areaStyle: {},
      },
    ],
  };
  chartInit.setOption(option, true);

  state.loading = false;
};
</script>

<style scoped lang="scss">
@import "../index/common.scss";
</style>

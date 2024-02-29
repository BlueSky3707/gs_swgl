<template>
  <JscBox :title="state.tiles" v-if="showIndex == 0" @close="emit('close')">
    <div class="title">
      <span>报警信息</span>
    </div>
    <div class="bj_content">
      <div class="con_item">
        <div class="con_tit">报警时间：</div>
        <div class="con_txt">2024-02-25 09:00:00</div>
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
          <div class="con_txt">数据传输异常</div>
        </div>
      </div>
      <div class="con_item">
        <div class="con_tit">报警通知：</div>
        <div class="con_tit">
          <div class="con_txt">以短信方式通知相关人员。</div>
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
        <span>刷新</span>
        <el-icon
          @click="initEchart()"
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
    <div class="button">
      <div class="btn_item" @click="showIndex = 4">
        <img src="@/assets/common/zdxx.png" />
        站点信息
      </div>
    </div>
  </JscBox>

  <transition-group name="el-zoom-in-left">
    <Jbxx v-if="showIndex == 4" @close="showIndex = 0" />
  </transition-group>
</template>

<script setup>
import Jbxx from "./jbxx";
import { inject, onMounted, reactive } from "vue";
import { RefreshRight } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import * as baseLayerUtils from "@/GIS/mapUtils/baselayer";
import * as echarts from "echarts";
import markRaws from "@/common/tools/markRaws";
const store = useStore();
const attributes = inject("attributes");
console.log(attributes);
const emit = defineEmits(["close"]);
import cbbg from "@/assets/image/cbbg.png";
let chartInit = $ref(null);
let echartRef = $ref(null);
const state = reactive({
  loading: true,
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
      },
    ],
  };
  chartInit.setOption(option, true);

  state.loading = false;
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
</script>

<style scoped lang="scss">
@import "../index/common.scss";
</style>

<template>
  <JscBox :title="state.tiles" v-if="showIndex == 0" @close="emit('close')">
    <div class="title">
      <span>企业基本信息</span>
    </div>
    <div class="bj_content">
      <div class="con_item">
        <div class="con_tit">名称：</div>
        <div class="con_txt">肃稀土新材料股份有限公司</div>
      </div>
      <div class="con_item">
        <div class="con_tit">地址：</div>
        <div class="con_tit">
          <div class="con_txt">靖远县靖远县三滩乡小冰岛</div>
        </div>
      </div>
      <div class="con_item">
        <div class="con_tit">取水方式</div>
        <div class="con_tit">
          <div class="con_txt">黄河干流地表水</div>
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
  tiles: "肃稀土新材料股份有限公司",
  data: [
    ["2024-02-05", 526],
    ["2024-02-06", 460],
    ["2024-02-07", 535],
    ["2024-02-08", 300],
    ["2024-02-09", 673],
    ["2024-02-10", 580],
    ["2024-02-11", 473],
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

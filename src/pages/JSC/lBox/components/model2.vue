<template>
  <div
    class="wrwp"
    id="echartRef"
    ref="echartRef"
    element-loading-background="rgba(0,0,0,0.4)"
  ></div>
</template>

<script setup>
import { onMounted, reactive, onUnmounted } from "vue";
import * as echarts from "echarts";
import markRaws from "@/common/tools/markRaws";

let chartInit = $ref(null);
let echartRef = $ref(null);
const state = reactive({
  Xdata: [],
  Ydata: [],
  timeOut: null,
});

//历史监测数据
const initEchart = () => {
  if (chartInit) {
    chartInit.dispose();
  }
  if (!echartRef) {
    return;
  }
  chartInit = markRaws(echarts.init(echartRef));
  let ss = [
    [44, 43, 85, 93, 20],
    [52, 25, 73, 55, 73],
    [33, 86, 65, 82, 52],
    [102, 85, 53, 39, 33],
  ];
  let option = {
    legend: {
      top: "5%",
      left: "center",
      textStyle: {
        color: "#3398DB",
      },
      data: ["工业用水", "生活用水", "农田灌溉", "制水供水"],
    },

    tooltip: {
      // trigger: "axis",
      // formatter: function (params) {
      //   console.log(params);
      //   let str = params[0].name + "<br>";
      //   str +=  params[0].seriesName + "：" + params[0].value;
      //   return str
      // },
    },
     grid: {
      top: "20%",
      left: "5%",
      right: "5%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#3398DB",
        },
      },
      data: ["白银区", "平川区", "靖远县", "景泰县", "会宁县"],
    },
    yAxis: {
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#3398DB",
        },
      },
    },

    series: [
      //barGap: "-100%"
      {
        name: "工业用水",
        type: "bar",
        stack: "total",
        barWidth: 15,
        data: ss[0],
      },
      {
        name: "生活用水",
        type: "bar",
        stack: "total",
        barWidth: 15,
        data: ss[1],
      },
      {
        name: "农田灌溉",
        type: "bar",
        stack: "total",
        barWidth: 15,
        data: ss[2],
      },
      {
        name: "制水供水",
        type: "bar",
        stack: "total",
        barWidth: 15,
        data: ss[3],
      },
    ],
  };
  chartInit.setOption(option, true);
};
onMounted(async () => {
  initEchart();
});
onUnmounted(() => {});
</script>

<style scoped lang="scss">
.wrwp {
  width: 100%;

  height: 100%;
  /* border: 1px solid rgba(255, 152, 62, 0.8); */
}
</style>

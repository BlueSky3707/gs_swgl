<template>
  <div
    class="wrwp"
    id="echartRef1"
    ref="echartRef1"
    element-loading-background="rgba(0,0,0,0.4)"
  ></div>
</template>

<script setup>
import { onMounted, reactive, onUnmounted } from "vue";
import * as echarts from "echarts";
import markRaws from "@/common/tools/markRaws";

let chartInit = $ref(null);
let echartRef1 = $ref(null);
const state = reactive({
  Xdata: [],
  Ydata: [],
  timeOut: null,
});
let tempData = [
  {
    value: 25,
    itemStyle: {
      normal: {
        color: "#2c6cc4",
        shadowColor: "#2c6cc4",
        shadowBlur: 0,
      },
    },
    name: "工业用水",
  },
  {
    value: 25,
    name: "生活用水",
    itemStyle: {
      normal: {
        color: "#24375c",
      },
      emphasis: {
        color: "#24375c",
      },
    },
  },
  {
    value: 25,
    name: "农田灌溉",
    itemStyle: {
      normal: {
        color: "#453284",
      },
      emphasis: {
        color: "#453284",
      },
    },
  },
  {
    value: 25,
    name: "其他",
    itemStyle: {
      normal: {
        color: "#613fd1",
        shadowColor: "#613fd1",
        shadowBlur: 0,
      },
    },
  },
];
let getData = {
  by: [
    { name: "工业用水", value: "4000" },
    { name: "生活用水", value: "6000" },
    { name: "农田灌溉", value: "8000" },
    { name: "其他", value: "6000" },
  ],
  jd: [
    { name: "工业用水", value: "13000" },
    { name: "生活用水", value: "18000" },
    { name: "农田灌溉", value: "16000" },
    { name: "其他", value: "19000" },
  ],
  nd: [
    { name: "工业用水", value: "50000" },
    { name: "生活用水", value: "70000" },
    { name: "农田灌溉", value: "290000" },
    { name: "其他", value: "120000" },
  ],
};
const getEchart = (tempData, getData) => {
  getData.forEach((itm) => {
    let tmpitm = tempData.filter((it) => it.name == itm.name)[0];
    Object.assign(tmpitm, itm);
  });
  return getData;
};

//历史监测数据
const initEchart = () => {
  if (chartInit) {
    chartInit.dispose();
  }
  if (!echartRef1) {
    return;
  }
  chartInit = markRaws(echarts.init(echartRef1));
  let dataStyle = {
    normal: {
      label: {
        show: false,
      },
      labelLine: {
        show: true,
      },
      shadowBlur: 0,
      shadowColor: "#203665",
    },
  };
  let option = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "本月",
        type: "pie",
        clockWise: false,
        radius: [45, 55],
        itemStyle: dataStyle,
        hoverAnimation: false,
        label: {
          normal: {
            rich: {
              a: {
                color: "#3a7ad5",
                align: "center",
                fontSize: 14,
                fontWeight: "bold",
              },
              b: {
                color: "#fff",
                align: "center",
                fontSize: 12,
              },
            },
            formatter: function (params) {
              return "本月用水占比";
            },
            position: "center",
            show: true,
            textStyle: {
              fontSize: "12",
              fontWeight: "normal",
              color: "#fff",
            },
          },
        },
        center: ["15%", "50%"],
        data: getEchart(tempData, getData.by),
      },
      {
        name: "本季度",
        type: "pie",
        clockWise: false,
        radius: [45, 55],
        itemStyle: dataStyle,
        hoverAnimation: false,
        label: {
          normal: {
            rich: {
              a: {
                color: "#3a7ad5",
                align: "center",
                fontSize: 14,
                fontWeight: "bold",
              },
              b: {
                color: "#fff",
                align: "center",
                fontSize: 12,
              },
            },
            formatter: function (params) {
              return "本季度用水占比";
            },
            position: "center",
            show: true,
            textStyle: {
              fontSize: "12",
              fontWeight: "normal",
              color: "#fff",
            },
          },
        },
        center: ["50%", "50%"],
        data: getEchart(tempData, getData.jd),
      },
      {
        name: "本年度",
        type: "pie",
        clockWise: false,
        radius: [45, 55],
        itemStyle: dataStyle,
        hoverAnimation: false,
        label: {
          normal: {
            rich: {
              a: {
                color: "#3a7ad5",
                align: "center",
                fontSize: 14,
                fontWeight: "bold",
              },
              b: {
                color: "#fff",
                align: "center",
                fontSize: 12,
              },
            },
            formatter: function (params) {
              return "本年度用水占比";
            },
            position: "center",
            show: true,
            textStyle: {
              fontSize: "12",
              fontWeight: "normal",
              color: "#fff",
            },
          },
        },
        center: ["85%", "50%"],
        data: getEchart(tempData, getData.nd),
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
  position: absolute;
  height: 200px;
}
</style>

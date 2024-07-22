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

        center: ["15%", "50%"],
        data: [
          {
            value: 25,
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
                  console.log(params)
                  return (
                    "本年度占比"
                  );
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
            itemStyle: {
              normal: {
                color: "#2c6cc4",
                shadowColor: "#2c6cc4",
                shadowBlur: 0,
              },
            },
          },
          {
            value: 25,
            name: "invisible",
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
            value: 50,
            name: "invisible",
            itemStyle: {
              normal: {
                color: "#453284",
              },
              emphasis: {
                color: "#453284",
              },
            },
          },
        ],
      },
      {
        name: "第二个圆环",
        type: "pie",
        clockWise: false,
        radius: [45, 55],
        itemStyle: dataStyle,
        hoverAnimation: false,
        center: ["50%", "50%"],
        data: [
          {
            value: 50,
            label: {
              normal: {
                rich: {
                  a: {
                    color: "#d03e93",
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
                  return (
                    "本季度占比"
                  );
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
            itemStyle: {
              normal: {
                color: "#ef45ac",
                shadowColor: "#ef45ac",
                shadowBlur: 0,
              },
            },
          },
          {
            value: 50,
            name: "invisible",
            itemStyle: {
              normal: {
                color: "#412a4e",
              },
              emphasis: {
                color: "#412a4e",
              },
            },
          },
        ],
      },
      {
        name: "第三个圆环",
        type: "pie",
        clockWise: false,
        radius: [45, 55],
        itemStyle: dataStyle,
        hoverAnimation: false,
        center: ["85%", "50%"],
        data: [
          {
            value: 75,
            label: {
              normal: {
                rich: {
                  a: {
                    color: "#603dd0",
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
                  return (
                    "本年度占比"
                  );
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
            itemStyle: {
              normal: {
                color: "#613fd1",
                shadowColor: "#613fd1",
                shadowBlur: 0,
              },
            },
          },
          {
            value: 25,
            name: "invisible",
            itemStyle: {
              normal: {
                color: "#453284",
              },
              emphasis: {
                color: "#453284",
              },
            },
          },
        ],
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

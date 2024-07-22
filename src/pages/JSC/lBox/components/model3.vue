<template>
  <div
    class="wrw"
    id="echartRef"
    ref="echartRef"
    element-loading-background="rgba(0,0,0,0.4)"
  ></div>
</template>

<script setup>
import { onMounted, reactive, onUnmounted } from "vue";
import * as echarts from "echarts";
import markRaws from "@/common/tools/markRaws";
import { search } from "@/GIS/api/postgis";
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

  let option = {
    color: ["#3398DB"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    
    grid: {
      top: "9%",
      left: "2%",
      right: "13%",
      bottom: "2%",
      containLabel: true,
    },
    xAxis: {
      //坐标轴类型(类目轴)
      name: "",
      type: "value",
      axisLabel: {
        show: false,
      },

      //是否显示坐标轴刻度
      axisTick: { show: false },
      //坐标轴线线的颜色
      axisLine: {
        show: false,
      },

      //是否显示网格线
      splitLine: {
        show: false,
      },
    },

    dataZoom: [
      //滑动条
      {
        yAxisIndex: 0, //这里是从X轴的0刻度开始
        show: false, //是否显示滑动条，不影响使用
        type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
        startValue: 0, // 从头开始。
        endValue: 4, // 一次性展示5个。
      },
    ],
    yAxis: [
      {
        type: "category",
        inverse: true, //是否是反向坐标轴
        data: state.Ydata,
        axisLabel: {
          inside: true,
          show: true,
          verticalAlign: "bottom",
          lineHeight: 30,
          textStyle: {
            color: "#ffffff",
          },
          formatter: function (value, index) {
            var value;
            // if判断转换值
            return value;
          },
        },
        // offset: 10,
        nameTextStyle: {
          fontSize: 15,
        },
        splitLine: { show: false },
        axisTick: { show: false },
        //坐标轴线线的颜色
        axisLine: {
          show: false,
          // lineStyle: {
          //   color: "#0E3B57",
          //   type: "solid",
          //   width: 1,
          // },
        },
      },
    ],
    series: [
      {
        name: "用水量",
        type: "bar",
        barMaxWidth: 10,
        // barWidth: "60%",
        data: state.Xdata,
        barWidth: 8,
        barGap: 10,
        smooth: true,
        label: {
          normal: {
            show: true,
            position: "right",
            offset: [5, 0],
            textStyle: {
              color: "#F68300",
              fontSize: 10,
            },
          },
        },
        itemStyle: {
          emphasis: {
            barBorderRadius: 7,
          },
          //颜色渐变
          normal: {
            barBorderRadius: 7,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "#040C3B" },
              { offset: 0.5, color: "#6D3F46" },
              { offset: 1, color: "#E4765D" },
            ]),
          },
        },
      },
    ],
  };

  state.timeOut = setInterval(() => {
    if (option.dataZoom[0].endValue == state.Xdata.length) {
      option.dataZoom[0].endValue = 4;
      option.dataZoom[0].startValue = 0;
    } else {
      option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
      option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
    }
    chartInit.setOption(option, true);
  }, 2000);
};
onMounted(async () => {
  let param = {
    layerName: "by_qyyspm_view",
    isReturnGeometry: false,
    spatialRel: "INTERSECTS",
    isCache: false,
  };
  let res = await search(param);
  if (res?.data?.data?.features?.length > 0) {
    state.Xdata=res?.data?.data?.features.map(it=>Number(it.attributes.total).toFixed(2))
    state.Ydata=res?.data?.data?.features.map(it=>it.attributes.metername)
    initEchart();
  }
});
onUnmounted(() => {
  if (state.timeOut) {
    clearInterval(state.timeOut);
  }
});
</script>

<style scoped lang="scss">
.wrw {
  width: 100%;

 height:calc(32vh - 70px);
  /* border: 1px solid rgba(255, 152, 62, 0.8); */
}
</style>

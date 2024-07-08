<template>
  <div class="maptj">
    <div class="maptj1">
      <div class="mapsel">
        <Label class="lableName">2023年区县不同用水类型占比</Label>
        <el-select v-model="state.value" placeholder="请选择" @change="seletChange">
          <el-option
            v-for="item in state.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="mapEchart" id="echartRef" ref="echartRef"></div>
    </div>
    <div class="maptj2">
      <div class="mapsel">
        <Label class="lableName">2023年不同用水类型区县占比</Label>
        <el-select v-model="state.value1" placeholder="请选择" @change="seletChange1">
          <el-option
            v-for="item in state.options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="mapEchart" id="echartRef2" ref="echartRef2"></div>
    </div>
  </div>
</template>
<script setup>
import { inject, onMounted, reactive } from "vue";
import * as echarts from "echarts";
import markRaws from "@/common/tools/markRaws";
let chartInit = $ref(null);
let echartRef = $ref(null);
let chartInit1 = $ref(null);
let echartRef2 = $ref(null);
const state = reactive({
  options: [
    {
      value: "白银区",
      label: "白银区",
    },
    {
      value: "平川区",
      label: "平川区",
    },
    {
      value: "静宁县",
      label: "静宁县",
    },
    {
      value: "会宁县",
      label: "会宁县",
    },
    {
      value: "景泰县",
      label: "景泰县",
    },
  ],
  options1: [
    {
      value: "工业用水",
      label: "工业用水",
    },
    {
      value: "农业用水",
      label: "农业用水",
    },
    {
      value: "生态用水",
      label: "生态用水",
    },
  ],
  value: "白银区",
  value1: "工业用水",
});
onMounted(async () => {
  initEchart1();
  initEchart2();
});
const initEchart1 = () => {
  if (chartInit) {
    chartInit.dispose();
  }
  chartInit = markRaws(echarts.init(echartRef));
  let option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
      textStyle: {
        fontSize: 12,
        color: "#FFFFFF",
      },
    },
    series: [
      {
        name: "区域占比",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
             color: "#FFFFFF",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "工业用水" },
          { value: 735, name: "农业用水" },
          { value: 580, name: "生态用水" },
        ],
      },
    ],
  };
  chartInit.setOption(option, true);
};
const initEchart2 = () => {
  if (chartInit1) {
    chartInit1.dispose();
  }
  chartInit1 = markRaws(echarts.init(echartRef2));
  let option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
      textStyle: {
        fontSize: 12,
        color: "#FFFFFF",
      },
    },
    series: [
      {
        name: "用水类型占比",
        type: "pie",
        //radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
          color: "#FFFFFF",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
            color: "#FFFFFF",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "白银区" },
          { value: 735, name: "平川区" },
          { value: 580, name: "靖远县" },
          { value: 484, name: "会宁县" },
          { value: 300, name: "景泰县" },
        ],
      },
    ],
  };
  chartInit1.setOption(option, true);
};
const seletChange=()=>{
initEchart1()
}
const seletChange1=()=>{
initEchart2()
}
</script>
<style>
.maptj {
  width: 360px;
  height: 620px;
  position: absolute;
  top: 90px;
  left: 20px;
  z-index: 1000;
  background: rgba(94, 134, 213, 0.1);
  border: 1px rgba(94, 134, 213, 0.1) solid;
}
.maptj1 {
  width: 100%;
  height: 310px;
}
.mapsel {
  width: 100%;
  height: 35px;
  padding-top: 5px;
  background-image: url("@/assets/image/tuliBg.png");
  font-size: 13px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
}
.lableName {
  padding: 30px;
  color: #bfd4ff;
}
.mapEchart {
  width: 100%;
  height: 270px;
  background: #0a0f20;
}
.el-select {
  display: inline-block;
  position: relative;
  line-height: 32px;
  width: 105px;
}
</style>

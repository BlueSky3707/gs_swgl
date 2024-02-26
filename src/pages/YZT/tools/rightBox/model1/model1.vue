<template>
  <div class="max">
    <el-scrollbar max-height="75vh">
      <!-- 顶部 -->
      <div class="top">
        <el-date-picker
            v-model="data0.time"
            style="width: 200px"
            size="small"
            :clearable="false"
            type="monthrange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY-MM"
            value-format="YYYY-MM"
        />
        <el-button style="width: 64px" size="small" type="primary">月报</el-button>
      </div>
      <div class="cards1">
        <div class="cards1_left flex1">
          <div class="rows1">
            <div class="span1">综合平均指数</div>
            <div class="span2">3.22</div>
            <div class="span3">同比</div>
            <div class="span4">7.82%</div>
          </div>
          <div class="rows1">
            <div class="span1">AQI平均指数</div>
            <div class="span2">28</div>
            <div class="span3">同比</div>
            <div class="span5">7.82%</div>
          </div>
        </div>
        <div class="cards1_right flex1">
          <div class="rows2" style="color: #666666;font-size: 14px">
            首要污染物
          </div>
          <div class="rows2" style="color: #3E7FDE;font-size: 14px">
            <span style="margin-right: 12px">O3</span>
            <span>PM2.5</span>
          </div>
        </div>
      </div>

      <!-- 空气质量类别统计（天） -->
      <div class="title">空气质量类别统计（天）</div>
      <div class="cards2">
        <div class="cards2_top">
          <div class="cards2_box">
            <div ref="echartRef1" class="echarts1"></div>
            <div class="cards2_right">
              <div class="cards2_span1 afters">当前</div>
              <div class="cards2_span2 afters">目标</div>
              <div class="cards2_span3">8.2%</div>
              <div>同比</div>
            </div>
          </div>
          <div class="lines"></div>
          <div class="cards2_box">
            <div ref="echartRef2" class="echarts2"></div>
            <div class="cards2_right">
              <div class="cards2_span4 afters">当前</div>
              <div class="cards2_span5 afters">目标</div>
              <div class="cards2_span6">8.2%</div>
              <div>同比</div>
            </div>
          </div>
        </div>
        <div class="cards2_bottom">
          <div>优良天数</div>
          <div>重度以上污染天数</div>
        </div>
      </div>

      <!-- 空气质量综合指数排名 -->
      <div class="title">空气质量综合指数排名</div>
      <div class="cards3">
        <el-scrollbar max-height="120px">
          <div class="rows3" v-for="(item,index) in data3.satate" :key="index">
            <div style="text-align: center">{{index + 1}}</div>
            <div style="text-align: center">{{item.name}}</div>
            <div>
              <el-progress :percentage="item.jdt"></el-progress>
            </div>
            <div style="text-align: center;color: #4E84FF;font-size: 16px">
              {{item.value}}
            </div>
          </div>
        </el-scrollbar>
      </div>

      <!-- 空气质量指数一周趋势预警 -->
      <div class="title">空气质量指数一周趋势预警</div>
      <div class="cards4" ref="echartRef4"></div>

    </el-scrollbar>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import * as echart from 'echarts'
import markRaws from '@/common/tools/markRaws';
import * as echarts from "echarts";

let chartInit1 = $ref(null)
let echartRef1 = $ref(null)

let chartInit2 = $ref(null)
let echartRef2 = $ref(null)

let chartInit4 = $ref(null)
let echartRef4 = $ref(null)

// 顶部搜索
const data0 = reactive({
  time: ''
})

// 空气质量类别统计（天）
const data1 = reactive({
  value3: 440,
  state: [
    {
      name: '当前',
      value: 20,
    },
    {
      name: '目标',
      value: 220,
    },
  ]
})
const initEchart1 = ()=>{
  if (chartInit1) {
    chartInit1.dispose()
  }
  chartInit1 = markRaws(echarts.init(echartRef1));

  const option = {
    grid: {
      left: '0%',
      right: '6%',
      bottom: '0%',
      top:'18%',
      containLabel: true
    },
    xAxis: [
      {
        show:false,
        data: ['Sun']
      },
    ],
    yAxis: {
      show:false
    },
    series: [
      {
        type: 'bar',
        barWidth:40,
        stack: "zs",
        label: {
          show: true,
          color: '#000000',
          fontSize: 15,
        },
        itemStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            type: "linear",
            global: false,
            colorStops: [
              {
                offset: 0,
                color: '#4e84ff',
              },
              {
                offset: .5,
                color: '#4e84ff'
              },
              {
                offset: .5,
                color: '#1c5ce8'
              },
              {
                offset: 1,
                color: '#336ae1'
              }
            ],
          },
        },
        data:[data1.state[0].value]
      },
      {
        type: 'bar',
        stack: "zs",
        label: {
          show: true,
          color: '#000000',
          position: 'top',
          fontSize: 15,
          distance: 10,//距离头部的距离
        },
        itemStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            type: "linear",
            global: false,
            colorStops: [
              {
                offset: 0,
                color: '#4CFF98',
              },
              {
                offset: .5,
                color: '#4CFF98'
              },
              {
                offset: .5,
                color: '#3de084'
              },
              {
                offset: 1,
                color: '#2fd779'
              }
            ],
          },
        },
        data:[data1.state[0].value]
      },
      {
        "name": "",
        "type": "pictorialBar",
        symbol: 'diamond',
        "symbolSize": [40, 20],
        "symbolOffset": [-0, 10],
        "z": 3,
        itemStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            type: "linear",
            global: false,
            colorStops: [
              {
                offset: 0,
                color: '#4e84ff',
              },
              {
                offset: .5,
                color: '#4e84ff'
              },
              {
                offset: .5,
                color: '#1c5ce8'
              },
              {
                offset: 1,
                color: '#336ae1'
              }
            ],
          },
        },
        "data": [1]
      },
      {
        "name": "",
        "type": "pictorialBar",
        symbol:'diamond',
        "symbolSize": [40, 20],
        "symbolOffset": [-0, -10],
        symbolPosition: "end",
        "z": 12,
        itemStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            type: "linear",
            global: false,
            colorStops: [
              {
                offset: 0,
                color: '#4CFF98',
              },
              {
                offset: .5,
                color: '#4CFF98'
              },
              {
                offset: .5,
                color: '#3de084'
              },
              {
                offset: 1,
                color: '#2fd779'
              }
            ],
          },
        },
        data:[data1.state[0].value]
      },
      {
        "name": "",
        "type": "pictorialBar",
        symbol: 'diamond',
        symbolPosition: 'end',
        "symbolSize": [40, 20],
        "symbolOffset": [-0, -10],
        "z": 20,
        itemStyle:{
          opacity: 1,
          color:'#07e063',
        },
        "data": [data1.state[0].value * 2]
      },
    ]
  };

  chartInit1.setOption(option,true);
}

const data2 = reactive({
  value3: 440,
  state: [
    {
      name: '当前',
      value: 20,
    },
    {
      name: '目标',
      value: 220,
    },
  ]
})
const initEchart2 = ()=>{
  if (chartInit2) {
    chartInit2.dispose()
  }
  chartInit2 = markRaws(echarts.init(echartRef2));

  const option = {
    grid: {
      left: '0%',
      right: '6%',
      bottom: '0%',
      top:'18%',
      containLabel: true
    },
    xAxis: [
      {
        show:false,
        data: ['Sun']
      },
    ],
    yAxis: {
      show:false
    },
    series: [
      {
        type: 'bar',
        barWidth:40,
        stack: "zs",
        label: {
          show: true,
          color: '#000000',
          fontSize: 15,
        },
        itemStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            type: "linear",
            global: false,
            colorStops: [
              {
                offset: 0,
                color: '#fc3535',
              },
              {
                offset: .5,
                color: '#fc3535'
              },
              {
                offset: .5,
                color: '#d32222'
              },
              {
                offset: 1,
                color: '#a90f0f'
              }
            ],
          },
        },
        data:[data2.state[0].value]
      },
      {
        type: 'bar',
        stack: "zs",
        label: {
          show: true,
          color: '#000000',
          position: 'top',
          fontSize: 15,
          distance: 10,//距离头部的距离
        },
        itemStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            type: "linear",
            global: false,
            colorStops: [
              {
                offset: 0,
                color: '#ffb43e',
              },
              {
                offset: .5,
                color: '#ffb43e'
              },
              {
                offset: .5,
                color: '#ce8c25'
              },
              {
                offset: 1,
                color: '#b77611'
              }
            ],
          },
        },
        data:[data2.state[0].value]
      },
      {
        "name": "",
        "type": "pictorialBar",
        symbol: 'diamond',
        "symbolSize": [40, 20],
        "symbolOffset": [-0, 10],
        "z": 3,
        itemStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            type: "linear",
            global: false,
            colorStops: [
              {
                offset: 0,
                color: '#fc3535',
              },
              {
                offset: .5,
                color: '#fc3535'
              },
              {
                offset: .5,
                color: '#d32222'
              },
              {
                offset: 1,
                color: '#a90f0f'
              }
            ],
          },
        },
        "data": [1]
      },
      {
        "name": "",
        "type": "pictorialBar",
        symbol:'diamond',
        "symbolSize": [40, 20],
        "symbolOffset": [-0, -10],
        symbolPosition: "end",
        "z": 12,
        itemStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            type: "linear",
            global: false,
            colorStops: [
              {
                offset: 0,
                color: '#ffb43e',
              },
              {
                offset: .5,
                color: '#ffb43e'
              },
              {
                offset: .5,
                color: '#ce8c25'
              },
              {
                offset: 1,
                color: '#b77611'
              }
            ],
          },
        },
        data:[data2.state[0].value]
      },
      {
        "name": "",
        "type": "pictorialBar",
        symbol: 'diamond',
        symbolPosition: 'end',
        "symbolSize": [40, 20],
        "symbolOffset": [-0, -10],
        "z": 20,
        itemStyle:{
          opacity: 1,
          color:'#ce8c25',
        },
        "data": [data2.state[0].value * 2]
      },
    ]
  };

  chartInit2.setOption(option,true);
}

// 空气质量综合指数排名
const data3 = reactive({
  satate: [
    {name: '西安', value: 3.05, jdt: 50},
    {name: '渭南', value: 3.05, jdt: 60},
    {name: '宝鸡', value: 3.05, jdt: 50},
    {name: '咸阳', value: 3.05, jdt: 60},
    {name: '延安', value: 3.05, jdt: 50},
    {name: '榆林', value: 3.05, jdt: 70},
    {name: '商洛', value: 3.05, jdt: 60},
    {name: '安康', value: 3.05, jdt: 40},
    {name: '西咸新区', value: 3.05, jdt: 50},
  ]
})

// 空气质量指数一周趋势预警
const data4 = reactive({
  state: [
    { name: '7-25', value1: 120, value2:　220 },
    { name: '7-26', value1: 132, value2:　182 },
    { name: '7-27', value1: 101, value2:　191 },
    { name: '7-28', value1: 134, value2:　234 },
    { name: '7-29', value1: 90, value2:　290 },
    { name: '7-30', value1: 230, value2:　330 },
    { name: '7-31', value1: 210, value2:　310 },
  ]
})
const initEchart4 = ()=>{
  if (chartInit4) {
    chartInit4.dispose()
  }
  chartInit4 = markRaws(echarts.init(echartRef4));

  const option = {
    dataset: {
      dimensions: ['name', 'value1', 'value2'],
      source: data4.state
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['AQI实测', 'AQI预测']
    },
    grid: {
      top: '20%',
      left: '2%',
      right: '5%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'AQI实测',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: 'rgba(62, 184, 230, 0.2)',
            },
            {
              offset: 1,
              color: 'rgb(65,206,255)',
            },
          ]),
        }
      },
      {
        name: 'AQI预测',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: 'rgba(206, 125, 236, 0.2)',
            },
            {
              offset: 1,
              color: 'rgba(206, 125, 236, 1)',
            },
          ]),
        }
      }
    ]
  }

  chartInit4.setOption(option,true);
}

onMounted(()=>{
  initEchart1()
  initEchart2()
  initEchart4()
})
</script>

<style scoped lang="scss">
.max{
  width: 400px;

  .top{
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 7px;
    box-sizing: border-box;
  }

  .title{
    width: 100%;
    color: #333333;
    font-size: 16px;
    padding: 16px 0px 10px 12px;
    box-sizing: border-box;
  }

  .cards1{
    width: 100%;
    height: 80px;
    display: grid;
    grid-template-columns: 254px 1fr;
    grid-column-gap: 8px;

    .flex1{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }

    .cards1_left{
      background-color: #FFFFFF;
      padding: 12px 0px;
      box-sizing: border-box;

      .rows1{
        width: 100%;
        display: grid;
        align-items: center;
        grid-template-columns: 2.8fr 1.5fr 1fr 2fr;
        padding: 0px 14px;
        box-sizing: border-box;
      }

      .span1{
        color: #666666;
        font-size: 13px;
      }
      .span2{
        color: #3E7FDE;
        font-size: 16px;
      }
      .span3{
        color: #666666;
        font-size: 12px;
      }
      .span4{
        color: #33CE4D;
        font-size: 16px;
      }
      .span5{
        color: #F75604;
        font-size: 16px;
      }
    }

    .cards1_right{
      background-color: #FFFFFF;
      display: flex;
      align-items: center;
      padding: 12px 0px;
      box-sizing: border-box;

      .rows2{
        width: 100%;
        text-align: center;
      }
    }
  }

  .cards2{
    width: 100%;
    height: 177px;
    background-color: #FFFFFF;

    .cards2_top{
      width: 100%;
      height: 149px;
      display: grid;
      grid-template-columns: 1fr 1px 1fr;

      .lines{
        height: 103px;
        margin-top: 37px;
        background-color: #dcdde2;
      }

      .cards2_box{
        display: grid;
        grid-template-columns: 1.5fr 1fr;

        .echarts1{
          width: 100%;
          height: 100%;
        }
      }

      .cards2_right{
        div{
          width: 100%;
          color: #666666;
          font-size: 13px;
        }

        .afters{
          padding-left: 15px;
          box-sizing: border-box;
          position: relative;
          z-index: 1;

          &:after{
            content: '';
            width: 10px;
            height: 10px;
            border-radius: 2px;
            background-color: #000000;
            position: absolute;
            top: 4px;
            left: 0px;
            z-index: 0;
          }
        }

        .cards2_span1{
          margin-top: 39px;

          &:after{
            background-color: #4CFF98;
          }
        }

        .cards2_span2{
          margin-top: 9px;

          &:after{
            background-color: #3D58FF;
          }
        }

        .cards2_span3{
          margin-top: 16px;
          color: #21F5FF;
          font-size: 16px
        }

        .cards2_span4{
          margin-top: 39px;

          &:after{
            background-color: #FFB43E;
          }
        }

        .cards2_span5{
          margin-top: 9px;

          &:after{
            background-color: #FC3535;
          }
        }

        .cards2_span6{
          margin-top: 16px;
          color: #F75604;
          font-size: 16px
        }
      }
    }

    .cards2_bottom{
      width: 100%;
      height: 28px;
      display: grid;
      align-items: center;
      grid-template-columns: 1fr 1.5fr;

      div{
        color: #333333;
        font-size: 14px;
        text-align: center;
      }
    }
  }

  .cards3{
    width: 100%;
    height: 150px;
    padding: 15px 15px;
    box-sizing: border-box;
    background-color: #FFFFFF;

    .rows3{
      width: 100%;
      height: 20px;
      font-size: 14px;
      margin-bottom: 7px;
      display: grid;
      align-items: center;
      grid-template-columns: 20px 1fr  230px 60px;
    }
  }

  .cards4{
    width: 100%;
    height: 180px;
    padding: 10px 0px;
    background-color: #FFFFFF;
  }
}
:deep( .el-progress__text ){
  display: none;
}
</style>

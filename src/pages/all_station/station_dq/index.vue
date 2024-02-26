<template>
  <Box v-show="!$store.state.layerInf2" :title="`${attributes.area ||'暂无信息'} - ${attributes.positionname} - ${type[attributes.type] ||'暂无信息'}`" @close="clickClose">
    <div class="zd">
      <div class="zd_top">
        <el-row>
          <el-col :span="14">
            <div class="echarts" ref="echartRef"></div>
          </el-col>
          <el-col :span="10">
            <div class="sywrw">
              <div>首要污染物</div>
              <div>{{ attributes.primarypollutant }}</div>
            </div>
          </el-col>
        </el-row>
        <img class="api" :src="getSrc(`dq/${getApiAttrs(apiValue).name}.png`)"/>
      </div>
      <div class="zd_wrw">
        <el-row :gutter="10">
          <template v-for="(item,index) in polluteList" :key="index">
            <el-col :span="12" style="margin-bottom: 15px">
              <!-- 进度条 指数 -->
              <div class="jdtTitle">
                <span class="span1">{{ item.name }}</span>
                <span class="span2"></span>
                <span :class="item.active ? 'span4' : 'span3'">{{ item.value }}</span>
              </div>
              <div class="backwh" :class="item.active  ? 'backcolor2' : 'backcolor1'">
                <div class="jdtwh" :class="item.active ? 'jdtcolor2' : 'jdtcolor1'"></div>
              </div>
            </el-col>
          </template>
        </el-row>
      </div>
      <div class="grid_bot">
        <span>数据更新时间：</span>
        <span style="font-weight: 500">{{timepoint}}</span>
      </div>
      <div class="btn_grid">
        <el-button style="width: 128px;margin: 0 auto" @click="changeModelType(0)">基本信息</el-button>
        <el-button style="width: 128px;margin: 0 auto" @click="changeModelType(1)">历史监测数据</el-button>
        <el-button style="width: 128px;margin: 0 auto" @click="changeModelType(2)">AQI日历</el-button>
        <el-button style="width: 128px;margin: 0 auto" @click="changeModelType(3)">周围污染源</el-button>
      </div>
    </div>
  </Box>

  <component v-show="!$store.state.layerInf2" :is="navList[modelType]" @close="changeModelType(-1)"></component>

  <!-- <station_wry2 v-if="$store.state.layerInf2" :key="$store.state.layerInf2"></station_wry2> -->
</template>

<script setup>
import {inject, nextTick, onMounted, onUnmounted, watch} from 'vue'
import JBXX from './model/JBXX'
// import LSJC from './model/LSJC'

// import ZWWRY from './model/ZWWRY'
// import station_wry2 from '../station_wry2'
import {reMoveLayers} from "@/GIS/mapUtils/layersManger";
import * as echarts from "echarts"
import dayjs from "dayjs"
const type = {
  0:' 国控',
  1:'省控',
  2:'市控',
  9:'微站',
}

const navList = [JBXX]//, LSJC, AQI, ZWWRY
const emit = defineEmits(['close'])
const attributes = inject('attributes')
let timepoint = $ref(dayjs(attributes.timepoint).format('YYYY-MM-DD HH:mm:ss'))
// 点击按钮类型
let modelType = $ref(-1)
let showWry = $ref(false)


// 修改展示信息
const changeModelType = (index) => {
  modelType = index
}
let echartRef = $ref(null)
let echartInit = $ref(null)
let loading = $ref(true)
let polluteList = $ref({})
//api 日均值
let apiValue = $ref(isNaN(Number(attributes.aqi)) ? 0 : Number(attributes.aqi || 0).toFixed(0))
// api 计算所属颜色，api装填
const getApiAttrs = (value) => {
  if(value <= 0){
    return {
      name:'优',
      color:'rgba(82, 198, 50, 1)'
    }
  }
  let apiList = [
      'rgba(82, 198, 50, 1)','rgba(251, 208, 43, 1)','rgba(254, 138, 3, 1)',
      'rgba(254, 0, 0, 1)','rgba(206, 2, 3, 1)','rgba(206, 2, 3, 1)',
  ]
  let apiIndex = (value % 50) ? Math.floor(value / 50) : Math.floor(value / 50) - 1
  return {
    name:['优','良','轻','中','重','重'][apiIndex] || '严',
    color:apiList[apiIndex] || 'rgba(153, 6, 86, 1)'
  }
}
const initEchart = () => {
  echartInit = echarts.init(echartRef)
  let {name, color} = getApiAttrs(apiValue)
  const option = {
    grid: {
      top: '2%',
      left: '2%',
      right: '2%',
      bottom: '2%',
      containLabel: true
    },
    title: {
      text: '{a|' + apiValue + '}\n{c|日均值AQI}',
      x: 'center',
      y: 'center',
      textStyle: {
        rich: {
          a: {
            fontSize: 26,
            color: color,
            padding: 5,
          },

          c: {
            fontSize: 13,
            color: '#666666',
            padding: 5,
          },
        },
      },
    },

    series: [
      {
        type: 'pie',
        radius: ['90%', '100%'],
        silent: true,
        clockwise: true,
        label: {
          position: 'center',
        },
        data: [
          {
            value: apiValue,
            name: '',
            itemStyle: {
              color: color
            }
          },
          {
            value: 180 - apiValue,
            name: '',
            label: {
              show: false,
            },
            itemStyle: {
              color: 'RGBA(221, 225, 230, 1)'
            },
          },
        ],
      },
    ],
  }
  echartInit.setOption(option)
}
//超标值计算
const getIsChao = (attributes) => {
  let temps = {
    'pm10':"PM₁₀",
    'pm25':"PM₂.₅",
    'so2':"SO₂",
    'no2':"NO₂",
    'co':"CO",
    'o3':"O₃",
  }
  let temp = {
    'pm10': {value: 70, active: false},
    'pm25': {value: 35, active: false},
    'so2': {value: 60, active: false},
    'no2': {value: 40, active: false},
    'co': {value: 4, active: false},
    'o3': {value: 160, active: false}
  }
  for (const tempKey in temp) {
    if (attributes[tempKey] > temp[tempKey].value) {
      temp[tempKey].active = true
    }
    temp[tempKey].value = attributes[tempKey]
    temp[tempKey].name = temps[tempKey]
  }
  return temp
}
onMounted(() => {
  polluteList = getIsChao(attributes)
  nextTick(() => {
    initEchart()
  })
})
onUnmounted(() => {
  if (echartInit) {
    echartInit.dispose()
  }
})
const clickClose = () => {
  emit('close')
  reMoveLayers(["sx_qwryid_buffer", "buffmian"]);
}
</script>

<style scoped lang="scss">
.zd {
  width: 300px;
  padding: 12px;

  .zd_top {
    margin-bottom: 20px;
    position: relative;

    .echarts {
      width: 170px;
      height: 120px;
    }

    .api {
      width: 36px;
      height: 18px;
      position: absolute;
      left: 65%;
      top: 0px;
    }

    .sywrw {
      margin-top: 15px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #2173E9;

      div:nth-child(2) {
        margin-top: 18px;
        color: #333333;
      }
    }
  }

  .zd_wrw {
    height: 150px;

    .jdtTitle {
      width: 95%;
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 400;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .span1 {
        color: #3483f1;
      }

      .span2 {
        font-size: 10px;
        color: #adacac
      }

      .span3 {
        color: #000000;
      }

      .span4 {
        color: rgb(255, 153, 53);
      }
    }

    .backwh {
      width: 140px;
      height: 6px;
      border-radius: 4px;

      .jdtwh {
        height: 6px;
        border-radius: 4px;
      }
    }

    .backcolor1 {
      background: rgba(113, 147, 227, 0.2);

      .jdtcolor1 {
        width: 90px;
        background: linear-gradient(to left, rgba(39, 105, 255, 1), rgba(39, 105, 255, 0.1));
      }
    }

    .backcolor2 {
      background: rgba(246, 152, 60, 0.2);

      .jdtcolor2 {
        width: 110px;
        background: linear-gradient(to left, rgba(255, 153, 53, 1), rgba(255, 153, 53, 0.1));
      }
    }
  }
  .btn_grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 12px;
    align-items: center;
  }
  .grid_bot{
    font-size: 14px;
    text-align: right;
    color: #333333;
    padding-bottom: 10px;
  }
}
</style>

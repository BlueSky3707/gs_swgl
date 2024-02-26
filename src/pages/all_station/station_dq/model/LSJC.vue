<template>
  <Box class="box" title="历史监测数据" @close="emit('close')">
    <div class="main">
      <!-- 顶部搜索 -->
      <el-row style="margin-bottom: 10px">
        <el-col :span="5">
          <span>监测项目：</span>
          <el-select v-model="state.monitorItem" style="width: 90px" class="m-2">
            <el-option key="PM2_5" label="PM₂.₅" value="PM2_5"></el-option>
            <el-option key="PM10" label="PM₁₀" value="PM10"></el-option>
            <el-option key="SO2" label="SO₂" value="SO2"></el-option>
            <el-option key="NO2" label="NO₂" value="NO2"></el-option>
            <el-option key="CO" label="CO" value="CO"></el-option>
            <el-option key="O3" label="O₃" value="O3"></el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          <span>监测时间：</span>
          <el-date-picker v-if="state.searchType=='HOUR'" style="width: 220px"
                          type="datetimerange"
                          format="YYYY-MM-DD HH:mm:ss"
                          value-format="YYYY-MM-DD HH:mm:ss"
                          v-model="state.time"></el-date-picker>
          <el-date-picker v-else style="width: 220px"
                          type="daterange"
                          format="YYYY-MM-DD"
                          value-format="YYYY-MM-DD"
                          v-model="state.time"></el-date-picker>
        </el-col>
        <el-col :span="4">
          <el-select v-model="state.searchType" @change="timeformate()" style="width: 120px">
            <el-option key="HOUR" label="小时数据" value="HOUR"></el-option>
            <el-option key="DAY" label="日数据" value="DAY"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" style="width: 90px" @click="initEchart()">查询</el-button>
          <el-button @click="initEchart()">
            <el-icon style="vertical-align: middle;">
              <refreshRight/>
            </el-icon>
          </el-button>
        </el-col>
      </el-row>
      <!-- 图表、列表切换 -->
      <div class="switch">
        <div :class="cur?'active':'item'" @click="cur = true">
          <img :src="cur?icon2:icon4" style="width: 14px;height: 14px"/>
        </div>
        <div :class="!cur?'active':'item'" @click="cur = false">
          <img :src="!cur?icon3:icon1" style="width: 14px;height: 14px"/>
        </div>
      </div>
      <div class="con" v-loading="state.loading">
        <!-- 图表 -->
        <div v-show="cur">
          <div id="echartRef" class="echart"></div>
        </div>
        <!-- 列表 -->
        <div v-show="!cur" class="list">
          <div class="titles">{{ `当前项目标准值上限：${state.temp[state.monitorItem].value}` }}</div>
          <div class="tables">
            <div class="table">
              <div class="table-header">
                <div class="tr">序号</div>
                <div class="tr">检测时间</div>
                <div class="tr">检测浓度</div>
                <div class="tr">超标倍数</div>
                <div class="tr">数据状态</div>
              </div>
              <el-scrollbar max-height="330px">
                <div class="table-body" v-for="(item,index) in state.List" :key="index">
                  <div class="tr">{{ index + 1 }}</div>
                  <div class="tr">{{
                      state.searchType == 'HOUR' ? item.date : dayjs(item.date).format('YYYY-MM-DD')
                    }}
                  </div>
                  <div class="tr" :style="item.zhuangtai=='超标'?'color:#F77F07':''">
                    {{ item.value }}
                  </div>
                  <div class="tr" :style="item.zhuangtai=='超标'?'color:#F77F07':''">
                    {{ item.chaobiao }}
                  </div>
                  <div class="tr" :style="item.zhuangtai=='超标'?'background:#F77F07':''">
                    {{ item.zhuangtai }}
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Box>
</template>

<script setup>
import {RefreshRight} from "@element-plus/icons"
import {inject, nextTick,markRaw, onMounted, onUnmounted, reactive, watch, getCurrentInstance} from "vue";
import dayjs from "dayjs";
import * as echarts from "echarts";
import {getStationAqiHistory} from "../../../KQ/server";
import icon1 from '@/assets/dq/qwry/icon1.png'
import icon2 from '@/assets/dq/qwry/icon2.png'
import icon3 from '@/assets/dq/qwry/icon3.png'
import icon4 from '@/assets/dq/qwry/icon4.png'

console.log(getStationAqiHistory);
const emit = defineEmits(['close'])
const state = reactive({
  monitorItem: 'PM2_5',
  searchType: 'HOUR',
  loading: false,
  List: [],
  temp: {
    'PM10': {value: 70, active: false},
    'PM2_5': {value: 35, active: false},
    'SO2': {value: 60, active: false},
    'NO2': {value: 40, active: false},
    'CO': {value: 4, active: false},
    'O3': {value: 160, active: false}
  },
  time: [],
})
let cur = $ref(true)
const attributes = inject('attributes')
console.log(attributes);
const global = getCurrentInstance().appContext.config.globalProperties

onMounted(() => {
  timeformate()
  initEchart()
})

const timeformate = () => {
  if (state.searchType == 'HOUR') {
    state.time = [dayjs().subtract(1, 'day').format('YYYY-MM-DD 00:00:00'), dayjs().format('YYYY-MM-DD HH:mm:ss')]
  } else {
    state.time = [dayjs().subtract(1, 'week').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]
  }
}
onUnmounted(() => {
  if (chartInit) {
    chartInit.dispose()
  }
})
let chartInit = $ref(null)
let echartRef = $ref(null)

//历史监测数据
const initEchart = () => {
  state.loading = true
  let params = {
    type: attributes.type || attributes.ptype,
    stationCode: attributes.stationcode,
    areaCode: attributes.unifiedcode_p,
    startDate: state.time[0],
    endDate: state.time[1],
    monitorItem: state.monitorItem,
    searchType: state.searchType
  }
  getStationAqiHistory(params).then(res => {
    state.List = res.data
    setTimeout(() => {
      state.loading = false
    }, 500)
    let Xdata = []
    let Ydata1 = []
    Xdata = state.searchType == 'HOUR' ? res.data.map(res => res.date) : res.data.map(res => dayjs(res.date).format('YYYY-MM-DD'))
    Ydata1 = res.data.map(res => res.value)
    chartInit = markRaw(echarts.init(document.getElementById('echartRef')))
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      grid: {
        containLabel: true,
        left: '2%',
        top: '15%',
        right: '2%',
        bottom: '2%'
      },
      xAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        data: Xdata
      },
      yAxis: {
        name: `当前项目标准值上限：${state.temp[state.monitorItem].value}`,
        nameTextStyle: {
          padding: [0, -180, 10, 0]
        },
        axisLabel: {
          color: ' #666666',
          fontsize: 14
        }
      },
      series: [
        {
          type: 'line',
          data: Ydata1,
          color: global.setColor_DQ_Wrw(state.monitorItem),
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: global.setColor_DQ_Wrw(state.monitorItem)
              },
              {
                offset: 1,
                color: global.setColor_DQ_Wrw(state.monitorItem, 11)
              }
            ]),
          }
        },
      ]
    }
    chartInit.setOption(option)
  })
}
</script>

<style scoped lang="scss">
.box {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .main {
    width: 1040px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #666666;
    padding: 15px 12px;
    position: relative;
    box-sizing: border-box;

    .switch {
      display: flex;
      align-items: center;
      width: 48px;
      height: 24px;
      background: rgba(255, 255, 255, 0.39);
      border: 1px solid #C1CEDF;
      box-sizing: border-box;
      opacity: 1;
      border-radius: 2px;
      position: absolute;
      right: 28px;
      top: 60px;
      z-index: 99;

      &:hover {
        cursor: pointer;
      }

      .item {
        width: 24px;
        height: 24px;
        line-height: 27px;
        text-align: center;
      }

      .active {
        width: 24px;
        height: 24px;
        line-height: 27px;
        text-align: center;
        background: rgba(58, 131, 239, 1);
      }
    }

    .echart {
      width: 100%;
      height: 400px;
    }

    .list {
      width: 100%;
      height: 400px;

      .titles {
        width: 100%;
        height: 30px;
        line-height: 30px;
      }

      .tables {
        width: 100%;

        .table {
          width: 100%;
          font-size: 14px;
          font-weight: 400;

          .table-header,
          .table-body {
            width: 100%;
            line-height: 33px;
            font-size: 14px;
            display: grid;
            grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr;
            align-items: center;
            text-align: center;

          }

          .table-header {
            color: #3e8bec;
            background-color: #ebf0fc;
          }

          .table-body {
            color: #000000;
            border-bottom: 1px #efefef solid;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            height: 32px;

            .tr:nth-child(1) {
              color: #333333;
            }

            .tr:nth-child(2) {
              color: #666666;
            }

            .tr:nth-child(3) {
              color: #333333;
            }

            .tr:nth-child(4) {
              color: #666666;
            }

            .tr:nth-child(5) {
              background: rgba(145, 210, 102, 1);
              opacity: 1;
              border-radius: 50px;
              margin: 0 auto;
              font-size: 12px;
              width: 48px;
              height: 18px;
              line-height: 18px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #FFFFFF;
            }
          }
        }
      }
    }
  }
}
</style>

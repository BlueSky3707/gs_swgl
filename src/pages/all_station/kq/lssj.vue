<template>
  <Box2 title="历史数据" @back="$emit('close')">
    <div class="selectbox">
      <el-form style="height: 32px">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="监测项目：">
              <el-select v-model="state.wrw" size="small" placeholder="请选择">
                <el-option
                    v-for="item in state.jclist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="监测时间：">
              <el-date-picker
                  v-model="state.Time"
                  type="daterange"
                  size="small"
                  range-separator="—"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <div class="chaxun" @click="init" >查询</div>
          </el-col>
          <el-col :span="1">
            <div class="shuaxin" @click="chongzhi">
              <img src="@/assets/water/chongzhi.png"/>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="menutop">
      <div>
        当前项目标准值上限：<span style="margin-left: 16px;color: #FF983E">36.5</span>
      </div>
      <div>
        当前项目单位：<span style="color: white;margin-left: 16px">mg/l</span>
      </div>
      <div class="tab">
        <div :class="[state.type==1?'active_tab':'item_tab','changebox']" @click="state.type = 1">
          <img v-if="state.type==1" src="@/assets/water/charticon1.png"/>
          <img v-else src="@/assets/water/charticon2.png"/>
        </div>
        <div :class="[state.type==2?'active_tab':'item_tab','changebox']" @click="state.type = 2">
          <img v-if="state.type==2" src="@/assets/water/tabicon1.png"/>
          <img v-else src="@/assets/water/tabicon2.png"/>
        </div>
      </div>
    </div>
    <div v-show="state.type==1" id="mychart" v-loading="state.loading" element-loading-background="rgba(0,0,0,0.4)"></div>
    <div v-show="state.type==2" class="tableType">
      <el-table v-loading="state.loading" element-loading-background="rgba(0,0,0,0.4)" :data="state.tableDataType.slice((state.pageNum -1)*state.pageSize,state.pageSize*state.pageNum)"
                stripe height="352">
        <el-table-column label="序号" type="index" width="70"/>
        <el-table-column label="监测时间" prop="MONITORTIME"/>
        <el-table-column label="监测浓度" prop="wrw"/>
<!--        <el-table-column label="超标倍数" prop="wrw"/>-->
<!--        <el-table-column label="数据状态" prop="wrw"/>-->
      </el-table>
      <div class="pagin">
        <div>
          <span>最新上报时间     {{state.tableDataType.length>0 && state.tableDataType[0].MONITORTIME}}</span>
          <el-icon @click="init()" style="transform: translateY(3px);margin-left: 8px;cursor: pointer" :size="20" color="#8BB5FF">
            <RefreshRight />
          </el-icon>
        </div>
        <el-pagination :total="state.tableDataType.length"
                       :page-size="state.pageSize"
                       :current-page="state.pageNum"
                       @current-change="currentChange"
                       @size-change="sizeChange"
        />
      </div>
    </div>
  </Box2>
</template>

<script setup>
import {onUnmounted, onMounted, reactive, inject, ref, markRaw} from "vue";
import * as echarts from "echarts"
// import {kqzdzListNew} from "./server"
import dayjs from "dayjs"
import {RefreshRight} from "@element-plus/icons-vue"
const attributes = inject('attributes');
console.log(attributes);
let myChart1 = $ref(null)
const state = reactive({
  wrw: 'A34004',
  type: 1,
  pageSize: 10,
  pageNum: 1,
  tableData:[],
  tableDataType:[],
  loading:false,
  Time:[dayjs().subtract(1,'week').format('YYYY-MM-DD'),dayjs().format('YYYY-MM-DD')],
  jclist: [
    {label: 'PM₂.₅', value: 'A34004'},
    {label: 'PM₁₀', value: 'A34002'},
    {label: 'CO', value: 'A21005'},
    {label: 'NO₂', value: 'A21004'},
    {label: 'SO₂', value: 'A21026'},
    {label: 'O₃', value: 'A05024'},
  ]
})
onUnmounted(() => {
  if (myChart1) {
    myChart1.dispose();
  }
});
const currentChange= (val)=>{
  state.pageNum= val
}
const sizeChange= (val)=>{
  state.pageSize= val
}
onMounted(() => {
  init()
});
const init = ()=>{
  let params=  {
    devid:'C8888880000007',
    startDate:dayjs(state.Time[0]).format('YYYY-MM-DD'),
    endDate:dayjs(state.Time[1]).format('YYYY-MM-DD'),
  }
  state.loading = true
  // kqzdzListNew(params).then(res =>{
  //   state.tableData =  res.data
  //   console.log(res.data.data)
  //   state.tableDataType =  res.data.data.map(e=>{
  //     return {
  //       wrw:e[state.wrw],
  //       MONITORTIME:e.SYSTIME
  //     }
  //   })
  //   state.loading = false
  //   initEchart()
  //   initTable()
  // })
}
const chongzhi =()=>{
  init()
}
const initEchart = () => {
  myChart1 = markRaw(echarts.init(document.getElementById('mychart')));
  // jclist
  let Xdata = []
  let Ydata = []
  Xdata = state.tableData.data.map(e=>e.SYSTIME)
  Ydata = state.tableData.data.map(e=>e[state.wrw])
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "#86909C", //显示竖线颜色
          type: "dashed",
        },
      },

      backgroundColor: "none", //tooltip背景色
      borderColor: "none", //tooltip边框颜色
      borderWidth: 0,
      extraCssText: 'box-shadow: none',
      formatter: function (param) {
        var text = "";
        text += `
                        <div
                        style="background: rgba(0, 0, 0, 0.6);
                            min-width: 100px;box-sizing: border-box;
                            padding-bottom: 7px;
                            border-bottom: 1px solid rgba(42, 253, 255, 0.5)">
                          <div style="border-top:1px solid rgba(42, 253, 255, 0.5);padding: 0 35px;opacity: 0.5;width: 100%;height: 24px;text-align: center;line-height: 24px;color: rgba(255, 255, 255, 1); background: linear-gradient(180deg, rgba(42,253,255,0.3) 0%, #2AFDFF 100%);">
                             ${param[0].axisValue}
                          </div>
                          <div  style="margin:7px 10px;color:#A1C7FF;margint-bottom:7px">
                            <span style="color:#A1C7FF;">${state.jclist.find(e => e.value == state.wrw).label}</span>
                            <span style="float:right;color:#FFFFFF;font-size:12px;">${param[0].data}</span>
                          </div>
                          <div style="border-radius: 5px 0px 5px 0px;width: 56px;line-height: 16px;font-size: 11px;margin-left: 22px; height: 16px;background: rgba(152, 238, 122, 0.2);color: #98EE7A;text-align: center">
                                数据正常
                          </div>
                       </div>`;
        return text;
      },
    },
    grid:{
      left:'5%',
      top:'5%',
      right:'5%',
      bottom:'5%',
      containLabel:true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: Xdata,
      axisLabel:{
        color:'#DBE7FF',
        fontSize:14
      },
      axisTick:false,
      axisLine:false,
    },
    yAxis: {
      type: 'value',
      axisLabel:{
        color:'#DBE7FF',
        fontSize:14
      },
      splitLine:{
        lineStyle:{
          color:'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    series: [
      {
        data: Ydata,
        type: 'line',
        smooth: true,
        symbolSize: 10,
        itemStyle: {
          color: '#2AFDFF',
          borderColor: '#2AFDFF',
          borderWidth: 2,
        },
        markLine: {
          data: [
            {
              name: '最高',
              yAxis: 1500,
            },

          ],
        },
        lineStyle: {
          normal: {
            width: 3,
            color: '#2AFDFF',
            shadowColor: '#2AFDFF',
            shadowBlur: 30,
            shadowOffsetY: 5
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [{
                  offset: 0,
                  color: "rgba(42, 253, 255, 0.5)"
                }, {
                  offset: 0.5,
                  color: "rgba(42, 253, 255, 0.25)"
                },{
                  offset: 0.9,
                  color: "rgba(42, 253, 255, 0.1)"
                }
                ],
                false
            ),
            shadowColor: "rgba(243,162,45, 0.1)",
            shadowBlur: 6
          }
        }
      }
    ]
  }
  myChart1.setOption(option);
}
const initTable = ()=>{}
</script>

<style scoped lang="scss">
.selectbox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 20px 0;
  padding: 0 12px;
  width: 800px;

  &:deep(.el-form-item__label) {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #A1C7FF;
    -webkit-background-clip: text;
  }

  &:deep(.el-input__wrapper) {
    border-radius: 0px;
    box-shadow: none;
    background: rgba(96, 153, 255, 0.2);
  }

  &:deep(.el-form-item__content) {
    margin-top: -6px;
  }

  .chaxun {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    text-align: center;
    line-height: 24px;
    color: #FFFFFF;
    -webkit-background-clip: text;
    width: 80px;
    height: 24px;
    background: linear-gradient(180deg, rgba(80, 143, 255, 0) 0%, rgba(80, 143, 255, 0.5) 100%);
    border-radius: 0px;
    border: 1px solid #40ACFF;
    cursor: pointer;
  }

  .shuaxin {
    width: 24px;
    height: 24px;
    box-sizing: border-box;
    padding: 3px;
    background-color: rgba(96, 153, 255, 0.2);

    img {
      width: 14px;
      height: 14px;
      margin-left: 2px;
      cursor: pointer;
    }
  }
}

.menutop {
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-between;
  color: #A1C7FF;
  box-sizing: border-box;
  padding: 4px 15px 4px 12px;
  background-color: rgba(96, 153, 255, 0.2);
  margin-bottom: 8px;
  .tab{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .changebox {
    width: 24px;
    height: 24px;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 14px;
      height: 14px;
    }
  }
  .active_tab{
    background: linear-gradient(180deg, rgba(80,143,255,0.2) 0%, #508FFF 100%);
  }
  .item_tab{
    background: rgba(96, 153, 255, 0.2);
    cursor: pointer;
  }
}
.tableType{
  &:deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf){
    border-bottom:none;
  }
  &:deep(.el-table th.el-table__cell.is-leaf){
    border-bottom:none;
    height: 32px !important;
    background: rgba(96, 153, 255, 0.15) !important;
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #6EFFF9;
    -webkit-background-clip: text;
  }
  &:deep(.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell) {
    background: rgba(96, 153, 255, 0.15) !important;
  }
  &:deep(.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell) {
    background: rgba(96, 153, 255, 0.25) !important;
  }


  &:deep(.el-pagination){
    height: 52px;
  }
  .pagin{
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #A1C7FF;
    -webkit-background-clip: text;
  }
}
#mychart {
  width: 100%;
  height: 410px;
}
</style>

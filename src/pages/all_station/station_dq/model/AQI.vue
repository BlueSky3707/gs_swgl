<template>
  <Box class="box"  title="AQI日历" @close="emit('close')">
      <div class="rl">
        <el-calendar  v-model="state.month">
          <template #header="{ date }">
            <el-date-picker v-model="state.month" type="month"/>
          </template>
          <template #dateCell="{ data }">
            <div v-html="getAqi(data)"></div>
          </template>
        </el-calendar>
      </div>
  </Box>
</template>

<script setup>
import dayjs from "dayjs"
const emit = defineEmits(['close'])
import {inject, onBeforeMount, onMounted, reactive, watch} from "vue";
import {getStationAqiCalendar} from "../../../KQ/server";


const attributes = inject('attributes')

const state = reactive({
  month: dayjs().format('YYYY-MM'),
  list: [],
})
onBeforeMount(()=>{
  StationAqiCalendar()
})

const StationAqiCalendar = ()=>{
  let params  = {
    date:dayjs(state.month).format('YYYY-MM'),
    areaCode:attributes.unifiedcode_p,
    stationCode:attributes.stationcode,
    type:attributes.type
  }
   getStationAqiCalendar(params).then(res=>{
    state.list = res.data.map(e=>{
      e.date =e.date.split(' ')[0]
      return e
    })
   })
}

watch(()=>state.month,(e,d)=>{
  let n = dayjs(e).format('YYYY-MM-DD')
  let o = dayjs(d).format('YYYY-MM-DD')
  if(n != o){
    StationAqiCalendar()
  }
})

const getAqi = $computed(()=>{
  return (data)=>{
    // 找到data日 对应得对象
    const find = state.list.find(item => item.date == data.day)
    // 格式化时间
    const time = dayjs(data.day).format('D')
    // 对应颜色
    const className = find ? ('aqi aqi' + find.aqi_dj) : 'aqi'
    return `<div class="${className}">${time}</div>`
  }
})
</script>

<style scoped lang="scss">
.box{
  top: 525px;
}
.rl{
  width: 325px;
  &:deep(.el-calendar){
    --el-calendar-border: none;
    .el-calendar__body{
      .el-calendar-table{
        th{
          font-size: 14px;
          color: #666666;
          &::before{
            content: '周';
          }
        }
      }
    }

    .current {
      .aqi {
        text-align: center;
        font-size: 14px;
        border-radius: 2px;
        background: rgba(0,0,0,0.1);
      }
      .aqi1 {
        color: #fff;
        background: #91D266;
      }
      .aqi2 {
        color: #fff;
        background: #FBCB0C;
      }
      .aqi3 {
        color: #fff;
        background: #FF0000;
      }
      .aqi4 {
        color: #fff;
        background: #FF0000;
      }
      .aqi5 {
        color: #fff;
        background: #FF0000;
      }
    }
  }
  &:deep(.el-calendar__header){
    position: absolute;
    top: 7px;
    left: 145px;
    width: 115px;
    padding: 0;
    border: none;
  }
  &:deep(.el-calendar__body){
    padding: 12px 14px;
  }
  &:deep(.el-input__inner){
    height: 24px;
    line-height: 24px;
  }
  &:deep(.el-calendar-table thead th){
    padding: 0;
    height: 38px;
  }
  &:deep(.el-calendar-table .el-calendar-day){
    width: 32px;
    height: 20px;
    line-height: 20px;
    border-radius: 2px;
    text-align: center;
    font-size: 14px;
    font-family: Arial;
    font-weight: 400;
    padding: 0;
    margin: 4px;
  }

}
</style>

<template>
  <Box title="专题图层" @close="$store.commit('setNavIndex', 0)">
    <div style="padding: 15px">
      <ZtType @change="change" :checkall="state.checkall" v-model="state.typeList"/>
    </div>
  </Box>
</template>

<script setup>
import {reactive, watch} from 'vue'
import {changeTree} from "@/GIS/mapUtils/layersManger";
import ZtType from "@/common/components/ztList/ztType";
import {useStore} from "vuex"

const store = useStore()
const props = defineProps(['label'])

watch(() => props.label, () => {
  state.typeList.forEach((e,index) => {
    e.active = false
    if(props.label=="AQI日均值"&&index==0){
      e.active = true
      if (e.child) {
        e.child.forEach(v => v.active = true)
      }
    }else if (e.name == props.label) {
      e.active = true
      if (e.child) {
        e.child.forEach(v => v.active = true)
      }
    } else {
      e.active = false
      if (e.child) {
        e.child.forEach(v => v.active = false)
      }
    }
  })
})

watch(() => store.state.xzq, () => {
  if (store.state.xzq == '陕西省') {
    state.typeList.forEach((e,index) => {
     if(index===0){
      e.active = true
      if (e.child) {
        e.child.forEach(v => v.active = true)
      }
     }else{
     e.active = false
      if (e.child) {
        e.child.forEach(v => v.active = false)
      }
     }
    })
  
  }

})

const state = reactive({
  checkAll: 1,
  typeList: [
    {
      name: '大气站',
      layerid: "sx_dqzdid",
      active: true,
      child: [
        {
          filter: "stationattri=0",
          name: '国控',
          active: true
        },
        {
          filter: "stationattri=1",
          name: '省控',
          active: true
        },
        {
          filter: "stationattri=2",
          name: '市控',
          active: true
        },
        {
          filter: "stationattri=9",
          name: '微站',
          active: true
        },
        {
          filter: "stationattri=8",
          name: '小型站',
          active: true
        }
      ]
    },
   {
      layerid: "qsdid",
      name: '取水点',
      active: false,
    },
    {
      layerid: "ysqyid",
      name: '用水企业',
      active: false,
    },
    
    {
      layerid: "jczid",
      name: '监测站',
      active: false,
    }
  ]
})
const change = (e) => {
  const {active, all} = JSON.parse(JSON.stringify(e))
  changeTree(active, all);
}
</script>

<style scoped lang="scss">

</style>

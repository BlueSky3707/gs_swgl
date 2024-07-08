<template>
  <Box title="专题图层" @close="$store.commit('setNavIndex', 0)">

      <ZtType @change="change" :checkall="state.checkall" v-model="state.typeList"/>
  
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

// watch(() => store.state.xzq, () => {
//   if (store.state.xzq == '白银市') {
//     state.typeList.forEach((e,index) => {
//      if(index===0){
//       e.active = true
//       if (e.child) {
//         e.child.forEach(v => v.active = true)
//       }
//      }else{
//      e.active = false
//       if (e.child) {
//         e.child.forEach(v => v.active = false)
//       }
//      }
//     })
  
//   }

// })

const state = reactive({
  checkAll: 1,
  typeList: [
  {
      layerid: "byswj_qyxx_vid",
      name: '用水企业',
      active: true,
    },
   {
      layerid: "qskxxid",
      name: '取水口',
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
  console.log(e)
  console.log(active)
  console.log(all)
  changeTree(active, all);
}
</script>

<style scoped lang="scss">

</style>

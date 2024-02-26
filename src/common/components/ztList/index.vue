<template>
  <Box title="市专题图层" hideclose @close="closeVue">
    <div class="all_zt">
     <el-scrollbar height="80vh">
       <el-collapse  v-model="state.activeNames" @change="handleChange">
         <el-collapse-item class="ss" v-for="(v,i) in state.AllZt" :key="i" :title="v.title" :name="v.title">
           <ZtType @change="change" :checkall="state.checkall" v-model="v.typeList"/>
         </el-collapse-item>
       </el-collapse>
     </el-scrollbar>
    </div>
  </Box>
</template>

<script setup>
import {reactive, watch} from 'vue'
import {clearAllLayer} from "@/GIS/mapUtils/clearLayer"
import ZtType from "./ztType";
import {changeTree} from "@/GIS/mapUtils/layersManger";
import {useStore} from "vuex"
import {AllZt} from "./LayerList"
const store = useStore()
const state = reactive({
  checkall:'',
  AllZt: AllZt
})
watch(()=>store.state.xzq,(v)=>{
  if(store.state.xzq=='陕西省'){
    handleChange(state.checkall)
  }
})
const change = (e)=>{
  const {active,all} = JSON.parse(JSON.stringify(e))
  changeTree(active,all);
}
const checkAll = (arr,bol)=>{
  for (const arrKey in arr) {
    if(arr[arrKey].hasOwnProperty('child')){
      arr[arrKey].active = bol
      checkAll(arr[arrKey].child,bol)
    }else{
      arr[arrKey].active = bol
    }
  }
}
const handleChange = (val) => {
  if(val){
    let arr =  state.AllZt.find(e=>e.title ===val)
    checkAll(arr.typeList,false)
  }
  state.checkall = val
}
const closeVue = () => {
  store.commit('setNavIndex',0)
}

</script>

<style scoped lang="scss">
.all_zt {
  width: 298px;
  min-height: 630px;
  //height: 85vh;
  overflow-y: auto;
  &:deep(.el-collapse) {
    .el-collapse-item__content{
      padding-bottom: 0;
    }
    .el-collapse-item__header {
      color: rgba(33, 115, 233, 1);
      border-bottom: none;
      padding: 0 11px;
      height: 36px;
      line-height: 36px;
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: bold;
      .el-collapse-item__arrow {
        color: rgba(102, 102, 102, 1);
      }
      &:hover {
        cursor: pointer;
        background: rgba(227, 237, 255, 0.39);
      }
    }
    .el-collapse-item__wrap {
      border-bottom: none;
      padding: 0 11px;
    }
  }
  &:deep(.is-active){
    background: rgba(56, 87, 149, 1) !important;
    color: #fff !important;
  }
}
</style>

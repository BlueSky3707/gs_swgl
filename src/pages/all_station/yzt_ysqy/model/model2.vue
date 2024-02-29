<template>
  <el-table :data="state.tableData" stripe max-height="450" height="450" style="width: 100%">
    
      <el-table-column prop="bqbtse" label="项目1"  align="center"/>
      <el-table-column prop="bqjse" label="项目2" align="center"/>
      <el-table-column prop="zspm" label="项目3"  align="center"/>
      <el-table-column prop="bqyse" label="项目4"  align="center"/>
     
    </el-table>
</template>

<script setup>
import {inject, onMounted,reactive} from "vue";
const emit = defineEmits(['close'])
const attributes = inject('attributes')
const state=reactive({
  tableData:[]
})
onMounted(()=>{
  // attributes.gid
state.tableData=[]
})

</script>

<style scoped lang="scss">

  .jbxx3{
    width: 320px;
    /* height: 300px; */

  }

</style>

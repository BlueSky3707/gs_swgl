<template>
<div class="lssj"></div>
 
</template>

<script setup>
import {inject, onMounted} from "vue";
const emit = defineEmits(['close'])
const attributes = inject('attributes')


</script>

<style scoped lang="scss">

  .lssj{
    width: 400px;
    height: 500px;
  }

</style>

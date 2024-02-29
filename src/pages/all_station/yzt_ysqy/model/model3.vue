<template>
<div class="jbxx3"></div>
 
</template>

<script setup>
import {inject, onMounted} from "vue";
const emit = defineEmits(['close'])
const attributes = inject('attributes')


</script>

<style scoped lang="scss">

  .jbxx3{
    width: 320px;
    height: 300px;

  }

</style>

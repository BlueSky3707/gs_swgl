<template>

  <Header />
 
   <Map v-if="route.path==='/yzt'"/>
  <router-view/>

</template>

<script setup>
import Header from './header'

import Map from "@/GIS/map.vue"

import {useRoute} from "vue-router"
import {onMounted} from "vue";
const route = useRoute()

</script>
<style>

</style>
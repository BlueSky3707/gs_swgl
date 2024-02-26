<template>

 
  <Header2 v-if="route.path==='/jsc'"/>
   <Header v-else/>
  
  <JscMap v-if="route.path==='/jsc'"/>
   <Map v-else/>
  <router-view/>
</template>

<script setup>
import Header from './header'
import Header2 from './Header2'
import Map from "@/GIS/map.vue"
import JscMap from "@/GIS/jscmap.vue"
import {useRoute} from "vue-router"
import {onMounted} from "vue";
const route = useRoute()

</script>

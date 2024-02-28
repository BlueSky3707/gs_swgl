<template>
  <Header />
  <JscMap v-if="route.path==='/jsc'"/>
   <Map v-else/>
  <router-view/>
</template>

<script setup>
import Header from './header'

import Map from "@/GIS/map.vue"
import JscMap from "@/GIS/jscmap.vue"
import {useRoute} from "vue-router"
import {onMounted} from "vue";
const route = useRoute()

</script>

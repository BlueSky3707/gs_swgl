<template>
  <div id="gis-content">
   
    <JSCMapView ></JSCMapView>
    <!-- <MapTj></MapTj> -->
  </div>
</template>
<script setup>

import JSCMapView from "./mapview/JSCMapView.vue";
import MapTj from "./mapview/MapTj.vue";

</script>
<style scoped>
#gis-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0px;
  margin: 0px;
}
</style>
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
  width: 56vw;
  height: calc(100% - 48px);
  overflow: hidden;
  position: absolute;
  top: 48px;
  left: 22vw;
  padding: 0px;
  margin: 0px;
  /* background: #0d325f; */
}
</style>
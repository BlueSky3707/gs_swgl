<template>
  <router-view/>
  <!-- 站点 -->
  <station/>
</template>

<script>
import station from './pages/all_station/index'

export default {
  components: {
    station
  },
  watch: {
    '$route'(to, from) {
      this.$store.commit('setLayerInfo', null)
    }
  }
}
</script>

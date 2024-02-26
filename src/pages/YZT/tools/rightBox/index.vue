<template>
  <rightBox :options="options"></rightBox>
</template>

<script setup>
import icon1 from '@/assets/rightBox/temp1.svg'
import icon2 from '@/assets/rightBox/temp2.svg'
import model1_1 from './model1/model1.vue'
import model1_2 from './model1/model2.vue'
import model2_1 from './model2/model1.vue'
import model2_2 from './model2/model2.vue'

const options = [
  {
    icon: icon1,
    activeIcon: icon2,
    tooltip: '水',
    children: [
      {title: '大气环境概况', component: model1_1},
      {title: '大气综合治理', component: model1_2}
    ]
  },
  {
    icon: icon1,
    activeIcon: icon2,
    tooltip: '水',
    children: [
      {title: '气固定污染源概况', component: model2_1},
      {title: '机动车检测总揽', component: model2_2}
    ]
  }
]
</script>

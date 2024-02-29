<template>
  <div class="areaMap">
    <el-checkbox
        class="all"
        @change="handleCheckAllChange"
        v-model="state.checkall"
    >{{ state.checkall ? '关闭' : '选择' }}所有图层
    </el-checkbox>
    <div class="limit">
      <div v-for="(item,index) in modelValue" :key="index">
        <div class="label_box">
          <div class="check_item">
            <div v-if="item.name.includes(state.stqList.nameList[index])" class="stq"
                 :style="state.stqList.styList[index]"></div>
            <img v-else :src="getSrc(`zt/${item.name}.png`)"
                 style="width: 18px;height: 18px;vertical-align: text-bottom;margin-right: 10px"/>
            <span class="flabel">{{ item.name }}</span>
          </div>
          <el-checkbox v-model="item.active" @change="fatherChange(item)"/>
        </div>
        <div v-if="item.child" class="child_box">
          <div class="child_item" v-for="(v,i) in item.child" :key="i">
            <span class="label">{{ v.name }}</span>
            <el-checkbox v-model="v.active" @change="childChange(v,item)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, watch} from 'vue'
import {useStore} from "vuex";

const store = useStore();
let props = defineProps(['modelValue', 'checkall'])
const emit = defineEmits(['update:modelValue', 'change'])
const state = reactive({
  checkall: false,
  stqList: {
    nameList: ['水功能区', '核心区', '缓冲区', '试验区', '生态公园', '保护区'],
    styList: [
      'background: rgba(210, 181, 151, 0.39);border: 1px solid #EFE3D7',
      'background: rgba(7, 187, 215, 0.39);border: 1px solid  #9CEAFF;',
      'background: rgba(128, 208, 132, 0.39);border: 1px solid #CEF1D0;',
      'background: rgba(52, 143, 12, 0.39);border: 1px solid #68B56C;',
      'background:  rgba(0, 245, 255, 0.39);border: 1px solid #1EBCC2',
      'background:  rgba(197, 225, 51, 0.39);border: 1px solid #94AB1A;',
    ]
  }
})
watch(() => props.checkall, () => {
  state.checkall = false
})

//全选
const handleCheckAllChange = (val) => {
  let arr = checkAll(props.modelValue, val)
  emit('change', {
    all: props.modelValue,
    active: val
  })
}
//父级
const fatherChange = (val) => {
  let arr = props.modelValue.find(e => e.name === val.name)
  checkAll(arr.child, val.active)
  emit('change', {
    all: props.modelValue,
    active: val
  })
}
//子级
const childChange = (val, item) => {
  let arr = props.modelValue.filter(e => e.child)
  arr.forEach(e => {
    if (e.child.some(v => v.active == true)) {
      e.active = true
    } else {
      e.active = false
    }
  })
  emit('change', {
    all: props.modelValue,
    active: item,
     target:val
  })
}

const checkAll = (arr, bol) => {
  for (const arrKey in arr) {
    if (arr[arrKey].hasOwnProperty('child')) {
      arr[arrKey].active = bol
      checkAll(arr[arrKey].child, bol)
    } else {
      arr[arrKey].active = bol
    }
  }
  return arr
}
const close = () => {
  store.commit('setNavIndex', 0)
}

</script>

<style scoped lang="scss">
.areaMap {
  //padding: 8px 9px;

  .all {
    position: absolute;
    top: 11px;
    left: 50%;
    z-index: 22;

    &:deep(.el-checkbox__input) {
      position: absolute;
      right: -20px;
    }
  }

  .limit {
    .label_box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      background:rgba(255, 255, 255, 0.15);
      height: 48px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      .check_item {
        display: flex;
        align-items: center;

        .stq {
          opacity: 1;
          margin-right: 9px;
          width: 18px;
          height: 18px;
          border-radius: 2px;
        }
      }

      .flabel {
        font-size: 15px;
        font-weight: normal;
        color: #fff;
      }
    }

    .child_box {
      display: grid;
      align-items: center;
      grid-template-columns: repeat(3, 1fr);
      padding: 5px 15px;

      .child_item {
        display: flex;
        align-items: center;
        height: 48px;
        .label {
          margin-right: 10px;
          color: #fff;
          font-size: 14px;
        }
      }
    }
  }

  .daqi {
    margin: 13px 0;
  }
}
</style>

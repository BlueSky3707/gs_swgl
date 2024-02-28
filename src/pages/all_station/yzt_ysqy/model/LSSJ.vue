<template>
  <Box class="box" title="历史数据" @close="emit('close')">
    <div class="main">
      <!-- 顶部搜索 -->
      <el-row style="margin-bottom: 10px">
        <el-col :span="10">
          <span>监测时间：</span>

          <el-date-picker
            style="width: 220px"
            type="daterange"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            v-model="state.time"
          ></el-date-picker>
        </el-col>

        <el-col :span="5">
          <el-button type="primary" style="width: 90px" @click="initEchart()"
            >查询</el-button
          >
          <el-button @click="initEchart()">
            <el-icon style="vertical-align: middle">
              <refreshRight />
            </el-icon>
          </el-button>
        </el-col>
      </el-row>

      <div class="con" v-loading="state.loading">
        <!-- 列表 -->
        <div class="list">
          <div class="titles"></div>
          <div class="tables">
            <div class="table">
              <div class="table-header">
                <div class="tr">序号</div>
                <div class="tr">监测时间</div>
                <div class="tr">名称</div>
                <div class="tr">数据状态</div>
              </div>
              <el-scrollbar max-height="330px">
                <div
                  class="table-body"
                  v-for="(item, index) in state.List"
                  :key="index"
                >
                  <div class="tr">{{ index + 1 }}</div>
                  <div class="tr">{{ item.time }}</div>
                  <div class="tr" > {{ item.name }} </div>
                  <div class="tr" style="color: #f77f07">
                    {{ item.staus }}
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Box>
</template>

<script setup>
import { RefreshRight } from "@element-plus/icons";
import { inject, onMounted, onUnmounted, reactive } from "vue";
import dayjs from "dayjs";

const emit = defineEmits(["close"]);
const attributes = inject("attributes");
console.log(attributes);
const state = reactive({
  loading: false,
  List: [],
  time: [],
});

onMounted(() => {
  timeformate();
  initEchart();
});

const timeformate = () => {
  state.time = [
    dayjs().subtract(1, "week").format("YYYY-MM-DD"),
    dayjs().format("YYYY-MM-DD"),
  ];
};
onUnmounted(() => {});

//历史监测数据
const initEchart = () => {
  state.loading = true;

  state.List = [{ time: "2024-02-22", staus: "正常", name: "xxx" }];
  state.loading = false;
};
</script>

<style scoped lang="scss">
.box {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .main {
    width: 1040px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #666666;
    padding: 15px 12px;
    position: relative;
    box-sizing: border-box;

    .switch {
      display: flex;
      align-items: center;
      width: 48px;
      height: 24px;
      background: rgba(255, 255, 255, 0.39);
      border: 1px solid #c1cedf;
      box-sizing: border-box;
      opacity: 1;
      border-radius: 2px;
      position: absolute;
      right: 28px;
      top: 60px;
      z-index: 99;

      &:hover {
        cursor: pointer;
      }

      .item {
        width: 24px;
        height: 24px;
        line-height: 27px;
        text-align: center;
      }

      .active {
        width: 24px;
        height: 24px;
        line-height: 27px;
        text-align: center;
        background: rgba(58, 131, 239, 1);
      }
    }

    .echart {
      width: 100%;
      height: 400px;
    }

    .list {
      width: 100%;
      height: 400px;

      .titles {
        width: 100%;
        height: 30px;
        line-height: 30px;
      }

      .tables {
        width: 100%;

        .table {
          width: 100%;
          font-size: 14px;
          font-weight: 400;

          .table-header,
          .table-body {
            width: 100%;
            line-height: 33px;
            font-size: 14px;
            display: grid;
            grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr;
            align-items: center;
            text-align: center;
          }

          .table-header {
            color: #3e8bec;
            background-color: #ebf0fc;
          }

          .table-body {
            color: #000000;
            border-bottom: 1px #efefef solid;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            height: 32px;

            .tr:nth-child(1) {
              color: #333333;
            }

            .tr:nth-child(2) {
              color: #666666;
            }

            .tr:nth-child(3) {
              color: #333333;
            }

            .tr:nth-child(4) {
              color: #666666;
            }

            .tr:nth-child(5) {
              background: rgba(145, 210, 102, 1);
              opacity: 1;
              border-radius: 50px;
              margin: 0 auto;
              font-size: 12px;
              width: 48px;
              height: 18px;
              line-height: 18px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
}
</style>

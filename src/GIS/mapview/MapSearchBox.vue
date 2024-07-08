<template>
 <div class="box">
  <div class="city">
    <el-select
    
      v-model="store.state.xzq"
      @change="cityChange"
      placeholder="白银市"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.label"
      >
      </el-option>
        <template #prefix>
          <img src="@/assets/common/pos.png" style="width: 16px; height: 16px" />
        </template>
    </el-select>

  </div>
   <div class="search" id="search">
      <div class="search_con">
        <img src="@/assets/common/sousuo.svg" class="img" @click="openGlobe" />
        <el-input v-model="state.inputValue" style="width: 223px" :boder="false" @clear="clearInput" @focus="foucsInput"
                  placeholder="请输入搜索名称" @input="inputChange" clearable>
        </el-input>
        <img src="@/assets/common/serchbg.png" class="searchIcon" style="width: 36px; height: 36px"
             @click="sousuoFun(1)" />
      </div>
    <div v-if="$store.state.navIndex == -1 && !$store.state.layerInf">
      <div
        class="search_wrap"
        v-if="state.conditions && !state.resultData.length"
      >
        <div class="search_card">
          <div
            style="margin-bottom: 5px; margin-right: 2px"
            v-for="(item, index) in state.list.filter(
              (e) => e.router == $route.path
            )"
            :key="index"
          >
            <div
              :class="!item.active ? 'active' : 'cards'"
              @click="openList(item)"
            >
              <div class="imgCards">
                <img class="imgs" :src="item.imgs" />
              </div>
              <div class="titles">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="search_list" v-if="state.resultData.length">
        <div class="lists">
          <div v-for="(item, index) in state.resultData" :key="index">
            <div class="lineS"></div>
            <div class="cards" @click="cardClick(item)">
              <div class="cards_left">
                <img
                  :src="
                    state.list.filter((e) => e.layerid == item.table)[0].imgs
                  "
                  :title="
                    state.list.filter((e) => e.layerid == item.table)[0].title
                  "
                />
              </div>
              <div class="cards_right">
                <div class="title1 ellipsis" :title="item.name">
                  {{ item.name }}
                </div>
                <div class="title1 ellipsis" :title="item.address">
                  {{ item.address }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pagings">
          <div class="pagings_left">
            {{ pages.pageNum }}/{{ Math.ceil(pages.total / pages.pageSize) }} 页
          </div>
          <div class="pagings_right">
            <el-button
              v-if="pages.pageNum != 1"
              @click="pageNumChange('上一页')"
              size="small"
              :icon="ArrowLeftBold"
            ></el-button>
            <el-button @click="pageNumChange('首页')" size="small"
              >首页
            </el-button>
            <el-button
              :disabled="
                pages.pageNum != Math.ceil(pages.total / pages.pageSize)
                  ? false
                  : true
              "
              @click="pageNumChange('下一页')"
              size="small"
              :icon="ArrowRightBold"
            ></el-button>
          </div>
        </div>
        <div class="bottom"></div>
      </div>
    </div>
  </div>
   </div>
</template>
<script setup>
import { citys } from "../config/cityConfig";
import { selCityByCode } from "../mapUtils/layerswitch";
import { onMounted, reactive, onUnmounted, watch } from "vue";
import { useStore } from "vuex";
import { ArrowLeftBold, ArrowRightBold, Search } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import { getLayerByid } from "../mapUtils/baselayer";
import { list,tableMLayerid,searchlist } from "./searchConfig";
import { Feature } from "ol";
import { Style, Icon, Text, Fill, Stroke } from "ol/style";
import { Point } from "ol/geom";
import { getDatasByLayerid } from "../mapUtils/gisMatch";
const options = citys;

const store = useStore();
const router = useRouter();
const route = useRoute();
import axios from "axios";

const state = reactive({
  showSousuo: 0,
  resultList: true,
  conditions: false,
  inputValue: "",
  resultData: [],
  list,
});

onMounted(() => {
  store.commit("setxzq", "白银市");
});
watch(
  () => route.path,
  () => {
    state.conditions = false;
    state.resultData = [];
  }
);
// 功能筛选
const openList = (item) => {
  item.active = !item.active;
};

const foucsInput = () => {

  store.commit("setNavIndex", -1);
  state.conditions = true;
  state.resultList = false;
  state.resultData = [];
};

//点击地球
const openGlobe = () => {

  state.conditions = false;
  state.resultList = false;
  state.resultData = [];
 
  store.commit("setNavIndex", 2);

};
// 搜索内容点击
const cardClick = async(item) => {
  var point = item.geometry.split("(")[1].split(")")[0].split(" ");
  let marklayer = getLayerByid("searchtmpid");
  marklayer.getSource().clear();

  let data= await getDatasByLayerid(tableMLayerid[item.table].layerid,item)
  marklayer
    .getSource()
    .addFeature(new Feature({ geometry: new Point([Number(point[0]),Number(point[1])]), name: item.name,attributes: data??item ,ptypeid:tableMLayerid[item.table].layerid}));
  marklayer.setStyle((feature) => {
    return new Style({
      image: new Icon({
        src: new URL("/layers/dingwei.png", import.meta.url).href,
        scale: [1.5, 1.5],
      }),
      text: new Text({
        textAlign: "center",
        textBaseline: "middle",
        font: "13px 微软雅黑 ",
        fill: new Fill({ color: "blue" }),
        stroke: new Stroke({
          color: "white",
          width: 1.5,
        }),
        offsetY: -15,
        padding: [40, 40, 40, 40],
        text: feature.get("name") + "",
      }),
    });
  });
  window.$olMap.getView().setCenter(point);
  window.$olMap.getView().setZoom(13);
};
// 分页变化
const initPage = () => {
  sousuoFun();
};
const inputChange = (str) => {
  state.inputValue = str;
  if(str!==""){
    sousuoFun();
  }else{
    state.resultData = [];
    pages.total=0
  }
};
// 分页数据
const pages = reactive({
  pageSize: 10, // 当前页码
  pageNum: 1, // 显示条数
  total: 10, // 总数
});
// 列表 分页点击
const pageNumChange = (val) => {
  switch (val) {
    case "上一页":
      pages.pageNum = pages.pageNum - 1 <= 0 ? 1 : pages.pageNum - 1;
      break;
    case "首页":
      pages.pageNum = 1;
      break;
    case "下一页":
      pages.pageNum =
        pages.pageNum + 1 >= pages.total ? pages.total : pages.pageNum + 1;
      break;
  }
  sousuoFun();
};

const sousuoFun = (pageNum) => {
  let marklayer = getLayerByid("searchtmpid");
  marklayer.getSource().clear();

   if (pageNum) {
    pages.pageNum = pageNum;
  }
  
  let tables = state.list
    .filter((e) => e.active)
    .map((e) => e.layerid)
    .join(",");

    let slist=  searchlist.filter(ite=>{
        if(tables.includes(ite.table)&&(ite.name.indexOf(state.inputValue)||ite.address.indexOf(state.inputValue))){
           return ite
        }
      })
      pages.total =slist.length;
      if(slist.length>10){
       slist= slist.slice((pages.pageNum-1)*pages.pageSize, pages.pageNum*pages.pageSize);
      }
    if (pages.total == 0) {
      ElMessage({
        message: "已找到0条相关内容",
        type: "warning",
      });
    }
    state.resultData = slist;
}
const sousuoFun2 = (pageNum) => {
  let marklayer = getLayerByid("searchtmpid");
  marklayer.getSource().clear();

 if (pageNum) {
    pages.pageNum = pageNum;
  }
  let tables = state.list
    .filter((e) => e.active)
    .map((e) => e.layerid)
    .join(",");

  let params = {
    keywords: state.inputValue,
    tables,
    current: pages.pageNum,
    limit: pages.pageSize,
  };
  axios({
    url: "/sapi/geocoding/circle",
    params,
  }).then((res) => {
    pages.total = res.data.count;
    if (pages.total == 0) {
      ElMessage({
        message: "已找到" + res.data.count + "条相关内容",
        type: "warning",
      });
    }
    state.resultData = res.data.result;
  });
  
};
const clearInput = () => {
  state.resultData = [];
  let marklayer = getLayerByid("searchtmpid");
  marklayer.getSource().clear();
};
const cityChange = (e) => {
  let select = citys.filter((item) => e === item.label);
  selCityByCode(select[0].value);
  openGlobe();
};

</script>

<style scoped lang="scss">
.box {
  &:deep(.el-input__wrapper) {
    transform: translateY(-1px);
    border: none !important;
    box-shadow: none !important;
    &:hover {
      border: none !important;
      box-shadow: none !important;
    }
    &:focus {
      border: none !important;
      box-shadow: none !important;
    }
  }
}

.search {
  position: fixed;
  left: 16px;
  top: 60px;
  z-index: 99;
  width: 300px;
  overflow: hidden;
  transition: height 0.5s ease;
  //background-color: rgba(0, 0, 0, 0.8);
  background: rgba(94, 134, 213, 0.1);
  .search_con {
    display: flex;
    align-items: center;
    border-radius: 4px;
    height: 36px;
    background-image: url("@/assets/common/search.png");
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .img {
    cursor: pointer;
    width: 30px;
    margin: 0 9px;
  }
  .searchIcon {
    position: absolute;
    top: 0;
    left: 264px;
  }

  &:deep(.el-input__inner) {
    line-height: 34px;
    height: 34px;
  }
}

.search_card {
  width: 300px;
  padding: 13px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.17);
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 400;
  box-sizing: border-box;
  cursor: pointer;

  .cards {
    width: 65px;
    height: 65px;
    border-radius: 6px;
    padding-top: 5px;
    box-sizing: border-box;

    .imgCards {
      width: 36px;
      height: 36px;
      border: 1px #c2c9d6 solid;
      border-radius: 6px;
      margin-top: 5px;
      background-color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;

      .imgs {
        width: 22px;
        height: 22px;
      }
    }

    .titles {
      width: 100%;
      margin-bottom: 2px;
      text-align: center;
      color: $title-color;
      font-size: 13px;
    }
  }

  .active {
    width: 65px;
    height: 65px;
    border-radius: 6px;
    cursor: pointer;
    padding-top: 5px;
    box-sizing: border-box;

    .imgCards {
      width: 36px;
      height: 36px;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;

      .imgs {
        width: 22px;
        height: 22px;
      }
    }

    .titles {
      color: #fff;
      text-align: center;
    }
  }
}

.search_list {
  width: 300px;
  padding: 12px;
  box-sizing: border-box;
  height: calc(100vh - 200px);

  .topSelect {
    width: 100%;
    height: 32px;
    border: 1px #edf0f2 solid;
    border-radius: 8px;
    background: rgba(235, 239, 241, 0.2);

    &:deep(.el-select) {
      border: none;
    }
  }

  .lists {
    width: 276px;

    .lineS {
      width: 276px;
      height: 2px;
    }

    .cards {
      width: 276px;
      height: 60px;
      display: grid;
      grid-template-columns: 45px 195px;

      .cards_left {
        display: flex;
        justify-content: center;
        align-items: center;

        .imgs {
          width: 60px;
          height: 44px;
        }
      }

      .cards_right {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 6px 0px;

        .title1 {
          width: 276px;
          color: #fff;
          font-size: 14px;
        }

        .title2 {
          width: 276px;
          color: #999999;
          font-size: 13px;
          display: flex;

          .title2_cards {
            width: 40px;
            height: 20px;
            font-size: 14px;
            color: #52c632;
            background-color: #effbef;
            border-radius: 3px;
            margin-left: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }

    .cards:hover {
      cursor: pointer;
    }

    .zwsj {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .pagings {
    width: 276px;
    height: 40px;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    position: absolute;
    bottom: 14px;

    .pagings_left {
      font-size: 14px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .pagings_right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}

.city {
  position: absolute;
  left: 330px;
  top: 60px;
  width: 110px;
  height: 36px;
  border-radius: 4px;
  background-image: url("@/assets/common/select.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  &:deep(.el-select) {
    height: 36px;
    line-height: 36px;
    display: flex;
    border: none;
    align-items: center;
    &:focus {
      border: none !important;
      box-shadow: none !important;
    }
  }
  &:deep(.el-select .el-input.is-focus .el-input__wrapper) {
    transform: translateY(-1px);
    border: none !important;
    box-shadow: none !important;
    &:hover {
      border: none !important;
      box-shadow: none !important;
    }
    &:focus {
      border: none !important;
      box-shadow: none !important;
    }
  }
}
</style>

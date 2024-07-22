<template>
  <div class="right-body">
    <div class="right-top public-bg">
      <div class="public-title">水质污染TOP5</div>
      <div class="title-nav">
        <div class="tile-img">
          <div class="type_img">
            <img class="loc_img" src="/layers/dq_cljcz.png" alt="" />
            <span class="texsp">200</span>
            <div class="texttile">用水企业数量</div>
          </div>
          <div class="type_img">
            <img class="loc_img" src="/layers/dq_ygjc.png" alt="" />
            <span class="texsp">200</span>
             <div class="texttile">取水口数量</div>
          </div>
          <div class="type_img">
            <img class="loc_img" src="/layers/dq_clzlz.png" alt="" />
            <span class="texsp">200</span>
            <div class="texttile">监测点数量</div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-con public-bg">
      <div class="public-title">水质类别占比</div>
      <div class="title-nav" id="huaxing"></div>
    </div>
    <div class="right-bottom public-bg">
      <div class="public-title">主要地区水流量</div>
      <div class="title-nav" id="zhexian"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import dayjs from "dayjs";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import * as echarts from "echarts";
import { search } from "@/GIS/api/postgis";
import * as baseLayerUtils from "@/GIS/mapUtils/baselayer";
import markRaws from "@/common/tools/markRaws";
const state = reactive({
  openType: true, // 列表显示
  monthcount: 0,
  curcount: 0,
  dateList: null,
  valueList: null,
  // 列表数据
  tableList: [],
});
onMounted(async () => {
  //  state.dateList = state.data.map(function (item) {
  //   return item[0];
  // });
  // state.valueList = state.data.map(function (item) {
  //   return item[1];
  // });
  let param = {
    layerName: "byswgl_yjjl",
    isReturnGeometry: false,
    spatialRel: "INTERSECTS",
    isCache: false,
    filter: "zytime = '" + dayjs().format("YYYY-MM-DD") + "'",
  };
  let res = await search(param);
  if (res.data.data.features && res.data.data.features.length > 0) {
    state.tableList = res.data.data.features.map((ite) => {
      ite.attributes.nr = "数据异常";
      ite.attributes.zytime = dayjs(ite.attributes.zytime).format("YYYY-MM-DD");
      return ite.attributes;
    });
    state.curcount = res.data.data.features.length;
  } else {
    state.tableList = [];
    state.curcount = 0;
  }

  let param2 = {
    layerName: "byswgl_yjjl_month_v",
    isReturnGeometry: false,
    spatialRel: "INTERSECTS",
    isCache: false,
    filter: "zytime = '" + dayjs().format("YYYY-MM-01") + "'",
  };
  let res2 = await search(param2);
  if (res2.data.data.features && res2.data.data.features.length > 0) {
    state.monthcount = res2.data.data.features[0]?.attributes.count;
  } else {
    state.monthcount = 0;
  }
});
//历史监测数据
const initEchart = () => {
  state.loading = true;
  if (chartInit) {
    chartInit.dispose();
  }
  chartInit = markRaws(echarts.init(echartRef));
  let option = {
    // Make gradient line here
    visualMap: [
      {
        show: false,
        type: "continuous",
        seriesIndex: 0,
        min: 0,
        max: 400,
      },
      {
        show: false,
        type: "continuous",
        seriesIndex: 1,
        dimension: 0,
        min: 0,
        max: state.dateList.length - 1,
      },
    ],

    title: [
      {
        left: "center",
        text: "监测数据",
      },
    ],
    tooltip: {
      trigger: "axis",
    },
    xAxis: [
      {
        name: "监测时间",

        data: state.dateList,
      },
    ],
    yAxis: [
      {
        name: "监测值",
      },
    ],
    grid: [
      {
        bottom: "10%",
      },
    ],
    series: [
      {
        type: "line",
        showSymbol: false,
        data: state.valueList,
        areaStyle: {},
      },
    ],
  };
  chartInit.setOption(option, true);

  state.loading = false;
};
// 打开列表
const openList = () => {
  state.openType = true;
};
// 关闭列表
const closeList = () => {
  state.openType = false;
};

// 列表 点击
const clickRow = (item) => {
  let marklayer = baseLayerUtils.getLayerByid("mark");
  marklayer.getSource().clear();
  marklayer.getSource().addFeature(
    new Feature({
      attributes: item,
      geometry: new Point([Number(item.ns), Number(item.we)]),
    })
  );
  window.$olMap.getView().animate({
    center: [Number(item.ns), Number(item.we)],
    zoom: 15,
    duration: 1000,
  });
};
</script>

<style scoped lang="scss">
.public-bg {
  background: rgba(12, 26, 63, 0.3);
}
.public-title {
  width: calc(100% - 20px);
  height: 30px;
  position: relative;
  top: 0;
  left: 5px;
  color: white;
  padding-left: 16px;
  line-height: 30px;
  font-size: 13px;
}
.public-title:before {
  width: 4px;
  height: 20px;
  top: 5px;
  position: absolute;
  content: "";
  background: #2997e4;
  border-radius: 2px;
  left: 5px;
}
.right-body {
  overflow: hidden;
  width: 22%;
  right: 0px;
  margin: 0 0.3%;
  top: 75px;
  height: calc(100% - 75px);
  position: absolute;
}

.right-body .right-top {
  width: 100%;
  height: 12%;
}
.tile-img {
  display: flex;
  padding-left: 10px;
  width: 100%;
  height: 55px;
  text-align: center;
  line-height: 55px;

}
.type_img {
  width: 130px;
  height: 55px;
}
.type_img .loc_img {
  width: 30px;
  height: 30px;
}
.texsp {
  position: relative;
  top: -8px;
  padding-left: 10px;
}
.texttile{
  position: relative;
  top: -10px;
  width: 130px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding-left: 10px;
}
.right-body .right-con {
  width: 100%;
  height: 45%;
  margin-top: 2%;
}
.right-body .right-bottom {
  width: 100%;
  height: 39%;
  margin-top: 2%;
}
</style>

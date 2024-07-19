<template>
  <div class="left-body">
    <div class="left-top public-bg">
      <div class="public-title">重点水质量检测区</div>
      <div class="top-body">
        <div class="top-left">
          <div class="top-left-title">
            <h6>注水量</h6>
            <span><b>1756</b>m3/h</span>
            <img
              src="image/pictre.png"
            />
          </div>
        </div>
        <div class="top-right">
          <div class="top-left-title">
            <h6>泄水量</h6>
            <span><b>3520</b>m3/h</span>
            <img
              src="image/pictre.png"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="left-con public-bg">
      <div class="public-title">水质量分布情况</div>
      <div class="title-nav" id="leida"></div>
    </div>
    <div class="left-bottom public-bg">
      <div class="public-title">企业污染排放情况</div>
      <div class="title-nav" id="wuran"></div>
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
.public-bg{
    background: rgba(12,26,63,0.3);
}
.public-title{
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
.public-title:before{
    width: 4px;
    height: 20px;
    top: 5px;
    position: absolute;
    content: "";
    background: #2997e4;
    border-radius: 2px;
    left: 5px;
}

.left-body{
   width: 22%;
   height: 100%;
   top: 75px;
   height: calc(100% - 75px);
   left: 0px;
   margin:0 0.3%;
   position:absolute;
  
}
.left-body .left-top{
    width: 100%;
    height: 27%;
}
.left-body .left-top .top-body{
    width: 100%;
    height: calc(100% - 30px);
}
.left-body .left-top .top-body .top-left{
    float: left;
    width: 50%;
    height: 100%;
}
 .top-left-title{
    width: 100%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
}
 .top-left-title h6{
    color: #bad0e2;
}
.top-left-title span{
    margin-top: 30px;
    display: inline-block;
    color: #2aa4f1;

/*    height: 80px;
    line-height: 80px;*/
}
 .top-left-title span b{
    font-size: 30px;
     letter-spacing:5px;
}
.top-left-title img{
    width: 80%;
}
.left-body .left-top .top-body .top-right{
    float: left;
    width: 50%;
    height: 100%;
}
.left-body .left-con{
    width: 100%;
    height: 38%;
    margin-top: 1.6%;
}
.title-nav{
    width: 100%;
    height: calc(100% - 30px);
}
.left-body .left-bottom{
    width: 100%;
    height: 32%;
    margin-top: 1.6%;
}


</style>

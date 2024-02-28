import { Feature } from "ol";
import { Cluster } from "ol/source";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";
import {
  Circle as CircleStyle,
  Style,
  Icon,
  Fill,
  Stroke,
  Text,
} from "ol/style";
import * as postgis from "../api/postgis";
import * as baselayer from "../mapUtils/baselayer";
import router from "@/common/router";
import store from "@/common/store";
import { layers } from "../config/layerConfig";
import * as turf from "@turf/turf";

import { clearAllLayerInRouter } from "./clearLayer";

import { getFeaturesByLayerid } from "../mapUtils/gisMatch";


import { getSourceByDataLngLat3 } from "./vectorSourceUtils";
let xzqlist = null;

//初始化配置图层（confLayers：图层名称,xzq：行政区,layerStyle：图层类型【统计、全要素展示】）
export const initLayers = (confLayers, xzq) => {
  let param = {
    layerName: "",
    isReturnGeometry: true,
    spatialRel: "INTERSECTS",
    isCache: false,
  };
  confLayers &&
    confLayers.forEach(async (item) => {
      param.layerName = item.tableName ?? "";
      if (item.filter) {
        param.filter = "(" + item.filter + ")";
      } else {
        param.filter = ""
      }
      if (item.layerType === 1) {
        //业务图层
        if (xzq && xzq !== "陕西省") {
          const rname = router.currentRoute.value.name;
          let param1 = {
            layerName: item.tableName,
            cityLayerName:  "sx_citygh",
            isReturnGeometry: true,
            cityname: "name='" + xzq + "'",
          };
          if (item.filter) {
            param1.where = "(" + item.filter + ")";
          }
          let player = await addLayerByNameOrCodeSearch(
            param1,
            item.layerId,
            item.renderStyle
          );
          if (player && item.filter) {
            player.set("where", item.filter);
          }
          if (player &&//多字段前端过滤
            item.renderStyle.filter) {
            player.set("where2", item.renderStyle.filter)
          }
        } else {
          let player = await addLayerBySearch(
            param,
            item.layerId,
            item.renderStyle
          );
          if (player && item.filter) {
            player.set("where", item.filter);
          }
          if (player &&
            item.renderStyle.filter) {
            player.set("where2", item.renderStyle.filter)
          }
        }
      }else if (item.layerType === 4) {//其他接口生成业务图层
        addLayerByQt(item,xzq)
      }else if (item.layerType === 2) {
        addClusterLayerBySearch(param, item.layerId, item.renderStyle);
      }  else {
        //统计图层只在初始化时添加
        let param2 = {
          layername: item.tableName,
          citytablename: "sx_citygh",
          outFields: "name",
          type: "count(*)",
          filter: item.filter ??"",
        };
        addLayerByGroupData(param2, item.layerId, item.renderStyle);
      }
    });
};
// 省级图层改变

export const changeLayerSj = (layerids) => {
  clearAllLayerInRouter();
  const rname = router.currentRoute.value.name;
  let curlayers = [];
  layerids.split(",").forEach((layerid) => {
    let las = JSON.parse(JSON.stringify(layers[rname].filter((item) => item.layerId === layerid)));
    if (las.length > 0) {
     
      curlayers.push(las[0]);
    }
  });
  initLayers(curlayers, null);
};

// 图层监听
export const changeTree = (active, list) => {
  const rname = router.currentRoute.value.name;
  if (typeof active === "object" && active.layerid) {
    //单个选中
    if (active.active) {
      //选中
      let allLayers = [];

        allLayers = layers[rname];
      
      let curlayers = JSON.parse(
        JSON.stringify(
          allLayers.filter((item) => item.layerId === active.layerid)
        )
      );
      if (active.child) {
        //属性过滤赋值
        let listfilter = [];
        active.child.forEach((item) => {
          if (item.active) {
            listfilter.push(item.filter);
          }
        });
        if (listfilter.length !== active.child.length) {
          let where = listfilter.join(" ohoxr ");
          if (active.layerid === "sx_qwryid" || active.layerid === "sx_swryid" || active.layerid === "sx_wsclcid") {
            curlayers[0].renderStyle.filter = where
        
          } else {
            if (curlayers[0].filter) {
              curlayers[0].filter = curlayers[0].filter + " anhoxd " + "(" + where + ")";
            } else {
              curlayers[0].filter = where
            }
          }
        }
      }

   
      initLayers(
       [curlayers[0]],
        store.state.xzq
      );
    } else {
      //移除
    
        reMoveLayers([active.layerid]);
       
      
    }
  } else if (typeof active === "boolean") {
    //全选全不选
    if (active) {
      //全选
      let allLayers = [];
   
        allLayers = layers[rname];
      
      let curlayers = [];
      list.forEach((ite) => {
        if (ite.layerid) {
          let curlayer = JSON.parse(
            JSON.stringify(
              allLayers.filter((item) => item.layerId === ite.layerid)
            )
          );
          if (curlayer.length > 0) {

            curlayers.push(curlayer[0]);
          }
        }
      });
      initLayers(
        curlayers,
         store.state.xzq
      );
    } else {
      //全不选
      list.forEach((item) => {
        if (item.layerid) {
         
            reMoveLayers([item.layerid]);
           
          
        }
      });
    }
  }
};
export const reMoveLayers = (layerids) => {
  layerids.forEach((ite) => {
    baselayer.reMoveLayerById(ite);
  });
};
// 矢量创建图层
export const createVectLayerByFeatures = async (layerid, style, datas) => {
  let features =[]
  if(layerid==="sx_wlnajid"){

    features= getSourceByDataLngLat3(datas,"CAS_LON","CAS_LAT");
  }else{
    features= createFeaturesByDatas(datas);
  }
   
  features = await getFeaturesByLayerid(layerid, features, style);
  let featurelayer = new VectorLayer({
    id: layerid,
    opacity: style.opacity ?? 1,
    minZoom: style.minZoom ??0,
    maxZoom: style.maxZoom ?? 20,
    source: new VectorSource({
      features: features,
      crossOrigin: "anonymous",
    }),
    style: function (feature) {
      if (feature.getGeometry().getType().toLowerCase() === "point") {
        //点位渲染
        return setStyleByFeature(feature, style);
      } else {
        //其他
        return setStyleByFeaturePoygon(feature, style, layerid);
      }
    },
  });
  window.$olMap.addLayer(featurelayer);
  return featurelayer;
};
// 矢量创建图层
export const createVectLayerBypFeatures = async (layerid, style, pfeatures) => {
  let features = await getFeaturesByLayerid(layerid, pfeatures, style);
  let featurelayer = new VectorLayer({
    id: layerid,
    opacity: style.opacity ?? 1,
    minZoom: style.minZoom ??0,
    maxZoom: style.maxZoom ?? 20,
    source: new VectorSource({
      features: features,
      crossOrigin: "anonymous",
    }),
    style: function (feature) {
      if (feature.getGeometry().getType().toLowerCase() === "point") {
        //点位渲染
        return setStyleByFeature(feature, style);
      } else {
        //其他
        return setStyleByFeaturePoygon(feature, style, layerid);
      }
    },
  });
  window.$olMap.addLayer(featurelayer);
  return featurelayer;
};
//根据配置文件和要素字段渲染数据
const setStyleByFeature = (feature, style) => {
  let img = new URL("/mark.png", import.meta.url).href;
  if (style.type === 1) {
    //唯一值渲染
    let simg = style.imgs[feature.get("attributes")[style.field]];
    img = simg ?? style.imgs[Object.keys(style.imgs)[0]];
  } else if (style.type === 2) {
    //阶段渲染
    let simg =
      style.imgs[
      getJdImg(
        Object.keys(style.imgs),
        Number(feature.get("attributes")[style.field])
      )
      ];
    img = simg ?? style.imgs[Object.keys(style.imgs)[0]];
  } else {
    img = style.img ?? new URL("/mark.png", import.meta.url).href;
  }
  let p = new Style({
    image: new Icon({
      src: img,
      scale: style.scale ?? [0.8, 0.8],
    }),
  });
  if (
    style.textZoom &&
    window.$olMap.getView().getZoom() > style.textZoom &&
    style.field
  ) {
    let p2 = new Style({
      image: new Icon({
        src: new URL("/layers/textbg.png", import.meta.url).href,
        scale: style.scale ?? [0.8, 0.8],
        offset: [-33, -20],

        offsetOrigin: "top-left",
        size: [100, 100],
      }),
      text: new Text({
        textAlign: "center",
        textBaseline: "middle",
        font: "16px",
        fill: new Fill({ color: "black" }),
        offsetY: -15,
        padding: [40, 40, 40, 40],
        text: feature.get("attributes")[style.field]?? "0" + "",
      }),
    });
    if (style.field2) {
      let fields = style.field2.split(",");
      let text2 = "";
      fields.forEach((ite, ind) => {
        if (ind === 0) {
          text2 += feature.get("attributes")[ite]?? "-";
        } else {
          text2 +=
            "-" +
            (feature.get("attributes")[ite]??"-");
        }
      });
      p.setText(
        new Text({
          textAlign: "center",
          textBaseline: "middle",
          font: "16px",
          fill: new Fill({ color: "black" }),
          offsetY: 15,
          padding: [40, 40, 40, 40],
          stroke: new Stroke({ color: "white", width: 1 }),
          text: text2,
        })
      );
    }
    return [p, p2];
  } else {
    return p;
  }
};
// 面线数据渲染
const setStyleByFeaturePoygon = (feature, style, layerid) => {
  let fillcolor = "red";
  let strokecolor = "b9d83c";
  if (style.type === 1) {
    //唯一值渲染
    if (style.fillcolors) {
      let sfillcolor = style.fillcolors[feature.get("attributes")[style.field]];
      fillcolor = sfillcolor ?? "red";
    }
    if (style.strokecolors) {
      let sstrokecolor =
        style.strokecolors[feature.get("attributes")[style.field]];
      strokecolor = sstrokecolor ?? "#b9d83c";
    }
  } else if (style.type === 2) {
    //阶段渲染
    if (style.fillcolors) {
      let sfillcolor =
        style.sfillcolors[
        getJdImg(
          Object.keys(style.sfillcolors),
          feature.get("attributes")[style.field]
        )
        ];
      fillcolor = sfillcolor ? sfillcolor : "red";
    }
    if (style.strokecolors) {
      let sstrokecolor =
        style.strokecolors[
        getJdImg(
          Object.keys(style.strokecolors),
          feature.get("attributes")[style.field]
        )
        ];
      strokecolor = sstrokecolor ? sstrokecolor : "#b9d83c";
    }
  } else {
    fillcolor = style.fillcolor ? style.fillcolor : "red";
    strokecolor = style.strokecolor ? style.strokecolor : "#41ce3f";
  }
  var p = new Style({
    fill: new Fill({
      color: fillcolor,
    }),
    stroke: new Stroke({
      color: strokecolor,
      width: style.strokewidth ?? 3,
    }),
  });

  return p;
};
//根据数据创建要素类
export const createFeaturesByDatas = (datas) => {
  let features = [];
  let geogson = new GeoJSON();
  datas &&
    datas.forEach((item) => {
      let geo = JSON.parse(item.geoJson);
      let f = geogson.readFeature(geo);
      features.push(
        new Feature({ attributes: item.attributes, geometry: f.getGeometry() })
      );
    });
  return features;
};
export const createVectLayerByGeoJson = (layerid, style, datas) => {
  var features = [];
  var geogson = new GeoJSON();
  datas.forEach((item) => {
    var f = geogson.readFeature(item.geometry);
    features.push(
      new Feature({
        attributes: item.properties,
        geometry: f.getGeometry(),
      })
    );
  });
  let featurelayer = new VectorLayer({
    id: layerid,
    opacity: style.opacity ?? 1,
    source: new VectorSource({
      features: features,
      crossOrigin: "anonymous",
    }),
    style: function (feature) {
      var p = new Style({
        image: new Icon({
          src: style.img?? new URL("/mark.png", import.meta.url).href,
          scale: style.scale ?? [0.8, 0.8],
        }),
        fill: new Fill({
          color: style.fillcolor ?? "red",
        }),
        stroke: new Stroke({
          color: style.strokecolor ??"#b9d83c",
          width: style.strokewidth ?? 3,
        }),
      });
      return p;
    },
  });
  if (style.zIndex) {
    var layersArray = window.$olMap.getLayers();
    layersArray.insertAt(style.zIndex, featurelayer);
  } else {
    window.$olMap.addLayer(featurelayer);
  }
  return featurelayer;
};
// 获取阶段所在值
export const getJdImg = (imgs, value) => {
  imgs = imgs.sort(function (a, b) {
    let a0 = Number(a.split("-")[0]);
    let b0 = Number(b.split("-")[0]);
    return a0 - b0
  })
  var select = imgs[0];
  imgs.forEach((item, index) => {
    if (item.indexOf("-") > -1) {
      let jds = item.split("-");
      if (value > Number(jds[0]) && value <= Number(jds[1])) {
        select = item;
        return false;
      }
    } else {
      if (index === 0 && value <= Number(item)) {
        select = item;
        return false;
      } else if (index !== 0 && value > Number(item)) {
        select = item;
        return false;
      }
    }
  });
  return select;
};
// 其他接口加载业务图层
export const addLayerByQt=async(item,xzq)=>{


}

//图层查询
export const addLayerBySearch = (param, layerid, style) => {
  return postgis.search(param).then((res) => {
    if (res.data.data.features && res.data.data.features.length > 0) {
      baselayer.reMoveLayerById(layerid);
      //动态匹配实时数据
      return createVectLayerByFeatures(layerid, style, res.data.data.features);
    } else {
      return setLayerNull(layerid);
    }
  });
};
//聚合图层查询
export const addClusterLayerBySearch = (param, layerid, style) => {
  return postgis.search(param).then((res) => {
    if (res.data.data.features && res.data.data.features.length > 0) {
      baselayer.reMoveLayerById(layerid);
      return createClusterLayerByFeatures(
        layerid,
        style,
        res.data.data.features
      );
    } else {
      return setLayerNull(layerid);
    }
  });
};
//图层缓冲区过滤查询
export const addLayerByBufferSearch = (param, layerid, style) => {
  //  param={layerName:"countypt_sx",buffDis:20000,isReturnGeometry:true,spatialFilter:'POINT(108.930671102 34.341838499)'}
  //  layerid="cc"
  //  img=new URL('/16.png', import.meta.url).href

  return postgis.bufferSearch(param).then((res) => {
    if (res.data.data.features && res.data.data.features.length > 0) {
      baselayer.reMoveLayerById(layerid);
      return createVectLayerByFeatures(layerid, style, res.data.data.features);
    } else {
      return setLayerNull(layerid);
    }
  });
};
//图层行政区过滤查询
export const addLayerByNameOrCodeSearch = (param, layerid, style) => {
  //  param={layerName:"countypt_sx",cityLayerName:"city",isReturnGeometry:true,cityname:"name='延安市'"}
  //  layerid="cc"
  //  img=new URL('/16.png', import.meta.url).href

  return postgis.getDataByNameOrCode(param).then((res) => {
    if (res.data.data.features && res.data.data.features.length > 0) {
      baselayer.reMoveLayerById(layerid);
      return createVectLayerByFeatures(layerid, style, res.data.data.features);
    } else {
      return setLayerNull(layerid);
    }
  });
};
//统计
export const addLayerByGroupData = async (param, layerid, style) => {

  if (!xzqlist) {
    xzqlist = await getXzqM();
  }
  postgis.getGroupData(param).then((res) => {
    if (res.data.data && res.data.data.length > 0) {
      if (baselayer.getLayerByid(layerid)) {
        return;
      }
      createStaticVectLayerByDatas(layerid, style, res.data.data, xzqlist);
    }
  });
};

// 设置空图层
export const setLayerNull = (layerid) => {
  let player = baselayer.getLayerByid(layerid);
  if (player) {
    player.getSource().clear();
    return null;
  } else {
    let featurelayer = new VectorLayer({ id: layerid });
    window.$olMap.addLayer(featurelayer);
    return featurelayer;
  }
};

// 矢量统计创建图层
export const createStaticVectLayerByDatas = (
  layerid,
  style,
  datas,
  xzqlist
) => {
  var features = [];
  var geogson = new GeoJSON();
  datas.forEach((item) => {
    if (item.geojson) {
      var geo = JSON.parse(item.geojson);
      var f = geogson.readFeature(geo);
      let xzqm = xzqlist.filter((ite) => item.name === ite.attributes.name);
      if (xzqm.length) {
        var geom = JSON.parse(xzqm[0].geoJson);
        var fm = geogson.readFeature(geom);
        features.push(
          new Feature({
            attributes: item,
            id: "layer_xzqm",
            geometry: fm.getGeometry(),
          })
        );
      }
      features.push(
        new Feature({
          attributes: item,
          id: layerid,
          geometry: f.getGeometry(),
        })
      );
    }
  });
  let featurelayer = new VectorLayer({
    id: layerid,
    opacity: style.opacity ?? 1,
    minZoom: style.minZoom ?? 0,
    maxZoom: style.maxZoom ?? 20,
    source: new VectorSource({
      features: features,
      crossOrigin: "anonymous",
    }),
    style: function (feature) {
      let color = [223, 184, 80, 1];
      if (style.type === 2) {
        //阶段渲染
        let colori =
          style.colors[
          getJdImg(
            Object.keys(style.colors),
            Number(feature.get("attributes")[style.field])
          )
          ];
        color = colori ?? [223, 184, 80, 1];
      } else {
        color = style.fillColor ?? [229, 189, 98, 0.3];
      }
      if (feature.get("id") === "layer_xzqm") {
        //渲染行政区面图层
        let fillColor = JSON.parse(JSON.stringify(color));
        if (style.type === 2) {
          fillColor[3] = 0.3;
        } else {
          fillColor = [229, 189, 98, 0.3];
        }

        let p = new Style({
          fill: new Fill({
            color: fillColor,
          }),
          stroke: new Stroke({
            color: "blue", //'#afada699',
            width: 1,
            lineDash: [5],
          }),
        });
        return p;
        // }else if(layerid==="sx_gfpfl_countid"||layerid==="sx_fsqd_countid"){

        //   return new Style({
        //      image: new Icon({
        //       src: style.img,
        //       scale: style.scales[getJdImg(Object.keys(style.scales), Number(feature.get("attributes")[style.field2]))],
        //     })
        //     })

      } else {
        var p = new Style({
          image: new CircleStyle({
            radius: style.radius ?? 25,
            stroke: new Stroke({
              color: style.strokeColor ?? "white",
              width: 2,
            }),
            fill: new Fill({ color: color }),
          }),
          text: new Text({
            textAlign: "center",
            textBaseline: "middle",
            font: "16px",
            fill: new Fill({
              color: style.textColor ?? "black",
            }),
            offsetY: -6,
            padding: [40, 40, 40, 40],
            text:
              feature.get("attributes")[style.field ?? "count"] +
              "",
          }),
        });
        var p2 = new Style({
          text: new Text({
            textAlign: "center",
            textBaseline: "middle",
            font: "16px",
            offsetY: 6,
            fill: new Fill({
              color: style.textColor ?? "black",
            }),
            padding: [40, 40, 40, 40],
            text: feature.get("attributes").name + "",
          }),
        });
        return [p, p2];
      }
    },
  });
  if (style.zIndex) {
    var layersArray = window.$olMap.getLayers();
    layersArray.insertAt(style.zIndex, featurelayer);
  } else {
    window.$olMap.addLayer(featurelayer);
  }
  return featurelayer;
};
// 创建聚合图层
export const createClusterLayerByFeatures = (layerid, style, datas) => {
  let features = createFeaturesByDatas(datas);
  let featurelayer = new VectorLayer({
    id: layerid,
    opacity: style.opacity ?? 1,
    minZoom: style.minZoom ?? 0,
    maxZoom: style.maxZoom ?? 20,
    source: new Cluster({
      distance: style.distance ?? 30,
      source: new VectorSource({
        features: features,
        crossOrigin: "anonymous",
      }),
    }),
    style: function (feature) {
      const size = feature.get("features").length;
      style.fillColor[3] = Math.min(0.8, 0.5 + size / features.length);
      if (size > 1) {
        let radius =
          style.radiusAll && style.radiusAll.length > 0
            ? getRadius(size, style.radiusAll)
            : size < 20
              ? 10
              : size < 50
                ? 20
                : 30;
        return new Style({
          image: new CircleStyle({
            radius: radius,
            fill: new Fill({
              color: style.fillColor,
            }),
          }),
          text: new Text({
            text: size.toString(),
            fill: new Fill({
              color: style.textColor ? style.textColor : "#fff",
            }),
          }),
        });
      } else {
        return new Style({
          image: new Icon({
            scale: style.scale ?? [1, 1],
            src: style.img?? new URL("/layers/sx_gyyq.png", import.meta.url).href,
          }),
        });
      }
    },
  });
  window.$olMap.addLayer(featurelayer);
  return featurelayer;
};
// 聚合图层半径
const getRadius = (size, radiusall) => {
  if (radiusall.length > 1) {
    for (let index = 0; index < radiusall.length; index++) {
      const item = radiusall[index];
      if (item.length > 1 && size <= item[0]) {
        return item[1];
      } else if (item.length == 1) {
        return item[0];
      }
    }
  } else {
    return radiusall[0];
  }
};
// 缓冲

export const startBuffer = (curlayer, point, dis) => {
  var buffered = turf.buffer(turf.point(point), Number(dis / 1000), {
    units: "kilometers",
  });
  createVectLayerByGeoJson(
    "buffmian",
    {
      strokecolor: [118, 217, 118, 0.8],
      strokewidth: 1,
      fillcolor: [118, 217, 118, 1],
      opacity: 0.5,
      zIndex:8
    },
    [buffered]
  );
  let str = "POINT(" + point[0] + " " + point[1] + ")";
  let param = {
    layerName: curlayer.tableName,
    buffDis: dis,
    isReturnGeometry: true,
    spatialFilter: str,
  };
  if (curlayer.filter) {
    param.filter = curlayer.filter;

  }
  return addLayerByBufferSearch(param, curlayer.layerId, curlayer.renderStyle);
};

// 获取行政区数据
export const getXzqM = () => {
  let param = {
    layerName: "sx_citygh",
    outFields: "name,code",
    isReturnGeometry: true,
    isCache: false,
    spatialRel: "INTERSECTS",
  };
  return postgis.search(param).then((res) => {
    if (res.data.data.features && res.data.data.features.length > 0) {
      return res.data.data.features;
    }
  });
};

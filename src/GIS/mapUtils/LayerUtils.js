import axios from "axios";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Circle as CircleStyle, Style, Fill, Stroke } from "ol/style";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import * as proj from "ol/proj";
import Icon from "ol/style/Icon";
import EsriJSON from "ol/format/EsriJSON";
import { ImageArcGISRest } from "ol/source";
import { Image as ImageLayer } from "ol/layer";
import { Cluster } from "ol/source";
import { Feature } from "ol";
import { Point } from "ol/geom";
import TileGrid from "ol/tilegrid/TileGrid";
import {
  getLayerByid,
  showLayerById,
  gettile,
  zeroPad,
} from "../mapUtils/baselayer";

var origin = [-180.0, 90.0];
var resolutions = [
  0.7031250000000002,
  0.3515625000000001,
  0.17578125000000006,
  0.08789062500000003,
  0.043945312500000014,
  0.021972656250000007,
  0.010986328125000003,
  0.005493164062500002,
  0.002746582031250001,
  0.0013732910156250004,
  6.866455078125002e-4,
  3.433227539062501e-4,
  1.7166137695312505e-4,
  8.583068847656253e-5,
  4.2915344238281264e-5,
  2.1457672119140632e-5,
  1.0728836059570316e-5,
  5.364418029785158e-6,
];
var fullExtent = [
  104.79522416831787,
  31.43766039138211,
  112.00713075579517,
  39.90697432336191,
];
var tileGrid = new TileGrid({
  tileSize: 256,
  origin: origin,
  extent: fullExtent,
  resolutions: resolutions,
});
// 加载arcgis要素图层
export const loadFeaturelayer = async (url, layerid, style) => {
  if (getLayerByid(layerid)) {
    showLayerById(layerid);
  } else {
    let pFdata = await getFeaturesByUrl(url);
    if (pFdata) {
      createVecLayerByData(pFdata, layerid, style);
    }
  }
};
// 获取数据
export const getFeaturesByUrl = (serviceUrl, param) => {
  let where = "1%3D1";
  if (param) {
    where = param;
  }
  let url =
    serviceUrl +
    "/query/?f=json&where=" +
    where +
    "&" +
    "returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=" +
    "&geometryType=esriGeometryEnvelope&inSR=4326&outFields=*" +
    "&outSR=4326";
  return axios.get(url).then((res) => {
    return res.data;
  });
};
export const getFeaturesStatics = (serviceUrl, filed, returnFiled) => {
  let url =
    serviceUrl +
    "/query?f=json&where=1%3D1&" +
    "groupByFieldsForStatistics=" +
    filed +
    "&orderByFields=" +
    filed +
    "&outFields=*&" +
    "outStatistics=%5B%7B%22onStatisticField%22%3A%221%22%2C%22" +
    "outStatisticFieldName%22%3A%22" +
    returnFiled +
    "%22%2C%22statisticType%22%3A%22count%22%7D%5D&spatialRel=esriSpatialRelIntersects";
  return axios.get(url).then((res) => {
    return res.data;
  });
};

//根据要素数据创建要素图层
export const createVecLayerByData = (data, layerid, style) => {
  const esrijsonFormat = new EsriJSON();
  const vectorSource = new VectorSource({
    loader: function (extent, resolution, projection, success, failure) {
      let feature2s = esrijsonFormat.readFeatures(data, {
        featureProjection: projection,
      });
      let features = [];
      if (data.features && data.features.length > 0) {
        data.features.forEach((item, index) => {
          features.push(
            new Feature({
              attributes: item.attributes,
              id: layerid,
              geometry: feature2s[index].getGeometry(),
            })
          );
        });
      }

      if (features.length > 0) {
        vectorSource.addFeatures(features);
      }
    },
  });
  let pVeclayer = new VectorLayer({
    id: layerid,
    source: vectorSource,
    style: function (feature) {
      var p = new Style({
        fill: new Fill({
          color: style.color ? style.color : "red",
        }),
        stroke: new Stroke({
          width: style.strokewidth ? style.strokewidth : 2,
          color: style.strokecolor ? style.strokecolor : [200, 200, 200, 1],
        }),
        image: new Icon({
          src: style.img ? style.img : new URL("/mark.png"),
          scale: style.scale ? style.scale : [0.6, 0.6],
        }),
      });

      return p;
    },
  });
  window.$olMap.addLayer(pVeclayer);
  return pVeclayer;
};
//加载arcgis 地图服务
export const loadArcgisResLayer = (url, id, style) => {
  if (getLayerByid(id)) {
    return;
  } else {
    let player = new ImageLayer({
      source: new ImageArcGISRest({
        ratio: 1,
        params: {},
        url: url,
      }),
      id: id,
      maxZoom: style.maxZoom ? style.maxZoom : 18,
      extent: window.$olMap.getView().calculateExtent(window.$olMap.getSize()),
    });
    window.$olMap.addLayer(player);
  }
};
//加载arcgis 地图服务
export const loadArcgisTileLayer = (url, layerid,visible) => {
  if (getLayerByid(layerid)) {
    return;
  } else {
    let player = new TileLayer({
      source: new XYZ({
        tileGrid: tileGrid,
        crossOrigin: "Anonymous",
        projection: proj.get("EPSG:4326"),
        url: url+"/tile/{z}/{y}/{x}",
      }),
      // source: new TileArcGISRest({
      //   crossOrigin:"Anonymous",
      //   projection: "EPSG:4326",
      //   url: url
      // }),
      id: layerid,
      visible:visible
    });

    window.$olMap.addLayer(player);
  }
};
//加载tomcat 地图切片
export const loadTomcatTileLayer = (layername, layerid) => {
  if (getLayerByid(layerid)) {
    return;
  } else {
    let player = new TileLayer({
      source: new XYZ({
        tileGrid: tileGrid,
        crossOrigin: "Anonymous",
        projection: proj.get("EPSG:4326"),
        tileUrlFunction: function (tileCoord) {
          return gettile(tileCoord, layername);
        },
      }),
      id: layerid,
    });
    window.$olMap.addLayer(player);
    // 加载错误时更换随机数，可以解决有空白瓦片的问题
    player.getSource().on("tileloaderror", function (e, i) {
      let src = e.tile.src_;
      console.log(src);
      let sr = src.match(/maponline\d/)[0];
      let randomNumber = 1;
      if (sr == "maponline1") {
        randomNumber = 2;
      } else if (sr == "maponline2") {
        randomNumber = 1;
      } else {
        randomNumber = 1;
      }
      let newSrc = src.replace(/maponline\d/, "maponline" + randomNumber);
      e.tile.load(newSrc);
    });
  }
 
};
export const loadNginxTileLayer = (url, options) => {
  if (getLayerByid(options.id)) {
    return;
  } else {
    let player = new TileLayer({
      source: new XYZ({
        tileGrid: tileGrid,
        crossOrigin: "Anonymous",
        projection: proj.get("EPSG:4326"),
        tileUrlFunction: function (tileCoord) {
          var x = "C" + zeroPad(tileCoord[1], 8, 16);
          var y = "R" + zeroPad(tileCoord[2], 8, 16);
          var z = "L" + zeroPad(tileCoord[0], 2, 10);
          return url + z + "/" + y + "/" + x + ".png";
        },
      }),
      ...options,
    });

    window.$olMap.addLayer(player);
  }
};
//根据要素数据创建聚合要素图层
export const createVecClusterLayerByData = (data, id, picSrc) => {
  const vectorSource = new VectorSource({
    loader: function (extent, resolution, projection, success, failure) {
      let features = [];
      if (data.features && data.features.length > 0) {
        data.features.forEach((item) => {
          features.push(
            new Feature({
              attributes: item.attributes,
              id: id,
              geometry: new Point([item.geometry.x, item.geometry.y]),
            })
          );
        });
      }
      if (features.length > 0) {
        vectorSource.addFeatures(features);
      }
    },
  });
  const clusterSource = new Cluster({
    distance: 30,
    source: vectorSource,
  });
  let isjh = false;

  let pVeclayer = new VectorLayer({
    id: id,
    source: isjh ? clusterSource : vectorSource,
    style: function (feature) {
      var zoom = window.$olMap.getView().getZoom();
      let curzoom = 8;

      if (zoom <= curzoom) {
        let len = feature.values_.features.length;
        let leng = len / 70;

        return new Style({
          image: new CircleStyle({
            radius: leng,
            stroke: new Stroke({
              color: "white",
              width: 1,
            }),
            fill: new Fill({
              color: "red",
            }),
          }),
        });
      } else {
        return new Style({
          image: new Icon({
            scale: [0.5, 0.5],
            src: picSrc,
          }),
        });
      }
    },
  });
  window.$olMap.addLayer(pVeclayer);
  return pVeclayer;
};

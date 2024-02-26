import { Map, View } from 'ol';
import TileLayer from "ol/layer/Tile"
import TileArcGISRest from 'ol/source/TileArcGISRest';
import TileGrid from 'ol/tilegrid/TileGrid'
import { mapConfig } from "../config/mapConfig"
import XYZ from 'ol/source/XYZ'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { Circle as CircleStyle, Fill, Style, Icon, Stroke } from 'ol/style'
import { defaults as defaultControls } from 'ol/control';
import * as  proj from 'ol/proj'
import { ImageArcGISRest } from "ol/source";
import { Image as ImageLayer } from "ol/layer";
import {Raster as RasterSource} from 'ol/source';

var origin = [-180.0, 90.0];
var resolutions = [0.7031250000000002, 0.3515625000000001, 0.17578125000000006, 0.08789062500000003, 0.043945312500000014, 0.021972656250000007, 0.010986328125000003, 0.005493164062500002, 0.002746582031250001, 0.0013732910156250004, 6.866455078125002E-4, 3.433227539062501E-4, 1.7166137695312505E-4, 8.583068847656253E-5, 4.2915344238281264E-5, 2.1457672119140632E-5, 1.0728836059570316E-5, 5.364418029785158E-6];
var fullExtent = [104.79522416831787, 31.43766039138211, 112.00713075579517, 39.90697432336191];
var tileGrid = new TileGrid({
  tileSize: 256,
  origin: origin,
  extent: fullExtent,
  resolutions: resolutions
});
export const intMap = (mapid) => {

  var resolutions = [0.7031250000000002, 0.3515625000000001, 0.17578125000000006, 0.08789062500000003, 0.043945312500000014, 0.021972656250000007, 0.010986328125000003, 0.005493164062500002, 0.002746582031250001, 0.0013732910156250004, 6.866455078125002E-4, 3.433227539062501E-4, 1.7166137695312505E-4, 8.583068847656253E-5, 4.2915344238281264E-5, 2.1457672119140632E-5, 1.0728836059570316E-5, 5.364418029785158E-6];
  let map = new Map({
    target: mapid,
    view: new View({
      projection: proj.get('EPSG:4326'),
      center: [108.88, 35.9],//陝西中心點
       zoom: 7.3,
        minZoom: 6,
       maxZoom: 18,
    
    }),
    controls: defaultControls({
      attribution: false,
      zoom: false,
      rotate: false
    })
  });
  window.$olMap = map;
  loadIntLayer()//自定义底图

}

//自定义底图
export const loadIntLayer = () => {

  addBaseLayerByHx();//底图

  //工具图层
  let drawLayer = new VectorLayer({
    key: "draw",
    zIndex: 1000,
    source: new VectorSource(),
    style: new Style({
      fill: new Fill({
        color: [238, 118, 0, 0.3]
      }),
      stroke: new Stroke({
        color: '#ff8000',
        width: 3
      }),
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: 'white',
          width: 1
        }),
        fill: new Fill({
          color: 'red'
        })
      })
    })

  });
  window.$olMap.addLayer(drawLayer)

  //创建临时图层
  let tmp = new VectorLayer({
    id: "tmpid",
    source: new VectorSource(),
  });
  window.$olMap.addLayer(tmp)
  //临时标记图层
  let markLayer = new VectorLayer({
    id: "mark",
    zIndex: 1000,
    source: new VectorSource(),
    style: function (feature) {
      let scale=[0.8, 0.8]
      // if(["ya_gasyjid","ya_wateryjid","ya_wryyjid","ya_ygjcyjid"].indexOf(feature.get("fromid"))>-1){
      //   scale=[1.8,1.8]
      // }
      return new Style({
        stroke: new Stroke({
          color: [0, 255, 255],
          width: 2
        }),
        image: new Icon({
          src: new URL("/mark.png", import.meta.url).href,
          scale: scale
        })

      })

    }
  });
  window.$olMap.addLayer(markLayer);
}


// 底图
export const addBaseLayerByHx = () => {
  let outlayer = new ImageLayer({
    source: new RasterSource({
      sources: [
        //传入图层，这里是天地图矢量图或者天地图矢量注记
        new TileArcGISRest({
          crossOrigin: "Anonymous",
          projection: "EPSG:4326",
          url: mapConfig.sxOuterCityVectorhx,
        }),
      ],
      operationType: 'image',
      operation: function (pixels, data) {
        for (var i = 0; i < pixels[0].data.length; i += 4) {
          var r = pixels[0].data[i];
          var g = pixels[0].data[i + 1];
          var b = pixels[0].data[i + 2];
          var grey = r * 0.3 + g * 0.59 + b * 0.11;
          pixels[0].data[i] = grey;
          pixels[0].data[i + 1] = grey;
          pixels[0].data[i + 2] = grey;
          pixels[0].data[i] = 255 - pixels[0].data[i] + 19;
          pixels[0].data[i + 1] = 255 - pixels[0].data[i + 1] + 27
          pixels[0].data[i + 2] = 255 - pixels[0].data[i + 2] + 45;
          
      }
        return pixels[0];
      },
      threads: 10,
      lib: {
       
      }
    }),
    id: "outcity",
    visible: true
  })
  let vlayer = new TileLayer({
    source: new TileArcGISRest({
      crossOrigin: "Anonymous",
      projection: "EPSG:4326",
      url:mapConfig.hxVect2
    }),
    id: "dzdt",
    visible: true
  })
  


  window.$olMap.addLayer(vlayer)
  window.$olMap.addLayer(outlayer)

  // loadNginxTileLayer( mapConfig.yabjx,{
  //   id:"yabjxid"
  // })
}

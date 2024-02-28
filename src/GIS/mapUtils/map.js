import { Map, View } from 'ol';
import TileLayer from "ol/layer/Tile"
import TileGrid from 'ol/tilegrid/TileGrid'
import { mapConfig } from "../config/mapConfig"
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { Circle as CircleStyle, Fill, Style,Icon, Stroke } from 'ol/style'
import { defaults as defaultControls} from 'ol/control';
import { addCity } from './layerswitch';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4'
import { Projection, addProjection } from 'ol/proj';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import WMTS from 'ol/source/WMTS'
proj4.defs("EPSG:4490", "GEOGCS[\"China Geodetic Coordinate System 2000\",DATUM[\"China_2000\",SPHEROID[\"CGCS2000\",6378137,298.257222101,AUTHORITY[\"EPSG\",\"1024\"]],AUTHORITY[\"EPSG\",\"1043\"]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",\"8901\"]],UNIT[\"degree\",0.0174532925199433,AUTHORITY[\"EPSG\",\"9122\"]],AUTHORITY[\"EPSG\",\"4490\"]]");
register(proj4);
//重写projection4490，
let projection = new Projection({
  code: 'EPSG:4490',
  units: 'degrees',
  axisOrientation: 'neu'
});
projection.setExtent([-180, -90, 180, 90]);
projection.setWorldExtent([-180, -90, 180, 90]);
addProjection(projection);
var origin = [-180.0, 90.0];
var resolutions = [1.40782601571, 0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.005493164063, 0.002746582031, 0.001373291016, 0.000686645508, 0.000343322754, 0.000171661377, 0.000085830688, 0.000042915344, 0.000021457672, 0.000010728836, 0.000005364418, 0.000002682209, 0.000001341105]
var fullExtent = [105.199, 31.312, 111.53, 39.979]
var tileGrid = new TileGrid({
  tileSize: 256,
  origin: origin,
  extent: fullExtent,
  resolutions: resolutions
});

var matrixIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
var tileGrid2 = new WMTSTileGrid({
  origin: [-180.0, 90.0],
  resolutions: resolutions,
  matrixIds: matrixIds,
});
export const intMap = (mapid) => {
  let map = new Map({
    target: mapid,
    view: new View({
       projection:projection,
       center: [108.88, 35.9],//陝西中心點
       zoom: 7,
        minZoom: 7,
       maxZoom: 18,
      resolutions: resolutions,
    }),
    controls: defaultControls({
      attribution: false,
      zoom: false,
      rotate: false
    })
  });
 window.$olMap = map;
 loadTdtLayer(map)

}
export const loadTdtLayer = async (map) => {
  addWMTSLayer(mapConfig.ztvec , "dzdt", "vec", true, map)
  addWMTSLayer(mapConfig.ztvecl , "dzdtl", "cva", true, map)
  addWMTSLayer(mapConfig.ztimg, "yxdt", "img", false, map)
  addWMTSLayer(mapConfig.ztimgL , "yxdtL", "cia", false, map)
  addCity()
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
let tmp=new VectorLayer({
  id:"tmpid",

  source: new VectorSource(),
});
window.$olMap.addLayer(tmp)
 //创建临时图层
 let searchtmp=new VectorLayer({
  id:"searchtmpid",
  zIndex: 1000,
  source: new VectorSource(),
});
window.$olMap.addLayer(searchtmp)
let bufflayer=new VectorLayer({
  id:"temp_buff_pointid",
  visible:false,
  source: new VectorSource()
});
window.$olMap.addLayer(bufflayer)

//临时标记图层
let markLayer = new VectorLayer({
id: "mark",
zIndex: 1000,
source: new VectorSource(),
style:function(feature) {
  
    return new Style({
      stroke: new Stroke({
        color: [0, 255, 255],
        width: 2
      }),
      image:  new Icon({
        src:new URL("/mark.png", import.meta.url).href,
        scale: [0.8, 0.8],
      })

    })
  
}
});
window.$olMap.addLayer(markLayer);
}
const addWMTSLayer = (url, layerid, layer, visible, map) => {
  let pLayer = new TileLayer({
    id: layerid,
    visible: visible,
    source: new WMTS({
      url: url,
      layer: layer,
      matrixSet: 'c',
      format: 'tiles',
      projection: projection,
      tileGrid: tileGrid2,
      request: "GetCapabilities",
      style: 'default',
      wrapX: true
    }),
  })
  map.addLayer(pLayer);

}


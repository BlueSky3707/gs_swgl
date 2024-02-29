import { Map, View } from 'ol';
import TileLayer from "ol/layer/Tile"
import * as  proj from 'ol/proj'
import { mapConfig } from "../config/mapConfig"
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { Circle as CircleStyle, Fill, Style, Icon, Stroke } from 'ol/style'
import { defaults as defaultControls } from 'ol/control';
import XYZ from 'ol/source/XYZ'
import {addCity  } from "./layerswitch";
export const intMap = (mapid) => {
  var resolutions = [0.7031250000000002, 0.3515625000000001,0.17578125000000006, 0.08789062500000003,0.043945312500000014,0.021972656250000007,0.010986328125000003,0.005493164062500002, 0.002746582031250001,0.0013732910156250004,6.866455078125002E-4,3.433227539062501E-4,1.7166137695312505E-4,8.583068847656253E-5,4.2915344238281264E-5,2.1457672119140632E-5,1.0728836059570316E-5,5.364418029785158E-6];
  let map = new Map({
    target: mapid,
    view: new View({
      projection:  proj.get('EPSG:4326'),
      center: [104.17425,36.545649],//白银中心點
       zoom: 9,
        minZoom: 8,
       maxZoom: 18,
       resolutions: resolutions
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
export const intMap2 = (mapid) => {
  var resolutions = [0.7031250000000002, 0.3515625000000001,0.17578125000000006, 0.08789062500000003,0.043945312500000014,0.021972656250000007,0.010986328125000003,0.005493164062500002, 0.002746582031250001,0.0013732910156250004,6.866455078125002E-4,3.433227539062501E-4,1.7166137695312505E-4,8.583068847656253E-5,4.2915344238281264E-5,2.1457672119140632E-5,1.0728836059570316E-5,5.364418029785158E-6];
  let map = new Map({
    target: mapid,
    view: new View({
      projection:  proj.get('EPSG:4326'),
      center: [104.17425,36.545649],//白银中心點
       zoom: 9,
        minZoom: 8,
       maxZoom: 18,
       resolutions: resolutions
    }),
    controls: defaultControls({
      attribution: false,
      zoom: false,
      rotate: false
    })
  });
  window.$olMap = map;
  addBaseLayerByHx()
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
    if(feature.get("type")==="sx_waterid_mark"){
      return new Style({     
        image: new CircleStyle({
       radius: 7,
       stroke: new Stroke({
         color: [255, 255, 255],
         width: 1
       }),
       fill: new Fill({
         color: [255, 0, 0]
       })
     })
    })
    }else if(feature.get('id')==="sx_riverid"||feature.get('id')==="sx_watermodelid"){
      return new Style({
        stroke: new Stroke({
          color: [0, 255, 255],
          width: 7
        })

      })
    }else{
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
  }
});
window.$olMap.addLayer(markLayer);
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

  loadGaodeVecLayer(mapConfig.img84,"yxdt",true)
  loadGaodeVecLayer(mapConfig.road84,"road",true)
  loadGaodeVecLayer(mapConfig.label84,"label",true)
}
export const loadGaodeVecLayer = (url,layerid,visible) => {
  let pLayer = new TileLayer({
    source: new XYZ({
      url: url
    }),
    id: layerid,
      visible:visible
  });
  window.$olMap.addLayer(pLayer);
};
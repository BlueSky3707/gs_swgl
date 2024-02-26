import { showLayerById, hiddenLayerById } from "../mapUtils/baselayer";
import { search } from "../api/postgis";
import { getSourceByData } from "../mapUtils/vectorSourceUtils";
import { getLayerByid, reMoveLayerById } from "../mapUtils/baselayer";
import { Fill, Style, Stroke } from 'ol/style';
import VectorLayer from "ol/layer/Vector";

import store from '@/common/store'

export const layerSwitchBySel = (toolIndex, isShow) => {
  if (toolIndex === 0) {
    if (isShow) {
      showLayerById("yxdt");
      showLayerById("yxdtlabel");
      hiddenLayerById("dzdt");
      hiddenLayerById("dzdtlabel");
    } else {
      showLayerById("dzdt");
      showLayerById("dzdtlabel");
      hiddenLayerById("yxdt");
      hiddenLayerById("yxdtlabel");
    }
  }
};
export const selCityByCode = (pCode) => {

  if (pCode == "610000") {
    window.$olMap.getView().setCenter([108.88, 35.9])
    window.$olMap.getView().setZoom(6.3)
    return;
  }
  search({
    layerName: "sx_citygh",
    outFields: "name,code",
    filter: "code ='" + pCode + "'",
    isReturnGeometry: true,
    isCache: false,
    spatialRel: "INTERSECTS",
  }).then((res) => {
    if (res && res.data && res.data.data.features.length) {
   
      let vectSourc = getSourceByData(res.data.data.features);
   
      window.$olMap.getView().fit(vectSourc.getFeatures()[0].getGeometry(),
        { duration: 1000 })
   
    }
  });
};

export const addCity = () => {
  let ptmlayer = getLayerByid("xzqmid");
 
  if (ptmlayer) {
    reMoveLayerById("xzqmid");
  }
  search({
    layerName: "sx_citygh",
    outFields: "name,code",
    isReturnGeometry: true,
    isCache: false,
    spatialRel: "INTERSECTS",
  }).then((res) => {
    if (res && res.data && res.data.data.features.length) {

      let vectSourc = getSourceByData(res.data.data.features);
      let featurelayer = new VectorLayer({
        id: "xzqmid",
        source: vectSourc,
        style: function (feature) {
          if (!store.state.xzq || store.state.xzq === "陕西省") {
            return new Style();
          } else if (store.state.xzq !== feature.get("name")) {
            return new Style({
              fill: new Fill({
                color: [255, 255, 255, 0.3],
              })
           
            });
          } else if (store.state.xzq === feature.get("name")) {
            return new Style({

              stroke: new Stroke({
                color: 'blue',
                width: 1.5,
             
              })
            });
          }
        }
      });
      window.$olMap.addLayer(featurelayer);

    }
  });
};
// 
export const selCityByName = (name) => {
  let ptmlayer = getLayerByid("tmpid");
  ptmlayer.getSource().clear()

  if (name == "陕西省") {
    window.$olMap.getView().setCenter([108.88, 35.9])
    window.$olMap.getView().setZoom(6.3)
    return;
  }
  search({
    layerName: "sx_citygh",
    outFields: "name,code",
    filter: "name ='" + name + "'",
    isReturnGeometry: true,
    isCache: false,
    spatialRel: "INTERSECTS",
  }).then((res) => {
    if (res && res.data && res.data.data.features.length) {
       if (ptmlayer) {
      let vectSourc = getSourceByData(res.data.data.features);
      ptmlayer.setSource(vectSourc);
      ptmlayer.setStyle(
        new Style({
          fill: new Fill({
            color: [0, 0, 255, 0],
          }),
          stroke:new Stroke({
            color: 'blue',
            width: 1.5,
            lineDash:[5]
          })
        })
      );
      window.$olMap.getView().fit(vectSourc.getFeatures()[0].getGeometry(),
        { duration: 1000 })
      }
    }
  });
};

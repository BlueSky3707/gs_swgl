import { showLayerById, hiddenLayerById } from "../mapUtils/baselayer";
import { search } from "../api/postgis";
import { getSourceByData } from "../mapUtils/vectorSourceUtils";
import { getLayerByid, reMoveLayerById } from "../mapUtils/baselayer";
import { Fill, Style, Stroke } from 'ol/style';
import VectorLayer from "ol/layer/Vector";

import store from '@/common/store'


export const selCityByCode = (pCode) => {

  if (pCode == "620400") {
    window.$olMap.getView().setCenter([104.17425,36.545649])
    window.$olMap.getView().setZoom(9)
    return;
  }
  search({
    layerName: "by_xzqh",
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
    layerName: "by_xzqh",
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
          if (!store.state.xzq || store.state.xzq === "白银市") {
            return new Style();
          } else if (store.state.xzq !== feature.get("name")) {
            return new Style({
              fill: new Fill({
                color: [255, 255, 255, .5],
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

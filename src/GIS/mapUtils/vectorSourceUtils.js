import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from "ol/source/Vector";
import { Point } from "ol/geom";
import { Feature } from "ol";
import { citys } from "../config/cityConfig";
export const getSourceByData = (featrues) => {
    let geoData = createGeojonByData(featrues);
    return new VectorSource({
        features: new GeoJSON().readFeatures(geoData),
        crossOrigin: 'anonymous'
    });
}
export const getSourceByData2 = (features) => {

    let pFeatures = [];
    for (let itm of features) {
        if (itm.longitude && itm.latitude) {
            let geo = new Point([Number(itm.longitude), Number(itm.latitude)]);
            pFeatures.push(new Feature({ attributes: itm, geometry: geo }));
        }

    }
    return new VectorSource({
        features: pFeatures,
        crossOrigin: 'anonymous'
    });
};
export const addSourceByData = (layeSourm, datas) => {
    var geogson = new GeoJSON();
    datas.forEach(ite => {
        let pcity = citys.filter((item) => (item.label === ite.REGIONNAME)||(item.label ==="杨凌区"&&ite.REGIONNAME==="杨凌示范区"));
        if (pcity.length&&pcity[0].geojson) {
            var geom = JSON.parse(pcity[0].geojson);
            var fm = geogson.readFeature(geom);
            layeSourm.addFeature(
                new Feature({
                    attributes: ite,
                    geometry: fm.getGeometry(),
                })
            );
        }
    });

}
export const getSourceByDataLngLat = (features,lng,lat) => {

    let pFeatures = [];
    for (let itm of features) {
        if (itm[lng] && itm[lat]) {
            let geo = new Point([Number(itm[lng]), Number(itm[lat])]);
            pFeatures.push(new Feature({ attributes: itm, geometry: geo }));
        }

    }
    return new VectorSource({
        features: pFeatures,
        crossOrigin: 'anonymous'
    });
};
export const getSourceByDataLngLat2 = (features,lng,lat) => {

    let pFeatures = [];
    for (let itm of JSON.parse(JSON.stringify(features)) ) {
        if (itm.attributes[lng] && itm.attributes[lat]) {
            let geo = new Point([Number(itm.attributes[lng]), Number(itm.attributes[lat])]);
            pFeatures.push(new Feature({ attributes: itm.attributes, geometry: geo }));
        }

    }
    return new VectorSource({
        features: pFeatures,
        crossOrigin: 'anonymous'
    });
};
export const getSourceByDataLngLat3 = (features,lng,lat) => {

    let pFeatures = [];
    for (let itm of features) {
        if (itm[lng] && itm[lat]) {
            let geo = new Point([Number(itm[lng]), Number(itm[lat])]);
            pFeatures.push(new Feature({ attributes: itm, geometry: geo }));
        }

    }
    return  pFeatures;
};

export const createGeojonByData = (features) => {
    let pFollect = {
      type: "FeatureCollection",
      features: [],
    };
    let pFeatures = [];
    for (let itm of features) {
      let geo = JSON.parse(itm.geoJson);
      let geoObj = new Object();
      geoObj.type = "Feature";
      geoObj.properties = itm.attributes;
      geoObj.geometry = geo;
      pFeatures.push(geoObj);
    }
    pFollect.features = pFeatures;
    return pFollect;
  };
  
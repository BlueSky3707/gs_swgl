
import {getLayerByid} from "@/GIS/mapUtils/baselayer";
import Overlay from "ol/Overlay";
import store from "@/common/store";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";


export const addCssLayer = (layerid, datas, lon, lat, type) => {

    datas.forEach(item => {
        let doc = document.createElement("div");
        doc.className = `yjsj_point ${type}`;
        doc.innerHTML = `<div class="fg"></div>`

        if (item[lon] && item[lat]) {
            item.lon = Number(item[lon])
            item.lat = Number(item[lat])
            let pOverlayer = new Overlay({
                element: doc,
                id: layerid,
                positioning: "center-center",
                position: [Number(item[lon]), Number(item[lat])],
                offset: [0, 0]
            });
            pOverlayer.setProperties(item);
            window.$olMap.addOverlay(pOverlayer);
            item.ol_uid=pOverlayer.ol_uid
            doc.attribute = item;
            doc.onclick = function (e) {
                let marklayer = getLayerByid("mark");
                marklayer.getSource().clear();

                var item = e.currentTarget;
                console.log("获取空间数据信息：" + layerid);
                console.log()
                
                store.commit('setLayerInfo', {
                   
                    values: {attributes: item.attribute,typeid:layerid}, values_: {attributes: item.attribute,typeid:layerid}
                })
                marklayer.getSource().addFeature(
                    new Feature({
                        attributes: item.attribute,
                        geometry: new Point([Number(item.attribute[lon]), Number(item.attribute[lat])]),
                        fromid: layerid,
                    })
                );

                window.$olMap.getView().animate({
                    center: [item.attribute.lon, item.attribute.lat],
                    zoom: 13,
                    duration: 500,
                });
            }
        }
    });
}
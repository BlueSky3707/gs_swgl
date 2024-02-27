import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {Style, Icon} from "ol/style";
import {reMoveLayerById,getLayerByid} from "@/GIS/mapUtils/baselayer";
import Overlay from "ol/Overlay";
import store from "@/common/store";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";


export const addGif = (layerid, features) => {
    reMoveLayerById(layerid)
    let vectorLayer = new VectorLayer({
        id: layerid,
        zIndex: 100,
        source: new VectorSource({
            features: features
        }),
        style: function (feature) {
            return getStyle(feature)
        }
    })

    window.$olMap.addLayer(vectorLayer)
    return vectorLayer
}
const getStyle = (feature) => {
    gifler(new URL("/img/yj/yjsj2.gif", import.meta.url).href).frames(
        document.createElement('canvas'),
        (ctx, frame) => {
            if (!feature.getStyle()) {
                feature.setStyle(
                    new Style({
                        image: new Icon({
                            img: ctx.canvas,
                            imgSize: [frame.width, frame.height],
                            opacity: 1,
                            scale: [0.2, 0.2],
                        })
                    })
                )
            }
            ctx.clearRect(0, 0, frame.width, frame.height)
            ctx.drawImage(frame.buffer, frame.x, frame.y)
            window.$olMap.render()
        },
        true
    )
}

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
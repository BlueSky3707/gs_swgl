import {createStore} from "vuex"


const store = createStore({
    state: () => ({
        xzq: "",//行政区筛选
        showTuli: true,
        navIndex:1,
        layerInf: null,//属性弹窗1
        layerInf2: null,//属性弹窗2
    }),
    mutations: {
        setxzq(state, payload) {
            state.xzq = payload
        },
        changeTuli(state, payload) {
            state.showTuli = payload
        },
        setLayerInfo(state, payload) {
            state.layerInf = payload
        },
        setLayerInfo2(state, payload) {
            state.layerInf2 = payload
        },
        setNavIndex(state, payload) {
            state.navIndex = payload
        },
    }
})

export default store

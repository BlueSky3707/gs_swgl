export const layers = {
  yzt: [
    {
      //取水口

      layerType: 1,
      layerId: "qskxxid",
      tableName: "by_qskxx",
      renderStyle: {
        scale: [1, 1],
        img: new URL("/layers/dq_ygjc.png", import.meta.url).href,
        type: 0,
        
      },
    },
    {
      //企业信息
      default:true,
      layerType: 1,
      layerId: "byswj_qyxx_vid",
      tableName: "byswj_qyxx_v",
      renderStyle: {
        scale: [1, 1],
        img: new URL("/layers/dq_cljcz.png", import.meta.url).href,
        type: 0,
      
      },
    },
    {
      //监测站
      layerType: 1,
      layerId: "jczid",
      tableName: "by_jczxx",
      renderStyle: {
        scale: [0.6, 0.6],
        img: new URL("/layers/dq_clzlz.png", import.meta.url).href,
        type: 0,
      
      },
    },
  ]
    
    
    
  
};




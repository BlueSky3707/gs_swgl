export const layers = {
  yzt: [
  

    {
      //取水点
      default:true,
      layerType: 1,
      layerId: "qsdid",
      tableName: "sx_ygjcdw",
      renderStyle: {
        scale: [0.8, 0.8],
        img: new URL("/layers/dq_ygjc.png", import.meta.url).href,
        type: 0,
        
      },
    },
  
    {
      //用水企业
      layerType: 1,
      layerId: "ysqyid",
      tableName: "sx_jcjg",
      renderStyle: {
        scale: [0.8, 0.8],
        img: new URL("/layers/dq_cljcz.png", import.meta.url).href,
        type: 0,
      
      },
    },
    {
      //监测站
      layerType: 1,
      layerId: "jczid",
      tableName: "sx_wxjg",
      renderStyle: {
        scale: [0.8, 0.8],
        img: new URL("/layers/dq_clzlz.png", import.meta.url).href,
        type: 0,
      
      },
    },
  ]
    
    
    
  
};




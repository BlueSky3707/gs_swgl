export const layers = {
  yzt: [
    // {
    //   //大气站点
    //   default:true,//该路由下默认加载
    //   layerType: 1, //1为业务图层  0为统计图层 2为聚合图层 3其他接口统计 4其他接口业务图层
    //   layerId: "sx_dqzdid",
    //   tableName: "sx_dqzd",
    //   renderStyle: {
    //     scale: [0.8, 0.8],
    //     imgs: {
    //       50: new URL("/layers/dq_dqzd.png", import.meta.url).href,
    //       "50-100": new URL("/layers/dqliang.png", import.meta.url).href,
    //       "100-150": new URL("/layers/dqqd.png", import.meta.url).href,
    //       "150-200": new URL("/layers/dqzd.png", import.meta.url).href,
    //       "200-300": new URL("/layers/dqyz.png", import.meta.url).href,
    //       "300-500": new URL("/layers/dqzzd.png", import.meta.url).href,
    //       500: new URL("/layers/dqw.png", import.meta.url).href,
    //     },
    //     type: 2, //该处0为SIMPLE渲染，1唯一值渲染
       
    //   },
    // },


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




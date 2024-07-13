

import img4 from "@/assets/TuLi/用水企业.png"
import img5 from "@/assets/TuLi/监测站.png"
import img6 from "@/assets/TuLi/取水点.png"
// import img8 from "@/assets/common/8.png"
export const list = [
    {title: '用水企业', imgs:img4 , active: false, layerid: 'qyxx_poi', router: '/yzt'},
    {title: '取水口', imgs: img6, active: false, layerid: 'qsk_poi', router: '/yzt'},
   
    // {title: '监测站', imgs: img5, active: false, layerid: 'by_jczxx', router: '/yzt'},
    
]

export const tableMLayerid={

    qsk_poi: {title: '取水口',layerid:"qskxxid" },
    qyxx_poi:{title: '用水企业',layerid:"byswj_qyxx_vid" },
    // by_jczxx:{title: '监测站',layerid:"jczid" },

}


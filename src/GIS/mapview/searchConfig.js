

import img4 from "@/assets/common/4.png"
import img5 from "@/assets/common/5.png"
import img6 from "@/assets/common/6.png"
import img8 from "@/assets/common/8.png"
export const list = [
    
    {title: '取水口', imgs: img4, active: false, layerid: 'by_qskxx', router: '/yzt'},
    {title: '水表', imgs: img8, active: false, layerid: 'by_qskjcsb', router: '/yzt'},  
    {title: '用水企业', imgs: img5, active: false, layerid: 'by_qyxx', router: '/yzt'},
    {title: '监测站', imgs: img6, active: false, layerid: 'by_jczxx', router: '/yzt'},
    
]

export const tableMLayerid={

    by_qskxx: {title: '取水口',layerid:"qskxxid" },
    by_qskjcsb: {title: '水表',layerid:"qskjcsbid" },
    by_qyxx:{title: '用水企业',layerid:"ysqyid" },
    by_jczxx:{title: '监测站',layerid:"jczid" },

}
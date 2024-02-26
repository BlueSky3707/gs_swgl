
import img1 from "@/assets/common/1.png"
import img4 from "@/assets/common/4.png"
import img5 from "@/assets/common/5.png"
import img6 from "@/assets/common/6.png"
export const list = [
    {title: '大气站', imgs: img1, active: false, layerid: 'sx_dqzd', router: '/yzt'},
    {title: '取水点', imgs: img4, active: false, layerid: 'sx_jcjg', router: '/yzt'},
    {title: '用水企业', imgs: img5, active: false, layerid: 'sx_wxjg', router: '/yzt'},
    {title: '监测站', imgs: img6, active: false, layerid: 'sx_ygjcdw', router: '/yzt'},
    
]

export const tableMLayerid={
sx_dqzd:{title: '大气站', layerid:"sx_dqzdid" },
sx_jcjg: {title: '取水点',layerid:"qsdid" },
sx_wxjg:{title: '用水企业',layerid:"ysqyid" },
sx_ygjcdw:{title: '监测站',layerid:"jczid" },

}
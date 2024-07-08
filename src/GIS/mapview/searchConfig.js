

import img4 from "@/assets/TuLi/用水企业.png"
import img5 from "@/assets/TuLi/监测站.png"
import img6 from "@/assets/TuLi/取水点.png"
// import img8 from "@/assets/common/8.png"
export const list = [
    
    {title: '取水口', imgs: img6, active: false, layerid: 'by_qskxx', router: '/yzt'},
    // {title: '水表', imgs: img8, active: false, layerid: 'by_qskjcsb', router: '/yzt'},  
    {title: '用水企业', imgs:img4 , active: false, layerid: 'byswj_qyxx_vid', router: '/yzt'},
    {title: '监测站', imgs: img5, active: false, layerid: 'by_jczxx', router: '/yzt'},
    
]

export const tableMLayerid={

    by_qskxx: {title: '取水口',layerid:"qskxxid" },
    // by_qskjcsb: {title: '水表',layerid:"qskjcsbid" },
    byswj_qyxx_v:{title: '用水企业',layerid:"byswj_qyxx_vid" },
    by_jczxx:{title: '监测站',layerid:"jczid" },

}

export const searchlist=[
    {table:"by_qskxx",name:"甘肃稀土新材料股份有限公司",address:"甘肃省白银市靖远县靖远县三滩乡小冰岛",geometry:"POINT(104.665 36.726333)"},
    {table:"by_qskxx",name: "靖远县城市水务运营管理有限公司",address:"甘肃省白银市靖远县乌兰镇红嘴村吴家湾社",geometry:"POINT(104.630028 36.561)"},
    {table:"by_qskxx",name:"靖远县靖丰渠水利管理所",address:"甘肃省白银市白银区四龙镇张家湾",geometry:"POINT(104.398417 36.399278)"},
    {table:"by_qskxx",name:"靖远县沣泰渠水利管理所",address:"甘肃省白银市靖远县糜滩乡下滩河湾",geometry:"POINT(104.699028 36.62725)"},
    {table:"by_qskxx",name: "靖远县永固渠水利管理所",address:"甘肃省白银市靖远县糜滩镇独石村中沟口",geometry:"POINT(104.621278 36.5515)"},
    {table:"by_qskxx",name:"靖远县水利局发源渠水管所",address:"甘肃省白银市靖远县双龙乡仁和村车木峡红崖山下",geometry:"POINT(104.349917 36.129194)"},

{table:"by_jczxx",name:"靖远县沣泰渠水利监测站",address:"甘肃省白银市靖远县糜滩乡下滩河湾",geometry:"POINT(103.87635365809088 37.03154614231361)"},
{table:"by_jczxx",name:"靖远县沣泰渠水利监测站",address:"甘肃省白银市靖远县糜滩乡下滩河湾",geometry:"POINT(104.15475059577302 37.25521547686166)"},
{table:"by_jczxx",name:"靖远县沣泰渠水利监测站",address:"甘肃省白银市靖远县糜滩乡下滩河湾",geometry:"POINT(104.08336676559811 36.59610477824667)"},
{table:"by_jczxx",name:"靖远县沣泰渠水利监测站",address:"甘肃省白银市靖远县糜滩乡下滩河湾",geometry:"POINT(104.15950951778468 36.51282364304261)"},
{table:"by_jczxx",name:"靖远县沣泰渠水利监测站",address:"甘肃省白银市靖远县糜滩乡下滩河湾",geometry:"POINT(104.30465663914033 36.44619873487936)"},
{table:"by_jczxx",name:"靖远县沣泰渠水利监测站",address:"甘肃省白银市靖远县糜滩乡下滩河湾",geometry:"POINT(104.59257142084579 36.53661825310091)"},


{table:"byswj_qyxx_v",name:"白银昌元化工有限公司",address:"银山路111号",geometry:"POINT(104.186741 36.568739)"},
{table:"byswj_qyxx_v",name:"白银铜城热力公司",address:"长安路1号",geometry:"POINT(104.147013 36.540068)"},
{table:"byswj_qyxx_v",name:"甘肃宏达铝型材有限公司",address:"万盛路附近",geometry:"POINT(104.12284 36.54614)"},
{table:"byswj_qyxx_v",name:"中材甘肃水泥有限责任公司",address:"新建西路88号",geometry:"POINT(104.127882 36.59161)"},
{table:"byswj_qyxx_v",name:"白银矿冶职业学院",address:"南环路556号",geometry:"POINT(104.134312 36.52622)"}

]
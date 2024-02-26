import axios from 'axios'

export const wryQyCbBjData = (params)=>{
    return Promise.all([
        axios({
            url:'/ypi/interfa/bpcb/wryQyCbBjData',
            params
        }),
        axios({
            url:'/ypi/interfa/bpcb/airCbBjData',
            params
        }),
        axios({
            url:'/ypi/interfa/bpcb/waterCbBjData',
            params
        })
    ])
}
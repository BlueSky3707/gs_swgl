const tools = {
    install(app) {
        const getSrc = (url) => {
            if (url[0] === '/') {
                url = url.substr(1);
            }
            return new URL(`../../assets/${url}`, import.meta.url).href
        };
        const setColor_DQ_Wrw = (name,opticy) => {
           const temp  = {
               PM2_5:'#5DCB82',
               PM10:'#55C1C8',
               SO2:'#6783E9',
               NO2:'#EFC740',
               CO:'#F17676',
               O3:'#F878C4',
           }
            return opticy ? temp[name] + opticy : temp[name]
        };
        app.config.globalProperties.getSrc = getSrc
        app.config.globalProperties.setColor_DQ_Wrw = setColor_DQ_Wrw
    }
}

export default tools

import router from './router'
import store from "./store";
import components from './components'
import ElementPlus from 'element-plus'
import directives from "./directives"
import tools from "./tools"
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './style/index.scss'
import './style/yjsj.scss'

const common = {
    install(app){
        app.use(router)
        app.use(store)
        app.use(components)
        app.use(directives)
        app.use(tools)
        app.use(ElementPlus,{
            locale: zhCn,
            size: 'default'
        })
    }
}
export default common

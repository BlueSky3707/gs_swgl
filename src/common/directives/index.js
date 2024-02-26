import draggable from './dragable'
// 自定义指令
const directives = {
    draggable,
}
export default {
    install(app) {
        Object.keys(directives).forEach((key) => {
            app.directive(key, directives[key])
        })
    }
}

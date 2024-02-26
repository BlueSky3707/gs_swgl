import Box from './Box'
import JscBox from './JscBox'

const components = {
    install(app){
        app.component('Box',Box)
        app.component('JscBox',JscBox)
    }
}

export default components

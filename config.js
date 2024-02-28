const {resolve} = require('path')

module.exports = {
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            'img': resolve(__dirname, 'src/assets'),
        },
        extensions: [".js", ".jsx", ".scss", ".vue", ".css", ".json"],
    },
    server: {
        host: '0.0.0.0',
        proxy: {
            "/dbapi": {
                target: "http://10.61.5.63:8086/rest/",
                changeOrigin: true,
                rewrite: (path) => path.replace("/dbapi", ""),
            },
            "/sapi": {
                target: "http://10.61.5.84:9001",
                changeOrigin: true,
                rewrite: (path) => path.replace("/sapi", ""),
            }
           
         
         

        },
    },
    css: {
        requireModuleExtension: true,
    }
}

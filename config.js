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
                target: "http://114.116.91.200:8085/rest",
                changeOrigin: true,
                rewrite: (path) => path.replace("/dbapi", ""),
            },
            "/sapi": {
                target: "http://114.116.91.200:9000",
                changeOrigin: true,
                rewrite: (path) => path.replace("/sapi", ""),
            },
            "/ngin84gis": {
                target: "hhttp://114.116.91.200:8401",
                changeOrigin: true,
                rewrite: (path) => path.replace("/ngin84gis", ""),
            },
           
         
         

        },
    },
    css: {
        requireModuleExtension: true,
        preprocessorOptions: {
            scss: {
                additionalData: `
                    $title-color : #21CAFF;
                    $text-color : #fff;
                    $sub-text-color : rgba(255,255,255,0.3);
                `
            }
        }
    }
}

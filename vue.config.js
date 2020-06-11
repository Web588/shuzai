
module.exports = {
    devServer: {
        open: true,
        host: "0.0.0.0", //本地真机测试
        port: 8008,
        https: false,
        hotOnly: false,
        useLocalIp: true,
        disableHostCheck: true,
        proxy: {
            "/api": {
                target: "http://180.76.150.241:8080",
                changeOrigin: true,
                logLevel: "debug",
                pathRewrite: {
                    "^/api": "http://180.76.150.241:8080"
                }
            },
            "/content": {
                target: "http://180.76.150.241:8080",
                secure: false,
                changeOrigin: true,
                logLevel: "debug",
                pathRewrite: {
                    "^/content": "http://180.76.150.241:8080"
                }
            }
        }
    }
}
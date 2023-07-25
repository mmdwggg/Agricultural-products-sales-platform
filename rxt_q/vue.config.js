var webpack = require('webpack')

module.exports = {
    publicPath: './',
    devServer: {

        host: "0.0.0.0",

        port: "8081", // 代理端口

    },
    configureWebpack: {

        plugins: [
            new webpack.ProvidePlugin({
                // 在这儿添加下面两行
                'window.Quill': 'quill/dist/quill.js',
                'Quill': 'quill/dist/quill.js'
            })
        ]
    }
}
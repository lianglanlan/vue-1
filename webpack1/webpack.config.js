const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: {
        open: true,
        port: 3000,
        contentBase: 'src',
        hot: true
    },
    plugins: [
        // new HtmlWebpackPlugin(),  //直接引用会生成空的index.html，其中引入output中的文件bundle.js
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
    ],
    module: {
        rules: [ //所有第三方模块的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less/,use:['style-loader', 'css-loader','less-loader']},
            { test: /\.scss/,use:['style-loader', 'css-loader','sass-loader']},
        ]
    }
}
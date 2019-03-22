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
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            {
                test: /\.(jpg|png|git|bmp|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: '18772',
                            name: '[hash:8]-[name].[ext]'
                        }
                    }
                ]
            },
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    }
}
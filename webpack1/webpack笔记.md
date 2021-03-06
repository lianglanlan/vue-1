# webpack-dev-server 使用
可以实现代码自动打包变异功能
- 本地安装 npm i webpack-dev-server -D(全局安装webpack后也要本地安装，否则会报错)
- 第一种使用方式： 在package.json中添加命令（推荐）
```
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "webpack-dev-server --open --port 3000 --contentBase src --hot"
    },
```
    之后使用npm run dev
- 第二种使用方式：在webpack.config.js中进行配置，相对麻烦些  
    ```
        devServer:{
            open: true,
            port: 3000,
            contentBase: 'src',
            hot: true
        }
    ```
    配置好后，在package.json中添加
    ```
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "webpack-dev-server"
    }
    ```

    webpack-dev-server打包生成的bundle.js文件并没有存到真实的磁盘中，而是直接托管到了电脑的内存中，所以我们在项目根目录中找不到打包好的bundle.js
    
    我们可以认为webpack-dev-server把打包好的文件以虚拟的形式，托管到项目的根目录中，虽然看不到，但是可以认为和node_modules文件夹平级，有一个文件是bundle.js。

    为什么不把打包好的文件放到物理磁盘中而是托管到电脑的内存中。因为快。物理磁盘再快也会有转速的限制

## open
设置open为true时，打包完后会直接打开浏览器   
`webpack-dev-server --open`  
可设置特定浏览器打开  (如果没有设置，使用电脑中默认浏览器打开)  
`webpack-dev-server --open 'Google Chrome'`  
`webpack-dev-server --open 'Safari'`  

## port
指定要监听请求的端口号，默认为8080  
`webpack-dev-server --port 3000`

## contentBase
使用浏览器打开时需要展示的路径
`webpack-dev-server --open --port 3000 --contentBase src`  
上面代码运行会打开src目录中的index.html

## hot
对代码进行修改并保存后，Webpack 将对代码重新打包，并将新的模块发送到浏览器端，浏览器通过新的模块替换老的模块，这样在不刷新浏览器的前提下就能够对应用进行更新。例如，在开发 Web 页面过程中，当你点击按钮，出现一个弹窗的时候，发现弹窗标题没有对齐，这时候你修改 CSS 样式，然后保存，在浏览器没有刷新的前提下，标题样式发生了改变。感觉就像在 Chrome 的开发者工具中直接修改元素样式一样。

# 插件(plugins)
## htmlWebpackPlugin
使用这个插件，会自动生成html文件并将打包好的js插入文件
### 安装
```
npm install --save-dev html-webpack-plugin
```
### 使用
接下来在webpack的配置文件webpack.config.js中进行导入并使用
> webpack.config.js
```
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

    ]
}
```
更多配置可查看 [htmlWebpackPlugin github文档](https://github.com/jantimon/html-webpack-plugin)    [简书文章](https://www.jianshu.com/p/c0e1fc31940b)

# loader
可以在使用import或加载模块时进行预处理。  
比如在页面中引入css文件，通常直接在页面中使用link标签引入。使用loader后可以在JS模块中使用import引入  
新建index.css并添加样式
```
li{
    list-style: none;
}
```
在 mian.js 文件中导入
```
import './css/index.css'
```
保存后发现命令行报错并提示`You may need an appropriate loader to handle this file type`。  
因为webpack默认只能打包处理js类型的文件。如果需要处理非js类型的文件，需要手动安装一些第三方加载器loader 
webpack处理第三方加载器过程：  
- 1、发现要处理的文件类型不是js，然后去配置文件中查找有没有对应的第三方loader规则   
- 2、如果能找到对应的规则，就会调用对应的loader处理这种文件类型  
- 3、在调用loader时是从右到左调用
- 4、当最后的一个loader调用完毕，会把处理的结果交给webpack进行打包处理，然后输出到bundle.js文件中
## style-loader和css-loader
### 安装
```
npm install style-loader css-loader --save-dev
```
### 使用
在`webpack.config.js`文件中，新增一个`module`的配置节点，它是一个对象，其中有一个rules数组属性，其中存放所有第三方文件的匹配和处理规则
```
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
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    }
}
```
## less-loader
当我们想引入less文件时使用  
新建index.less文件并添加需要的样式，在main.js中引用。命令行又会提示我们需要合适的loader处理
### 安装
```
npm install --save-dev less-loader less
```
### 使用
在配置文件中新建规则，
```
module: {
    rules: [ //所有第三方模块的匹配规则
        { test: /\.less/,use:['style-loader', 'css-loader','less-loader']}
    ]
}
```
需要与`style-loader`,`css-loader`链式使用  
之后运行npm run dev ，导入成功，样式生效
## sass-loader
### 安装
`npm install sass-loader node-sass webpack --save-dev`
### 使用
```
module: {
    rules: [ //所有第三方模块的匹配规则
        { test: /\.scss/,use:['style-loader', 'css-loader','sass-loader']},
    ]
}
```
## url-loader

在css文件中添加html元素的背景图，使用url，在webpack中会报错，可以借助url-loader处理
默认情况下，webpack不能处理css中的url地址，例如图片和字体库
### 安装
```
npm install --save-dev url-loader
```  
### 使用
```
 module: {
    rules: [ //所有第三方模块的匹配规则
        { test: /\.scss/, use: ['style-loader', 'css-loader', 'sass-loader'] },
        { test: /\.(jpg|png|git|bmp|jpeg)$/, use: 'url-loader' }
    ]
}
```
因为之前的loader数目较多，在use属性中，需要通过数组的方式进行传递，如果只有一个loader，可以直接使用字符串的方式进行传递  
运行npm run dev，报错消失，查看index.html的元素，发现背景图url里是base64格式的图片，并没有使用之前在Css中写入的路径。可以借助loader的参数进行修改  
传参数的两种方式：
- 1、和http请求参数类似
```
    { test: /\.(jpg|png|git|bmp|jpeg)$/, use: 'url-loader?limit=18773' }
```
- 2、通过对象的方式
### 使用案例：webpack中使用bootstrap
#### 安装bootstrap
```
npm i bootstrap@3.3.7 -S
```
#### 引入css
在main.js中使用import引入
```
import 'bootstrap/dist/css/bootstrap.css'
```
**注意：** 如果要通过路径的方式引入node_modules中相关的文件，可以直接省略node_modules这一层目录，直接写包的名称，后面加上具体的文件路径 
运行npm run dev报错，因为bootstrap中引入了字体文件，所以需要在配置文件中进行修改
```
    {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'}
```

### 选项
#### limit
给定的值是图片字节大小。如果引用的图片大于或等于limit值，则不会被转为base64格式的字符串（url-loader会调用file-loader进行处理，参数也会直接传给file-loader，所以需要安装[file-loader](##file-loader)），如小于，则会转为base64格式

## file-loader
### 安装
```
npm install --save-dev file-loader
```
### 使用
默认情况生成文件的文件名为哈希值
一般直接使用url-loader，只是安装file-loader，但不会在配置文件中引入。
### 选项
#### name
为文件配置文件名
- name 文件名
- ext 后缀名
- path 路径
- hash 哈希值
```
    { test: /\.(jpg|png|git|bmp|jpeg)$/, use: 'url-loader?limit=18772&name=[name].[ext]' }
```
仍然调用`url-loader`来使用。现在的参数表示，如果文件大小大于或等于18772字节则不会转成base64格式，并且文件名与后缀名仍保持不变  
如果引入了两个图片，路径不同但是文件名相同，例如：
```
.box1{
    width: 300px;
    height: 300px;
    background: url(../images/1.jpeg)
}

.box2{
    width: 300px;
    height: 300px;
    background: url(../images2/1.jpeg)
}
```
`npm run dev`后发现，两个图片显示的都是 `images2/1.jpeg` 的图片。这是因为file-loader都会将图片放入项目的根目录中，也就是`http://localhost:3000/1.jpeg`，所以后一个图片路径就会将前一个图片进行覆盖。可在配置中加hash值路径
```
    { test: /\.(jpg|png|git|bmp|jpeg)$/, use: 'url-loader?limit=18772&name=[hash:8]-[name].[ext]' }
```
## babel-loader
webpack中默认只能处理一部分ES6新语法，一些更高级的ES6或者ES7语法不能处理的，需要借助于第三方loader帮助处理
### 安装
```
npm install babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env -D
```
### 使用
```
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```
必须把`node_modules`目录通过`exclude`排除，否则会将`node_modules`中js文件都打包，非常慢  

如果使用了ES6新语法class类，需要安装`@babel/plugin-proposal-class-properties`，并在配置文件中添加：
```
npm install @babel/plugin-proposal-class-properties -D
```
```
use: {
    loader: 'babel-loader',
    options: {
        presets: ['@babel/preset-env'],
        plugins: ["@babel/plugin-proposal-class-properties"]
    }
}
```

建议安装`@babel/plugin-transform-runtime`避免模块代码的重复引入(必须配合@babel/runtime使用)
```
npm install @babel/plugin-transform-runtime -D
npm install @babel/runtime -save
```
```
use: {
    loader: 'babel-loader',
    options: {
        presets: ['@babel/preset-env'],
        plugins: ["@babel/plugin-proposal-class-properties","@babel/plugin-transform-runtime"],
    }
}
```
也可以将配置项都提取出来放在`.babelrc`文件中。在项目根目录新建`.babelrc`文件，文件内容如下（json格式）：

```
{
    "presets": ["@babel/preset-env"],
    "plugins": ["@babel/plugin-proposal-class-properties","@babel/plugin-transform-runtime"]
}
```
或者使用`babel.config.js`文件进行配置（babel 7.x新功能），在项目根目录创建一个名为`babel.config.js`文件，配置如下：
```
module.exports = function (api) {
    api.cache(true)
    const presets = ["@babel/preset-env"]
    const plugins = ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"]

    return {
        presets,
        plugins
    }
}
```
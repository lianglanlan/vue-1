将`webpack1`目录完全拷贝，并删除src中css与images文件，学习如何在webpack构建的项目中使用vue

- 1.安装vue
```
npm i vue -S
```
- 2、在入口文件main.js中引用
```
import Vue from 'vue'

var vm = new Vue({
    el: '#app',
    data: {
        msg: 123
    }
})
```
- 3、在html文件中引用
```
<p>{{msg}}</p>
```
使用`npm run dev`运行，会有报错
![image](https://raw.githubusercontent.com/lianglanlan/readme_imgs/master/1.png)

这是因为在webpack中使用import引入的vue功能不完整，只提供了`runtime-only`方式，并没有提供script标签直接引入时的使用方式  
回顾包的查找规则：找项目根目录中有没有 node_modules 文件夹；在node_modules根据包名找对应的文件夹； 在对应包名的文件夹下找`package.json`文件，并在其中找到一个`main`属性，指定了这个包在被加载的时候的入口文件
```
"main": "dist/vue.runtime.common.js",
```
上面代码为vue包内的引入文件。需要修改为vue.js。可以在webpack.config.js文件中进行修改，使用`resolve`进行配置
```
module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: {
        ...
    },
    plugins: [
        ...
    ],
    module: {
        ...
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.js "
        }
    }
}
```
配置好后重新运行`npm run dev`不再报错  
如果想使用runtime-only模式渲染组件，需使用vue文件加载，如下：  
添加vue组件`login.vue`
```
<template>
    <div>
        <h1>登录组件</h1>
    </div>
</template>
```
在main.js中引入
```
import login from './login.vue'
var vm = new Vue({
    el: '#app',
    data: {
        msg: 123
    },
    comments:{
        login
    }
})
```
终端报错`You may need an appropriate loader to handle this file type`。这是因为webpack无法打包.vue结尾的文件，需要使用vue-loader，安装vue-loader并配置（必须同步安装vue-template-compiler）
```
npm i vue-loader vue-template-compiler -D
```
在配置文件中修改，必须添加指定的插件
```
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```
重新运行`npm run dev`还是报错，`You are using the runtime-only build of Vue where the template compiler is not available`。应该使用render渲染组件
```
var vm = new Vue({
    el: '#app',
    data: {
        msg: 123
    },
    render(c) {
        return c(login)
    }
})


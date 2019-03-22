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
![image](http://github.com/lianglanlan/readme_imgs/raw/master/1.png)

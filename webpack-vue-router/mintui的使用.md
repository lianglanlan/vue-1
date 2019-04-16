## 安装
```
npm i mint-ui -S
```
## 引用
### 完整引入
在main.js中引入
```
//导入所有的mintUI组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
```
如果已经导入所有的组件，则在使用css组件时不用再额外导入。使用js组件时，仍需导入
```
import { Toast } from "mint-ui";
export default {
  data() {
    return {};
  },
  methods: {
    show() {
      Toast("提示信息");
    }
  }
}
```
### 按需导入：
首先安装`babel-plugin-component`，
```
npm install babel-plugin-component -D
```
修改 babel.config.js
```
const plugins = [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-runtime",
        //下面一部分是新加入的
        ["component",
            {
                "libraryName": "mint-ui",
                "style": true
            }
        ]]
```
```
//文档中的修改方法
{
  "presets": [
    ["es2015", { "modules": false }]
  ],
  "plugins": [["component", [
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ]]]
}
```
与文档有些不同，文档中在数组中，"component"后跟着的又是一个数组，直接这样引入会报错
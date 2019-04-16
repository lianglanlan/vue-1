> MUI不同于Mint-UI,MUI只是开发出来的一套好用的代码片段，里面提供了配套的样式、配套的HTML代码段，类似于Bootstrap。而Mint-UI是真正的组件库，是使用VUE封装出来的成套的组件，可以无缝的和VUE项目进行集成开发。因此从体验上来说Mint-UI的体验更好。  
MUI不能使用npm包下载，需要手动从github上下载现成的包并解压，手动拷贝到项目中

[官网首页](https://dev.dcloud.net.cn/mui/)

在github上download压缩包，解压。

在项目中src文件夹下新建文件夹lib存放手动拷贝的第三方包，将解压后的MUI包中dist文件放到lib文件夹中，并重命名为
mui

在main.js中引入
```
import './lib/mui/css/mui.min.css'
```
之后按照MUI的组件写html结构即可
```
<button type="button" class="mui-btn mui-btn-royal">紫色</button> 
```

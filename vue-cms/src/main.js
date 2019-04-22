//入口文件
import Vue from 'vue'
import App from './App.vue'
import mui from './lib/mui/css/mui.min.css'

//按需导入mint-ui中的组件
import { Header } from 'mint-ui'
Vue.component('mt-header', Header);
new Vue({
    el: '#app',
    render:c=>c(App)
})
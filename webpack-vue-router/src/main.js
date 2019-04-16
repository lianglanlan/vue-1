import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入所有的mintUI组件
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)

//按需导入
import { Button } from 'mint-ui'
Vue.component('mybtn', Button)
//导入bootstrap样式
import 'bootstrap/dist/css/bootstrap.css'

import './css/app.css'

import App from './App.vue'

import router from './router.js'
var vm = new Vue({
    el: '#app',
    render: c => c(App),
    router
})
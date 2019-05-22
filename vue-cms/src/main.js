//入口文件
import Vue from 'vue'
import App from './App.vue'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router'

//按需导入mint-ui中的组件
import { Header,Swipe, SwipeItem, Toast } from 'mint-ui'

Vue.component('mt-header', Header);
Vue.component('mt-swipe', Swipe);
Vue.component('mt-swipe-item', SwipeItem);
Vue.prototype.$toast = Toast;

//导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = '/root'

new Vue({
    el: '#app',
    render:c=>c(App),
    router
})
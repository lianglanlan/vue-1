//入口文件
import Vue from 'vue'
import App from './App.vue'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router'

//全部导入
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

//导入axios
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/84156'
Vue.prototype.$http = axios

//导入缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入时间插件,定义全局时间过滤器
import moment from 'moment'
Vue.filter('dateFormat', (dataStr, pattern = 'YYYY/MM/DD HH:mm:ss') => {
    return moment(dataStr).format(pattern)
})

new Vue({
    el: '#app',
    render: c => c(App),
    router
})
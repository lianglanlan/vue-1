//入口文件
import Vue from 'vue'
import App from './App.vue'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router'

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

let car = JSON.parse(localStorage.getItem('car') || '[]')
const store = new Vuex.Store({
    state: {
        car
    },
    mutations: {
        addTocar(state, goodsinfo) {    //点击加入购物车，保存商品信息
            const flag = state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    return true
                }
            })
            console.log(flag)
            if (!flag) {
                state.car.push(goodsinfo)
            }

            //当更新car之后，把car数组存储到本地的localStorage中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {  //修改购物车中商品数量值
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFromCar(state, id) {
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: {
        gerAllCount(state) {
            let c = 0
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            let o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state) {
            let o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state) {
            let o = {
                count: 0,
                amount: 0
            }
            state.car.forEach(item => {
                if(item.selected){
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    },

})

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
    router,
    store
})
## 安装
```
npm i vue-router -S
```
## 引用
```
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```
## 创建路由对象
```
var router = new VueRouter({
    routes: [
        { path: '/account', component: account },
        { path: './goodslist', component: goodslist }
    ]
})

```
## 将路由对象挂载到vm上
```
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})
```
## 页面中引入
在vm的render函数中所渲染的组件里添加如下代码
```
<template>
    <div>
        <h1>这是App组件</h1>

        <router-link to="/account">account</router-link>
        <router-link to="/goodslist">goodslist</router-link>

        <router-view></router-view>
    </div>
</template>
```
## 将路由模块抽离
在src目录下创建router.js，将main.js中使用到的路由组件及路由定义部分提取到router.js中，并使用export default暴露出去
```
import VueRouter from 'vue-router'

import account from './main/Account.vue'
import goodslist from './main/Goodlist.vue'
import login from './subcom/login.vue'
import register from './subcom/register.vue'

var router = new VueRouter({
    routes: [
        {
            path: '/account',
            component: account,
            children: [
                { path: 'login', component: login },
                { path: 'register', component: register }
            ]
        },
        { path: '/goodslist', component: goodslist }
    ]
})

export default router
```
在main.js中引入
```
import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import app from './App.vue'

import router from './router.js'
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})
```

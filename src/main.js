// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'
import './common/less/index.less'

// 全局注册路由
Vue.use(VueRouter)

// 全局注册资源
Vue.use(VueResource)

let vr = new VueRouter({
        linkActiveClass: 'active',
        routes: [{
            path: '/goods',
            component: goods
        }, {
            path: '/ratings',
            component: ratings
        }, {
            path: '/seller',
            component: seller
        }]
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    render: c => c(App),
    router: vr
})

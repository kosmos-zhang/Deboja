import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [{
        path: '/',
        name: "微信",
        component: resolve => require(["../components/Hello.vue"], resolve)
    },
]
export default new Router({
    base: "/wechatweb/",
    routes,
})

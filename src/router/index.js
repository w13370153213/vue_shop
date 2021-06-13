/* eslint-disable eol-last */
/* eslint-disable indent */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import Users from '@/components/user/users.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/Home',
        component: Home,
        redirect: '/welcome',
        children: [
            { path: '/welcome', component: Welcome },
            { path: '/users', component: Users }
        ]
    }
]

const router = new VueRouter({
        routes
    })
    // 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to将要访问的路径 form从哪个路径跳转而来 next是一个函数表示放行
    if (to.path === '/login') return next()
        // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
        // 判断token是否存在
    if (!tokenStr) return next('/login')
    next()
})

export default router
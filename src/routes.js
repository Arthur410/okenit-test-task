import {createRouter, createWebHistory} from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Post from './pages/App-post'
import Home from './pages/App-home'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/user/:id/post/:postId',
        name: 'user',
        component: Post,
        props: true,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
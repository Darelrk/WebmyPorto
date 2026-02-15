import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

const routes = [
    { path: '/', component: () => import('./pages/Home.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('./pages/NotFound.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(_to, _from, savedPosition) {
        if (savedPosition) return savedPosition
        return { top: 0 }
    },
})

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(MotionPlugin)
app.mount('#app')

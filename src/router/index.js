import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/search',
    component: () => import('@/views/search')
  }, {
    path: '/login',
    component: () => import('@/views/login')
  }, {
    path: '/',
    name: 'tab-bar',
    component: () => import('@/views/tab-bar'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]

  }]

const router = new VueRouter({
  routes
})

export default router

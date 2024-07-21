import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/infos',
      name: 'Infos',
      component: () => import('../views/Infos.vue')
    },
    {
      path: '/infos_normal',
      name: 'Infos_normal',
      component: () => import('../views/Infos_normal.vue')
    },
    {
      path: '/tutorial',
      name: 'Tutorial',
      component: () => import('@/views/Tutorial.vue')
    },
    {
      path: '/record',
      name: 'Record',
      component: () => import('../views/Record.vue')
    },
    {
      path: '/record_camera',
      name: 'Record_camera',
      component: () => import('../views/Record_camera.vue')
    },
    {
      path: '/thanks',
      name: 'Thanks',
      component: () => import('../views/Thanks.vue')
    },
    {
      path: '/result',
      name: 'Result',
      component: () => import('../views/Result.vue')
    },
    {
      path: '/mJOA',
      name: 'MJOA',
      component: () => import('../views/Qs_mJOA.vue')
    },
    {
      path: '/record_video',
      name: 'Record_video',
      component: () => import('../views/Record_video.vue')
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('../views/Test.vue')
    },
    {
      path: '/test1',
      name: 'Test1',
      component: () => import('../views/Test1.vue')
    }
  ]
})

export default router

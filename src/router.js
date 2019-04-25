import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/join',
      name: 'join',
      component: () => import(/* webpackChunkName: "login" */ './views/Join.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import(/* webpackChunkName: "news" */ './views/NewsFeed.vue'),
      props: {
        bottomNavShow: true
      }
    },
    {
      path: '/photos',
      name: 'photos',
      component: () => import(/* webpackChunkName: "photos" */ './views/Photos.vue'),
      props: {
        bottomNavShow: true
      }
    },
    {
      path: '/colors',
      name: 'colors',
      component: () => import(/* webpackChunkName: "colors" */ './views/Colors.vue'),
      props: {
        bottomNavShow: true
      }
    }
  ]
})

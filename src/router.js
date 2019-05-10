import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import News from './views/News.vue'
import NewsFeed from './views/NewsFeed.vue'
import Article from './views/Article.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // props: {
      //   hideNav: 'purple',
      //   hideTopNav: true,
      //   hideBottomNav: true
      // }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      // props: {
      //   default: {
      //     hideNav: true,
      //     hideTopNav: true,
      //     hideBottomNav: true
      //   }
      // }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
      // props: {
      //   default: {
      //     hideNav: true,
      //     hideTopNav: true,
      //     hideBottomNav: true
      //   }
      // }
    },
    {
      path: '/join',
      name: 'join',
      component: () => import(/* webpackChunkName: "login" */ './views/Join.vue'),
      // props: {
      //   default: {
      //     hideNav: true,
      //     hideTopNav: true,
      //     hideBottomNav: true
      //   }
      // }
    },
    {
      path: '/news',
      component: News,
      // component: () => import(/* webpackChunkName: "news" */ './views/News.vue'),
      children: [
        {
          path: 'latest',
          component: NewsFeed
          // component: () => import(/* webpackChunkName: "newsLatest" */ './views/NewsFeed.vue'),
        },
        {
          path: 'article/:id',
          component: Article

          // component: () => import(/* webpackChunkName: "singleArticle" */ './views/Article.vue')
        },
      ]
    },

    {
      path: '/photos',
      component: () => import(/* webpackChunkName: "photos" */ './views/Photos.vue')
    },
    {
      path: '/colors',
      component: () => import(/* webpackChunkName: "colors" */ './views/Colors.vue')
    }
  ]
})

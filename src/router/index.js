import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Ticket from '@/components/Ticket'
import Shop from '@/components/Shop'
import HotMovie from '@/components/HotMovie'
import MovieComing from '@/components/MovieComing'
import MovieDetail from '@/components/MovieDetail'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Search from '@/components/Search'
import Trailer from '@/components/Trailer'
import Video from '@/components/Video'

Vue.use(Router)

export default new Router({
    mode: 'history',// 美化地址栏；
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
        path: '/ticket',
        name: 'Ticket',
        component: Ticket
    },
    {
        path: '/shop',
        name: 'Shop',
        component: Shop,
    },
    {
        path: '/hotMovie',
        name: 'HotMovie',
        component: HotMovie
    },
    {
        path: '/movieComing',
        name: 'MovieComing',
        component: MovieComing
    },
      {
          path: '/movieDetail/:movieId',
          name: 'MovieDetail',
          component: MovieDetail
      },
      {
          path: '/login',
          name: 'Login',
          component: Login
      },
      {
          path: '/register',
          name: 'Register',
          component: Register
      },
      {
          path: '/search',
          name: 'Search',
          component: Search
      },
      {
          path: '/trailer/:id',
          name: 'Trailer',
          component: Trailer
      },
      {
          path: '/video/:id/:num',
          name: 'Video',
          component: Video
      }

  ]
})

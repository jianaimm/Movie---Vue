import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Ticket from '@/components/Ticket'
import Shop from '@/components/Shop'
import Broadcast from '@/components/Broadcast'
import User from '@/components/User'
import HotMovie from '@/components/HotMovie'
import MovieComing from '@/components/MovieComing'
import MovieDetail from '@/components/MovieDetail'

Vue.use(Router)

export default new Router({
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
        path: '/broadcast',
        name: 'Broadcast',
        component: Broadcast
    },
    {
        path: '/user',
        name: 'User',
        component: User
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
      }

  ]
})

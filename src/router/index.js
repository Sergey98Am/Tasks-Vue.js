import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/auth'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import ForgotPassword from '@/components/ForgotPassword'
import ResetPassword from '@/components/ResetPassword'
import VerifyEmail from '@/components/VerifyEmail'
import LoginGoogle from '@/components/LoginGoogle'
import LoginFacebook from '@/components/LoginFacebook'
import Profile from '@/components/Profile'
import Boards from '@/components/Boards'
import SingleBoard from '@/components/SingleBoard/SingleBoard.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        guest: true
      }
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPassword,
      meta: {
        guest: true
      }
    },
    {
      path: '/verify-email',
      name: 'VerifyEmail',
      component: VerifyEmail,
      meta: {
        guest: true
      }
    },
    {
      path: '/authorize/google/callback',
      name: 'LoginGoogle',
      component: LoginGoogle,
      meta: {
        guest: true
      }
    },
    {
      path: '/authorize/facebook/callback',
      name: 'LoginFacebook',
      component: LoginFacebook,
      meta: {
        guest: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        auth: true
      }
    },
    {
      path: '/boards',
      name: 'Boards',
      component: Boards,
      meta: {
        auth: true
      }
    },
    {
      path: '/boards/:id',
      name: 'SingleBoard',
      component: SingleBoard,
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!store.getters.get_loggedIn) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!store.getters.get_loggedIn) {
      next()
    } else {
      next({
        path: '/profile'
      })
    }
  } else {
    next()
  }
})

export default router

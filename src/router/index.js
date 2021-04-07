import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/user'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/user/Register.vue'
import Login from '@/components/user/Login.vue'
import ForgotPassword from '@/components/user/ForgotPassword.vue'
import ResetPassword from '@/components/user/ResetPassword.vue'
import VerifyEmail from '@/components/user/VerifyEmail.vue'
import LoginGoogle from '@/components/user/LoginGoogle.vue'
import LoginFacebook from '@/components/user/LoginFacebook.vue'
import Profile from '@/components/user/Profile.vue'
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

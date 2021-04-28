import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/user'
import Admin from '@/layouts/Admin.vue'
import Permissions from '@/views/admin/user-management/Permissions.vue'
import Roles from '@/views/admin/user-management/Roles.vue'
import Users from '@/views/admin/user-management/Users.vue'
import User from '@/layouts/User.vue'
import Home from '@/views/Home'
import Register from '@/views/user/auth/Register.vue'
import Login from '@/views/user/auth/Login.vue'
import ForgotPassword from '@/views/user/auth/ForgotPassword.vue'
import ResetPassword from '@/views/user/auth/ResetPassword.vue'
import VerifyEmail from '@/views/user/auth/VerifyEmail.vue'
import LoginGoogle from '@/views/user/auth/LoginGoogle.vue'
import LoginFacebook from '@/views/user/auth/LoginFacebook.vue'
import Profile from '@/views/user/Profile.vue'
import Boards from '@/views/user/Boards.vue'
import SingleBoard from '@/views/user/SingleBoard/SingleBoard.vue'
import InviteToBoard from '@/views/user/InviteToBoard.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        auth: true
      },
      children: [
        {
          path: '/admin/permissions',
          name: 'Permissions',
          component: Permissions
        },
        {
          path: '/admin/roles',
          name: 'Roles',
          component: Roles
        },
        {
          path: '/admin/users',
          name: 'Users',
          component: Users
        }
      ]
    },
    {
      path: '/',
      name: 'User',
      component: User,
      children: [
        {
          path: 'register',
          name: 'Register',
          component: Register,
          meta: {
            guest: true
          }
        },
        {
          path: 'login',
          name: 'Login',
          component: Login,
          meta: {
            guest: true
          }
        },
        {
          path: 'forgot-password',
          name: 'ForgotPassword',
          component: ForgotPassword,
          meta: {
            guest: true
          }
        },
        {
          path: 'reset-password',
          name: 'ResetPassword',
          component: ResetPassword,
          meta: {
            guest: true
          }
        },
        {
          path: 'verify-email',
          name: 'VerifyEmail',
          component: VerifyEmail,
          meta: {
            guest: true
          }
        },
        {
          path: 'authorize/google/callback',
          name: 'LoginGoogle',
          component: LoginGoogle,
          meta: {
            guest: true
          }
        },
        {
          path: 'authorize/facebook/callback',
          name: 'LoginFacebook',
          component: LoginFacebook,
          meta: {
            guest: true
          }
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile,
          meta: {
            auth: true
          }
        },
        {
          path: 'boards',
          name: 'Boards',
          component: Boards,
          meta: {
            auth: true
          }
        },
        {
          path: 'boards/:id',
          name: 'SingleBoard',
          component: SingleBoard,
          meta: {
            auth: true
          }
        },
        {
          path: 'users/:userId/boards/:boardId',
          name: 'InviteToBoard',
          component: InviteToBoard,
          meta: {
            auth: true
          }
        }
      ]
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

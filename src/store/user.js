import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexPersistence from 'vuex-persist'
import authAxios from '../../config/authAxios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    token: null,
    user: null
  },
  plugins: [new VuexPersistence().plugin],
  mutations: {
    SET_loggedIn (state, payload) {
      state.loggedIn = payload
    },
    SET_token (state, payload) {
      state.token = payload
    },
    SET_user (state, payload) {
      state.user = payload
    },
    SET_abilities (state, payload) {
      state.abilities = payload
    }
  },
  actions: {
    checkTokenAction ({commit}) {
      return new Promise((resolve, reject) => {
        authAxios.post('/check-token').then(response => {
          resolve(response)
        }).catch(error => {
          if (error.response && error.response.status === 400) {
            commit('SET_loggedIn', false)
            commit('SET_token', null)
            commit('SET_user', null)
          }
          reject(error)
        })
      })
    },
    loginAction ({commit}, payload) {
      return new Promise((resolve, reject) => {
        let formData = new FormData()
        formData.append('email', payload.email)
        formData.append('password', payload.password)
        formData.append('remember_me', payload.remember_me)
        formData.append('g_recaptcha_response', payload.g_recaptcha_response)
        axios.post('http://tasks.loc/api/auth/login', formData).then(response => {
          commit('SET_loggedIn', true)
          commit('SET_token', 'Bearer ' + response.data.token)
          commit('SET_user', response.data.user)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    logoutAction ({commit}) {
      return new Promise((resolve, reject) => {
        authAxios.get('/logout').then(response => {
          commit('SET_loggedIn', false)
          commit('SET_token', null)
          commit('SET_user', null)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    loginWithGoogleCallbackAction ({commit}, payload) {
      return new Promise((resolve, reject) => {
        axios.get('http://tasks.loc/api/auth/authorize/google/callback', {
          params: payload
        }).then(response => {
          commit('SET_loggedIn', true)
          commit('SET_token', 'Bearer ' + response.data.token)
          commit('SET_user', response.data.user)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    loginWithFacebookCallbackAction ({commit}, payload) {
      return new Promise((resolve, reject) => {
        axios.get('http://tasks.loc/api/auth/authorize/facebook/callback', {
          params: payload
        }).then(response => {
          commit('SET_loggedIn', true)
          commit('SET_token', 'Bearer ' + response.data.token)
          commit('SET_user', response.data.user)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    changeDetailsAction ({commit}, payload) {
      return new Promise((resolve, reject) => {
        let formData = new FormData()
        formData.append('name', payload.name)
        formData.append('password', payload.password)
        formData.append('password_confirmation', payload.password_confirmation)
        authAxios.post('/change-details', formData).then(response => {
          resolve(response)
          commit('SET_user', response.data.user)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  getters: {
    get_loggedIn (state) {
      return state.loggedIn
    },
    get_token (state) {
      return state.token
    },
    get_user (state) {
      return state.user
    }
  }
})

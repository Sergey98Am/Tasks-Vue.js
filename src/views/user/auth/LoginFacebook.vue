<template>
  <div class="loginFacebook">
    <h2>Login with Facebook, please wait!</h2>
  </div>
</template>

<script>
import * as authService from '../../../services/authService'

export default {
  mounted () {
    this.loginFacebookCallback()
  },
  methods: {
    loginFacebookCallback () {
      authService.loginWithFacebookCallback(this)
    }
  }
}
</script>

<style>
.loginFacebook {
  padding-top: 55px;
}
.loginFacebook h2 {
  color: #060240;
  margin: 15px;
}
</style>

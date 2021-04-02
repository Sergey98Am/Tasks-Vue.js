<template>
  <div class="loginFacebook">
    <h2>Login with Facebook, please wait!</h2>
  </div>
</template>

<style>
.loginFacebook {
  padding-top: 55px;
}
.loginFacebook h2 {
  color: #060240;
  margin: 15px;
}
</style>

<script>
import * as userService from '../services/userService'

export default {
  mounted () {
    this.performLoginFacebookCallback()
  },
  methods: {
    performLoginFacebookCallback: function () {
      userService.performLoginWithFacebookCallback(this)
    }
  }
}
</script>

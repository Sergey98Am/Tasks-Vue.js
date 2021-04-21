<template>
  <div class="loginGoogle">
    <h2>Login with Google, please wait!</h2>
  </div>
</template>

<script>
import * as authService from '../../../services/authService'

export default {
  mounted () {
    this.loginGoogleCallback()
  },
  methods: {
    loginGoogleCallback () {
      authService.loginWithGoogleCallback(this)
    }
  }
}
</script>

<style>
.loginGoogle {
  padding-top: 55px;
}
.loginGoogle h2 {
  color: #060240;
  margin: 15px;
}
</style>

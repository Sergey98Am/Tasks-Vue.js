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

<style scoped>
.loginGoogle {
  padding-top: 55px;
}
h2 {
  color: #ffffff;
  margin: 15px;
}
</style>

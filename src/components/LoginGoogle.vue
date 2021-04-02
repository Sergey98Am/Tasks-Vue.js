<template>
  <div class="loginGoogle">
    <h2>Login with Google, please wait!</h2>
  </div>
</template>

<style>
.loginGoogle {
  padding-top: 55px;
}
.loginGoogle h2 {
  color: #060240;
  margin: 15px;
}
</style>

<script>
import * as userService from '../services/userService'

export default {
  mounted () {
    this.performLoginGoogleCallback()
  },
  methods: {
    performLoginGoogleCallback: function () {
      userService.performLoginWithGoogleCallback(this)
    }
  }
}
</script>

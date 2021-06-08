<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <div class="login-form">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="text" class="form-control"
                     id="email"
                     name="email"
                     v-model="email"
                     v-validate="loginValidation().email"
                     :class="{ 'is-invalid':errors.has('email') }">
              <div class="invalid-feedback">
                <span v-if="errors.has('email')">{{ errors.first('email') }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control"
                     id="password"
                     name="password"
                     v-model="password"
                     v-validate="loginValidation().password"
                     ref="password"
                     :class="{ 'is-invalid':errors.has('password') }">
              <div class="invalid-feedback">
                <span v-if="errors.has('password')">{{ errors.first('password') }}</span>
              </div>
            </div>
            <div class="form-group" style="overflow:hidden;">
              <vue-recaptcha
                sitekey="6Lc_0K0aAAAAAMFYMbTlBK-9ysnXXLCGzo_BXApj"
                @verify="mxVerify"
              ></vue-recaptcha>
              <small v-if="recaptchaError">{{ recaptchaError }}</small>
            </div>
            <div class="form-group form-rememberMe">
              <input type="checkbox" class="form-rememberMe-input" id="exampleRememberMe1" v-model="remember_me">
              <label class="form-check-label" for="exampleRememberMe1">Remember Me</label>
            </div>
            <button type="submit" class="submit-login" @click="loginRequest">Login</button>
            <router-link class="forgot-password" to="/forgot-password">Can’t access your account?</router-link>
            <div class="social">
              <h5>Login with a social network</h5>
              <button @click="loginGoogle">
                <img src="../../../assets/images/google.png" alt="">
              </button>
              <button @click="loginFacebook">
                <img src="../../../assets/images/facebook.png" alt="">
              </button>
            </div>
          </div>
          <div v-if="isLoading" class="loader">
            <div class="spinner-border text-secondary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as authService from '../../../services/authService'

export default {
  data () {
    return {
      isLoading: false,
      recaptcha: null,
      recaptchaError: '',
      email: '',
      password: '',
      remember_me: false
    }
  },
  methods: {
    mxVerify (response) {
      this.recaptcha = response
      this.recaptchaError = ''
    },
    loginValidation () {
      return authService.loginValidation()
    },
    loginRequest () {
      authService.login(this)
    },
    loginGoogle () {
      authService.loginWithGoogle()
    },
    loginFacebook () {
      authService.loginWithFacebook()
    }
  }
}
</script>

<style scoped>
.loader {
  margin: 10px 0;
  text-align: center;
}

.login {
  overflow: auto;
  height: calc(100% - 55px);
  padding: 50px 0;
  margin-top: 55px;
}

.login-form {
  padding: 20px;
  border-radius: 10px;
  background: #405471;
}

label {
  color: #ffffff;
}

input {
  border: none;
  border-bottom: 3px solid #ffffff;
  background: none;
  color: #ffffff !important;
}

.submit-login {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #08162d;
  color: #ffffff;
}

.forgot-password {
  margin-left: 10px;
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
}

.social h5 {
  margin-top: 10px;
  margin-bottom: 10px;
  color: #08162d;
  font-size: 16px;
  font-style: italic;
  font-weight: bolder;
}

.social button {
  padding: 5px;
  border: none;
  border-radius: 5px;
  background: none;
  color: #060240;
}

.social button img {
  width: 40px;
  height: 40px;
}

.social button:first-child {
  margin-top: 10px !important;
  margin-right: 5px !important;
}

small {
  color: red;
}
</style>

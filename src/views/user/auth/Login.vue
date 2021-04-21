<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-6 offset-3">
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
            <div class="form-group">
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
          <circle-spin v-show="isLoading"></circle-spin>
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

<style>
.sk-fading-circle {
  margin: 30px auto!important;
}
.sk-circle::before {
  background-color: #060240!important;
}
.login {
  margin-top: 55px;
  padding: 50px 0;
  overflow: auto;
  height: calc(100% - 55px);
}

.login-form {
  padding: 20px;
  border-radius: 15px;
  background: #12E7D4;
  border: 1px solid #060240;
}

.login-form label {
  color: #060240;
}

.login-form input {
  background: none;
  border: none;
  border-bottom: 3px solid #060240;
}

.login-form .submit-login {
  background: #060240;
  color: #12E7D4;
  padding: 10px;
  border: none;
  border-radius: 10px;
}

.login-form .forgot-password {
  color: #060240;
  text-decoration: none;
  margin-left: 15px;
}

.login-form .social h5 {
  color: #060240;
  font-style: italic;
  font-weight: bolder;
  margin-top: 10px;
  margin-bottom: 10px;
}

.login-form .social button {
  background: none;
  border: none;
  border-radius: 5px;
  padding: 5px;
  color: #060240;
}

.login-form .social button img {
  width: 40px;
  height: 40px;
}

.login-form .social button:first-child {
  margin-top: 10px !important;
  margin-right: 5px !important;
}

.login-form small {
  color: red;
}

.login-form input:focus {
  background: none;
  border-color: inherit!important;
  box-shadow: none!important;
}
</style>

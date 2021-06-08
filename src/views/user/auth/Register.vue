<template>
  <div class="register">
    <div class="container">
      <div class="row">
        <div v-if="registerForm" class="col-12 col-md-8 offset-md-2">
          <div class="register-form">
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="name">Name</label>
                <input type="text" class="form-control"
                       id="name"
                       name="name"
                       v-model="user.name"
                       v-validate="registerValidation().name"
                       :class="{ 'is-invalid':errors.has('name') }">
                <div class="invalid-feedback">
                  <span v-if="errors.has('name')">{{ errors.first('name') }}</span>
                </div>
              </div>
              <div class="form-group col-md-12">
                <label for="email">Email</label>
                <input type="text" class="form-control"
                       id="email"
                       name="email"
                       v-model="user.email"
                       v-validate="registerValidation().email"
                       :class="{ 'is-invalid':errors.has('email') }">
                <div class="invalid-feedback">
                  <span v-if="errors.has('email')">{{ errors.first('email') }}</span>
                </div>
              </div>
              <div class="form-group col-md-6">
                <label for="password">Password</label>
                <input type="password" class="form-control"
                       id="password"
                       name="password"
                       v-model="user.password"
                       v-validate="registerValidation().password"
                       ref="password"
                       :class="{ 'is-invalid':errors.has('password') }">
                <div class="invalid-feedback">
                  <span v-if="errors.has('password')">{{ errors.first('password') }}</span>
                </div>
              </div>
              <div class="form-group col-md-6">
                <label for="password_confirmation">Password Confirmation</label>
                <input type="password" class="form-control"
                       id="password_confirmation"
                       name="password_confirmation"
                       v-model="user.password_confirmation"
                       v-validate="registerValidation().password_confirmation"
                       :class="{ 'is-invalid':errors.has('password_confirmation') }">
                <div class="invalid-feedback">
                  <span v-if="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</span>
                </div>
              </div>
              <div class="form-group col-md-12" style="overflow: hidden">
                <vue-recaptcha
                  sitekey="6Lc_0K0aAAAAAMFYMbTlBK-9ysnXXLCGzo_BXApj"
                  @verify="mxVerify"
                ></vue-recaptcha>
                <small v-if="recaptchaError">{{ recaptchaError }}</small>
              </div>
            </div>
            <button type="submit" class="submit-register" @click="registerRequest">Register</button>
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
        <div class="col-6 offset-3" v-else>
          <div class="register-form">
            <h1>{{ registerMessage }}</h1>
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
      registerForm: true,
      registerMessage: '',
      recaptcha: null,
      recaptchaError: '',
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    mxVerify (response) {
      this.recaptcha = response
      this.recaptchaError = ''
    },
    registerValidation () {
      return authService.registerValidation()
    },
    registerRequest () {
      authService.register(this)
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

.register {
  overflow: auto;
  height: calc(100% - 55px);
  padding: 50px 0;
  margin-top: 55px;
}

.register-form {
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

.submit-register {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #08162d;
  color: #ffffff;
}

.forgot-password {
  margin-left: 5px;
  color: #ffffff;
  text-decoration: none;
  font-size: 13px;
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

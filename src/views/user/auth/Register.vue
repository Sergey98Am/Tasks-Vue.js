<template>
  <div class="register">
    <div class="container">
      <div class="row">
        <div class="col-8 offset-2" v-if="registerForm">
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
              <div class="form-group col-md-12">
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
          <circle-spin v-show="isLoading"></circle-spin>
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

<style>
.sk-fading-circle {
  margin: 30px auto!important;
}
.sk-circle::before {
  background-color: #060240!important;
}
.register {
  margin-top: 55px;
  padding: 50px 0;
  overflow: auto;
  height: calc(100% - 55px);
}

.register-form {
  padding: 20px;
  border-radius: 15px;
  background: #12E7D4;
  border: 1px solid #060240;
}

.register-form label {
  color: #060240;
}

.register-form input {
  background: none;
  border: none;
  border-bottom: 3px solid #060240;
}

.register-form .submit-register {
  background: #060240;
  color: #12E7D4;
  padding: 10px;
  border: none;
  border-radius: 10px;
}

.register-form .forgot-password {
  color: #060240;
  text-decoration: none;
  margin-left: 15px;
}

.register-form .social h5 {
  color: #060240;
  font-style: italic;
  font-weight: bolder;
  margin-top: 10px;
  margin-bottom: 10px;
}

.register-form .social button {
  background: none;
  border: none;
  border-radius: 5px;
  padding: 5px;
  color: #060240;
}

.register-form .social button img {
  width: 40px;
  height: 40px;
  object-fit: cover;
}

.register-form .social button:first-child {
  margin-top: 10px !important;
  margin-right: 5px !important;
}
.register-form small {
  color: red;
}
.register-form input:focus {
  background: none;
  border-color: inherit!important;
  box-shadow: none!important;
}
</style>

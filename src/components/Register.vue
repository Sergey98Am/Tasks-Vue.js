<template>
  <div class="register">
    <div class="container">
      <div class="row">
        <div class="col-8 offset-2" v-if="registerForm">
          <div class="r mt-5">
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
            </div>
            <button type="submit" class="submit-register btn btn-primary" @click="registerRequest">Register</button>
            <router-link class="forgot-password" to="/forgot-password">Can’t access your account?</router-link>
            <div class="social">
              <h5>Login with a social network</h5>
              <button @click="loginGoogle">
                <img src="../assets/images/google.png" alt="">
              </button>
              <button @click="loginFacebook">
                <img src="../assets/images/facebook.png" alt="">
              </button>
            </div>
          </div>
        </div>
        <div class="col-6 offset-3" v-else>
          <div class="r mt-5">
            <h1>{{ registerMessage }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.register {
  margin-top: 55px;
  overflow: auto;
  height: 100%;
}

.register .r {
  padding: 20px;
  border-radius: 15px;
  background: #12E7D4;
  border: 1px solid #060240;
}

.register label {
  color: #060240;
}

.register input {
  background: none;
  border: none;
  border-bottom: 3px solid #060240;
}

.register .submit-register {
  background: #060240;
}

.register .forgot-password {
  color: #060240;
  text-decoration: none;
  margin-left: 15px;
}

.register h1 {
  color: #060240;
  text-align: center;
}

.register .social h5 {
  color: #060240;
  font-style: italic;
  font-weight: bolder;
  margin-top: 10px;
  margin-bottom: 10px;
}

.register .social button {
  border: none;
  border-radius: 5px;
  padding: 5px;
  color: #060240;
}

.register .social button img {
  width: 40px;
  height: 40px;
}

.register .social button:first-child {
  margin-top: 10px !important;
  margin-right: 5px !important;
}
</style>

<script>
import * as userService from '../services/userService'

export default {
  data () {
    return {
      registerForm: true,
      registerMessage: '',
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    registerValidation: function () {
      return userService.registerValidation()
    },
    registerRequest: function () {
      userService.performRegister(this)
    },
    loginGoogle: function () {
      userService.loginWithGoogle()
    },
    loginFacebook: function () {
      userService.loginWithFacebook()
    }
  }
}
</script>

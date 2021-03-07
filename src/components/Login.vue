<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-6 offset-3">
          <div class="r mt-5">
            <form @submit.prevent="loginRequest">
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
              <div class="form-group form-rememberMe">
                <input type="checkbox" class="form-rememberMe-input" id="exampleRememberMe1" v-model="remember_me">
                <label class="form-check-label" for="exampleRememberMe1">Remember Me</label>
              </div>
              <button type="submit" class="submit-register btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as userService from '../services/userService'

export default {
  data () {
    return {
      email: '',
      password: '',
      remember_me: false
    }
  },
  methods: {
    loginValidation: function () {
      return userService.loginValidation()
    },
    loginRequest: function () {
      userService.performLogin(this)
    }
  }
}
</script>

<style>
.login {
  margin-top: 55px;
  overflow: auto;
  height: 100%;
}

.login .r {
  padding: 20px;
  border-radius: 15px;
  background: #12E7D4;
  border: 1px solid #060240;
}

.login label {
  color: #060240;
}

.login input {
  background: none;
  border: none;
  border-bottom: 3px solid #060240;
}

.login .submit-register {
  background: #060240;
}
</style>

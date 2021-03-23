<template>
  <div class="register">
    <div class="container">
      <div class="row">
        <div class="col-8 offset-2">
          <div class="r mt-5">
            <form @submit.prevent="registerRequest">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="first_name">First Name</label>
                  <input type="text" class="form-control"
                         id="first_name"
                         name="first_name"
                         v-model="first_name"
                         v-validate="registerValidation().first_name"
                         :class="{ 'is-invalid':errors.has('first_name') }">
                  <div class="invalid-feedback">
                    <span v-if="errors.has('first_name')">{{ errors.first('first_name') }}</span>
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="last_name">Last Name</label>
                  <input type="text" class="form-control"
                         id="last_name"
                         name="last_name"
                         v-model="last_name"
                         v-validate="registerValidation().last_name"
                         :class="{ 'is-invalid':errors.has('last_name') }">
                  <div class="invalid-feedback">
                    <span v-if="errors.has('last_name')">{{ errors.first('last_name') }}</span>
                  </div>
                </div>
                <div class="form-group col-md-12">
                  <label for="email">Email</label>
                  <input type="text" class="form-control"
                         id="email"
                         name="email"
                         v-model="email"
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
                         v-model="password"
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
                         v-model="password_confirmation"
                         v-validate="registerValidation().password_confirmation"
                         :class="{ 'is-invalid':errors.has('password_confirmation') }">
                  <div class="invalid-feedback">
                    <span v-if="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</span>
                  </div>
                </div>
              </div>
              <div class="form-group form-rememberMe">
                <input type="checkbox" class="form-rememberMe-input" id="exampleRememberMe1" v-model="remember_me">
                <label class="form-check-label" for="exampleRememberMe1">Remember Me</label>
              </div>
              <button type="submit" class="submit-register btn btn-primary">Register</button>
              <router-link class="forgot-password" to="/forgot-password">Can’t access your account?</router-link>
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
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      remember_me: false
    }
  },
  methods: {
    registerValidation: function () {
      return userService.registerValidation()
    },
    registerRequest: function () {
      userService.performRegister(this)
    }
  }
}
</script>

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
</style>

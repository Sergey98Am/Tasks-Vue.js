<template>
  <div class="reset-password">
    <div class="container">
      <div class="row">
<!--        col-8 offset-2-->
        <div class="col-12 col-md-8 offset-md-2">
          <div class="reset-password-form">
            <h3>Reset Password</h3>
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="email">Email</label>
                <input type="text" class="form-control"
                       id="email"
                       name="email"
                       v-model="email"
                       v-validate="resetPasswordValidation().email"
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
                       v-validate="resetPasswordValidation().password"
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
                       v-validate="resetPasswordValidation().password_confirmation"
                       :class="{ 'is-invalid':errors.has('password_confirmation') }">
                <div class="invalid-feedback">
                  <span v-if="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</span>
                </div>
              </div>
              <button type="submit" class="submit-register btn btn-primary" @click="resetPasswordService">Reset</button>
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
import * as resetPassword from '../../../services/resetPasswordService'

export default {
  data () {
    return {
      isLoading: false,
      token: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  },
  methods: {
    resetPasswordValidation () {
      return resetPassword.resetPasswordValidation()
    },
    resetPasswordService () {
      resetPassword.resetPasswordService(this)
    }
  }
}
</script>

<style scoped>
.loader {
  margin: 10px 0;
  text-align: center;
}

.reset-password {
  overflow: auto;
  height: calc(100% - 55px);
  padding: 50px 0;
  margin-top: 55px;
}

.reset-password-form {
  padding: 20px;
  border-radius: 10px;
  background: #405471;
}

h3 {
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  background: #10294e;
  color: #ffffff;
  text-decoration: underline;
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
</style>

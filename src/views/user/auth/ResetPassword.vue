<template>
  <div class="reset-password">
    <div class="container">
      <div class="row">
        <div class="col-8 offset-2">
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
        </div>
      </div>
    </div>
    <circle-spin v-show="isLoading"></circle-spin>
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

<style>
.reset-password .sk-fading-circle {
  margin: 50px auto !important;
}

.reset-password {
  margin-top: 55px;
  padding: 50px 0;
  overflow: auto;
  height: calc(100% - 55px);
}

.reset-password .reset-password-form {
  padding: 20px;
  border-radius: 15px;
  background: #12E7D4;
  border: 1px solid #060240;
}

.reset-password .reset-password-form h3 {
  background: #060240;
  color: #12E7D4;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  text-decoration: underline;
}

.reset-password label {
  color: #060240;
}

.reset-password input {
  background: none;
  border: none;
  border-bottom: 3px solid #060240;
}

.reset-password .submit-register {
  background: #060240;
}

.reset-password h1 {
  text-align: center;
}

.reset-password h4 {
  text-align: center;
  color: #060240;
}
</style>

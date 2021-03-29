<template>
  <div class="forgot-password">
    <div class="container">
      <div class="row">
        <div class="col-6 offset-3" v-if="forgotPasswordForm">
          <div class="r mt-5">
            <h3>Forgot Password</h3>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="text" class="form-control"
                     id="email"
                     name="email"
                     v-model="email"
                     v-validate="forgotPasswordValidation().email"
                     :class="{ 'is-invalid':errors.has('email') }">
              <div class="invalid-feedback">
                <span v-if="errors.has('email')">{{ errors.first('email') }}</span>
              </div>
            </div>
            <button type="submit" class="submit-register btn btn-primary" @click="forgotPasswordService">Send Email</button>
          </div>
        </div>
        <div class="col-6 offset-3" v-else>
          <div class="r mt-5">
            <h1><font-awesome-icon :icon="['fas', 'check-circle']"/></h1>
            <h4>{{ thankYou }}</h4>
          </div>
        </div>
      </div>
    </div>
    <circle-spin v-show="isLoading"></circle-spin>
  </div>
</template>

<style>
.forgot-password .sk-fading-circle {
  margin: 50px auto!important;
}
.forgot-password {
  margin-top: 55px;
  overflow: auto;
  height: 100%;
}

.forgot-password .r {
  padding: 20px;
  border-radius: 15px;
  background: #12E7D4;
  border: 1px solid #060240;
}

.forgot-password .r h3 {
  background: #060240;
  color: #12E7D4;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  text-decoration: underline;
}

.forgot-password label {
  color: #060240;
}

.forgot-password input {
  background: none;
  border: none;
  border-bottom: 3px solid #060240;
}

.forgot-password .submit-register {
  background: #060240;
}

.forgot-password h1 {
  text-align: center;
}

.forgot-password h4 {
  text-align: center;
  color: #060240;
}
</style>

<script>
import * as resetPassword from '../services/resetPasswordService'

export default {
  data () {
    return {
      isLoading: false,
      email: '',
      thankYou: '',
      forgotPasswordForm: true
    }
  },
  methods: {
    forgotPasswordValidation: function () {
      return resetPassword.forgotPasswordValidation()
    },
    forgotPasswordService: function () {
      resetPassword.forgotPasswordService(this)
    }
  }
}
</script>

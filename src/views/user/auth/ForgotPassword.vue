<template>
  <div class="forgot-password">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3" v-if="forgotPasswordForm">
          <div class="forgot-password-form">
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
          <div v-if="isLoading" class="loader">
            <div class="spinner-border text-secondary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
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
  </div>
</template>

<script>
import * as resetPassword from '../../../services/resetPasswordService'

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
    forgotPasswordValidation () {
      return resetPassword.forgotPasswordValidation()
    },
    forgotPasswordService () {
      resetPassword.forgotPasswordService(this)
    }
  }
}
</script>

<style scoped>
.loader {
  margin: 10px 0;
  text-align: center;
}

.forgot-password {
  overflow: auto;
  height: calc(100% - 55px);
  padding: 50px 0;
  margin-top: 55px;
}

.forgot-password-form {
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

h1 {
  text-align: center;
}

h4 {
  text-align: center;
  color: #ffffff;
}
</style>

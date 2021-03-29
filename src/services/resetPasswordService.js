import axios from 'axios'

// Forgot Password
function forgotPasswordValidation () {
  return {
    email: {
      required: true,
      email: true
    }
  }
}

function forgotPasswordServerSideValidation (self, error) {
  const data = error.response.data
  if (data.error) {
    self.$validator.errors.add({field: 'email', msg: data.error})
  }
}

function forgotPasswordService (self) {
  self.$validator.validateAll().then((result) => {
    if (result) {
      self.isLoading = true
      axios.post('http://tasks.loc/api/auth/forgot-password', {email: self.email}).then(response => {
        self.isLoading = false
        self.thankYou = response.data.message
        self.forgotPasswordForm = false
        self.email = ''
      }).catch(error => {
        self.isLoading = false
        forgotPasswordServerSideValidation(self, error)
      })
    }
  })
}
// End Forgot Password

// Reset Password
function resetPasswordValidation () {
  return {
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      min: 8
    },
    password_confirmation: {
      required: true,
      confirmed: 'password'
    }
  }
}

function resetPasswordServerSideValidation (self, error) {
  const data = error.response.data
  if (data.error) {
    if (data.error.email) {
      self.$validator.errors.add({field: 'email', msg: data.error.email[0]})
    }
    if (data.error.password) {
      self.$validator.errors.add({field: 'password', msg: data.error.password[0]})
    }
    if (data.error.password_confirmation) {
      self.$validator.errors.add({
        field: 'password_confirmation',
        msg: data.error.password_confirmation[0]
      })
    }
  }
  if (data.message) {
    self.$validator.errors.add({field: 'password', msg: data.message})
  }
}

function resetPasswordService (self) {
  self.$validator.validateAll().then((result) => {
    if (result) {
      self.isLoading = true
      let token = self.$route.query.token
      let formData = new FormData()
      formData.append('token', token)
      formData.append('email', self.email)
      formData.append('password', self.password)
      formData.append('password_confirmation', self.password_confirmation)
      axios.post('http://tasks.loc/api/auth/reset-password', formData).then(response => {
        self.isLoading = false
        self.$router.push('/login')
      }).catch(error => {
        self.isLoading = false
        resetPasswordServerSideValidation(self, error)
      })
    }
  })
}
// End Reset Password

export {
  forgotPasswordValidation,
  forgotPasswordServerSideValidation,
  forgotPasswordService,
  resetPasswordValidation,
  resetPasswordServerSideValidation,
  resetPasswordService
}

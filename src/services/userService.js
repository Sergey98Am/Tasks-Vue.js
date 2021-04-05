// Register
import axios from 'axios'

function registerValidation () {
  return {
    name: {
      required: true,
      regex: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/
    },
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

function registerServerSideValidation (self, error) {
  const data = error.response.data
  if (data.error) {
    if (data.error.name) {
      self.$validator.errors.add({field: 'name', msg: data.error.name[0]})
    }
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
    if (data.error.g_recaptcha_response) {
      self.recaptchaError = data.error.g_recaptcha_response[0]
    }
  }
}

function performRegister (self) {
  if (!self.recaptcha) {
    self.recaptchaError = 'Please complete the recaptcha'
  }
  self.$validator.validateAll().then((result) => {
    if (result && self.recaptcha) {
      self.isLoading = true
      self.$store.dispatch('performRegisterAction', {
        name: self.user.name,
        email: self.user.email,
        password: self.user.password,
        password_confirmation: self.user.password_confirmation,
        g_recaptcha_response: self.recaptcha
      }).then(response => {
        self.isLoading = false
        // eslint-disable-next-line no-return-assign
        Object.keys(self.user).forEach(k => self.user[k] = '')
        self.registerForm = false
        self.registerMessage = response.data.message
        self.recaptchaError = ''
      }).catch(error => {
        self.isLoading = false
        registerServerSideValidation(self, error)
      })
    }
  })
}

// End Register

// Login
function loginValidation () {
  return {
    email: {
      required: true,
      email: true
    },
    password: {
      required: true
    }
  }
}

function loginServerSideValidation (self, error) {
  const data = error.response.data
  if (data.error) {
    if (data.error.email) {
      self.$validator.errors.add({field: 'email', msg: data.error[0]})
    }
    if (data.error.password) {
      self.$validator.errors.add({field: 'password', msg: data.error.password[0]})
    }
  }
  if (data.message) {
    self.$validator.errors.add({field: 'password', msg: data.message})
  }
  if (data.error.g_recaptcha_response) {
    self.recaptchaError = data.error.g_recaptcha_response[0]
  }
}

function performLogin (self) {
  if (!self.recaptcha) {
    self.recaptchaError = 'Please complete the recaptcha'
  }
  self.$validator.validateAll().then((result) => {
    if (result && self.recaptcha) {
      self.isLoading = true
      self.$store.dispatch('performLoginAction', {
        email: self.email,
        password: self.password,
        remember_me: self.remember_me,
        g_recaptcha_response: self.recaptcha
      }).then(() => {
        self.isLoading = false
        self.$router.push('/profile')
      }).catch(error => {
        self.isLoading = false
        loginServerSideValidation(self, error)
      })
    }
  })
}

// End Login

// Logout
function performLogout (self) {
  self.$store.dispatch('performLogoutAction').then(() => {
    if (self.$route.path !== '/') {
      self.$router.push('/')
    }
  }).catch(error => {
    console.log(error)
  })
}

// End Logout

// Login with Google
function loginWithGoogle () {
  axios.get('http://tasks.loc/api/auth/authorize/google/redirect').then((response) => {
    if (response.data.url) {
      window.location.href = response.data.url
    }
  }).catch(error => {
    console.log(error)
  })
}

// End Login with Google

// Login with Google callback
function performLoginWithGoogleCallback (self) {
  let code = self.$route.query.code
  self.$store.dispatch('performLoginWithGoogleCallbackAction', {code}).then(() => {
    self.$router.push('/profile')
  }).catch(error => {
    console.log(error)
  })
}

// End Login with Google callback

// Login with Facebook
function loginWithFacebook () {
  axios.get('http://tasks.loc/api/auth/authorize/facebook/redirect').then(response => {
    if (response.data.url) {
      window.location.href = response.data.url
    }
  }).catch(error => {
    console.log(error)
  })
}

// End Login with Facebook

// Login with Facebook callback
function performLoginWithFacebookCallback (self) {
  let code = self.$route.query.code
  self.$store.dispatch('performLoginWithFacebookCallbackAction', {code}).then(() => {
    self.$router.push('/profile')
  }).catch(error => {
    console.log(error)
  })
}

// End Login with Facebook callback

export {
  registerValidation,
  registerServerSideValidation,
  performRegister,
  loginValidation,
  loginServerSideValidation,
  performLogin,
  performLogout,
  loginWithGoogle,
  loginWithFacebook,
  performLoginWithGoogleCallback,
  performLoginWithFacebookCallback
}

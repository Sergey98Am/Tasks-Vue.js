// Register
import axios from 'axios'

function registerValidation () {
  return {
    name: {
      required: true,
      regex: /^[a-zA-Z]+(?:-[a-zA-Z]+)*$/
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
  }
}

function performRegister (self) {
  self.$validator.validateAll().then((result) => {
    if (result) {
      self.$store.dispatch('performRegisterAction', {
        name: self.user.name,
        email: self.user.email,
        password: self.user.password,
        password_confirmation: self.user.password_confirmation
      }).then(response => {
        // eslint-disable-next-line no-return-assign
        Object.keys(self.user).forEach(k => self.user[k] = '')
        self.registerForm = false
        self.registerMessage = response.data.message
      }).catch(error => {
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

function loginServerSideValidation (login, error) {
  const data = error.response.data
  if (data.error) {
    if (data.error.email) {
      login.$validator.errors.add({field: 'email', msg: data.error[0]})
    }
    if (data.error.password) {
      login.$validator.errors.add({field: 'password', msg: data.error.password[0]})
    }
  }
  if (data.message) {
    login.$validator.errors.add({field: 'password', msg: data.message})
  }
}

function performLogin (self) {
  self.$validator.validateAll().then((result) => {
    if (result) {
      self.isLoading = true
      self.$store.dispatch('performLoginAction', {
        email: self.email,
        password: self.password,
        remember_me: self.remember_me
      }).then(() => {
        self.$router.push('/profile')
      }).catch(error => {
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

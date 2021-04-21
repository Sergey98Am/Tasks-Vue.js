import authAxios from '../../../config/authAxios'

function validation () {
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
    role_id: {
      required: true
    }
  }
}

function serverSideValidation (self, error) {
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
  }
}

function get (self) {
  self.isLoading = true
  authAxios.get('/users').then(response => {
    self.isLoading = false
    self.roles = response.data.roles
    self.users = response.data.users
  }).catch(() => {
    self.isLoading = false
  })
}

function store (target, self) {
  self.$validator.validateAll().then((result) => {
    if (result) {
      // Loader
      let loader = target.querySelector('.create-loader')
      let icon = target.querySelector('.icon')
      loader.style.display = 'inline-block'
      icon.style.display = 'none'
      // End Loader
      let formData = new FormData()
      formData.append('name', self.form.name)
      formData.append('email', self.form.email)
      formData.append('password', self.form.password)
      formData.append('role_id', self.form.role_id)
      authAxios.post('/users', formData).then(response => {
        // Loader
        loader.style.display = 'none'
        icon.style.display = 'inline-block'
        // End Loader
        self.closeModal()
        self.page = 1
        let newUser = response.data.user
        self.users.unshift(newUser)
      }).catch(error => {
        // Loader
        loader.style.display = 'none'
        icon.style.display = 'inline-block'
        // End Loader
        serverSideValidation(self, error)
      })
    }
  })
}

function update (target, self) {
  self.$validator.validateAll().then((result) => {
    if (result) {
      // Loader
      let loader = target.querySelector('.edit-loader')
      let icon = target.querySelector('.icon')
      loader.style.display = 'inline-block'
      icon.style.display = 'none'
      // End Loader
      let formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('id', self.form.id)
      formData.append('name', self.form.name)
      formData.append('role_id', self.form.role_id)
      authAxios.post('/users/' + self.form.id, formData).then(response => {
        // Loader
        loader.style.display = 'none'
        icon.style.display = 'inline-block'
        // End Loader
        self.closeModal()
        let user
        for (user of self.users) {
          if (user.id === response.data.user.id) {
            Object.keys(user).forEach(function (item) {
              user[item] = response.data.user[item]
            })
          }
        }
      }).catch(error => {
        // Loader
        loader.style.display = 'none'
        icon.style.display = 'inline-block'
        // End Loader
        serverSideValidation(self, error)
      })
    }
  })
}

function destroy (target, id, self) {
  // Loader
  target.querySelector('.delete-loader').style.display = 'inline-block'
  target.querySelector('.icon').style.display = 'none'
  // End Loader
  authAxios.delete('/users/' + id).then(response => {
    let user
    for (user in self.users) {
      if (self.users[user].id === response.data.user.id) {
        self.users.splice(user, 1)
      }
    }
  }).catch(error => {
    console.log(error)
  })
}

export {
  validation,
  get,
  store,
  update,
  destroy
}

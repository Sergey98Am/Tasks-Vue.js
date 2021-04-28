import authAxios from '../../config/authAxios'

function validation () {
  return {
    email: {
      required: true,
      email: true
    }
  }
}

function serverSideValidation (self, error) {
  const data = error.response.data
  if (data.error) {
    if (data.error.email) {
      self.$validator.errors.add({field: 'email', msg: data.error.email[0]})
    }
  }
}

function invite (self) {
  self.$validator.validate('email').then((result) => {
    if (result) {
      authAxios.post('invitation/boards/' + self.$route.params.id, {email: self.email}).then(response => {
        self.email = ''
      }).catch(error => {
        serverSideValidation(self, error)
      })
    }
  })
}

function confirmInvitation (self) {
  let userId = self.$route.params.userId
  let boardId = self.$route.params.boardId
  let signature = self.$route.query.signature
  authAxios.post(`http://tasks.loc/api/confirm-invitation/users/${userId}/boards/${boardId}?signature=${signature}`).then(() => {
    self.$router.push('/boards/' + boardId)
  }).catch(error => {
    console.log(error)
  })
}

export {
  validation,
  serverSideValidation,
  invite,
  confirmInvitation
}

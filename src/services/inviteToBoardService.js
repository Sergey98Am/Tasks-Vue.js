import authAxios from '../../config/authAxios'

function invite (self) {
  if (self.email) {
    authAxios.post('invitation/boards/' + self.$route.params.id, {email: self.email}).then(response => {
      self.email = ''
    }).catch(() => {
      //
    })
  }
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
  invite,
  confirmInvitation
}

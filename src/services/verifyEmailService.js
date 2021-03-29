import axios from 'axios'

function verifyEmailService (self) {
  self.isLoading = true
  let id = self.$route.query.id
  let hash = self.$route.query.hash
  axios.get('http://tasks.loc/api/auth/email-verification?id=' + id + '&hash=' + hash).then(() => {
    self.$router.push('/login')
  }).catch(error => {
    console.log(error)
  })
}

export {
  verifyEmailService
}

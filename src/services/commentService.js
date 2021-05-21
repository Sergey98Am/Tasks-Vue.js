import authAxios from '../../config/authAxios'

function get (self) {
  authAxios.get('/cards/' + self.cardId + '/comments').then(response => {
    self.cardComments = response.data.comments
  }).catch(() => {
    //
  })
}

function addComment (self) {
  if (self.comment) {
    let formData = new FormData()
    formData.append('comment', self.comment)
    authAxios.post('/cards/' + self.cardId + '/comments', formData).then(response => {
      self.comment = ''
      let newComment = response.data.comment
      self.cardComments.unshift(newComment)
      let container = document.querySelector('.comment-list')
      container.scrollTop = 0
    }).catch(error => {
      console.log(error)
    })
  }
}

function addReply (self, parentComment) {
  if (self.comment_reply) {
    let formData = new FormData()
    formData.append('comment', self.comment)
    formData.append('parent_id', parentComment.id)
    formData.append('comment', self.comment_reply)
    authAxios.post('/cards/' + self.cardId + '/comments/' + parentComment.id + '/replies', formData).then(response => {
      self.comment_reply = ''
      let newComment = response.data.comment
      parentComment.replies.push(newComment)
      self.commentId = ''
    }).catch(error => {
      console.log(error)
    })
  }
}

function update (self, comment) {
  let formData = new FormData()
  formData.append('_method', 'PUT')
  formData.append('comment', comment.comment)
  authAxios.post('/cards/' + self.cardId + '/comments/' + comment.id, formData).then(response => {
    if (comment.comment === '') {
      comment.comment = response.data.comment.comment
    }
    self.updateCommentId = ''
  }).catch(error => {
    console.log(error)
  })
}

function destroyComment (self, comment) {
  authAxios.delete('/cards/' + self.cardId + '/comments/' + comment.id).then(response => {
    let comment
    for (comment in self.cardComments) {
      if (self.cardComments[comment].id === response.data.comment.id) {
        self.cardComments.splice(comment, 1)
      }
    }
  }).catch(error => {
    console.log(error)
  })
}

function destroyReply (self, comment) {
  authAxios.delete('/cards/' + self.cardId + '/comments/' + comment.id).then(response => {
    let comment
    for (comment of self.cardComments) {
      console.log(comment)
      let reply
      for (reply in comment.replies) {
        if (comment.replies[reply].id === response.data.comment.id) {
          comment.replies.splice(reply, 1)
        }
        console.log(reply, comment)
      }
    }
  }).catch(error => {
    console.log(error)
  })
}

export {
  get,
  addComment,
  addReply,
  update,
  destroyComment,
  destroyReply
}

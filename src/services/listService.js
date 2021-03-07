import authAxios from '../../config/authAxios'

function validation () {
  return {
    list_title: {
      required: true
    }
  }
}

// function serverSideValidation (self, error) {
//   const data = error.response.data
//   if (data.error) {
//     if (data.error.title) {
//       self.$validator.errors.add({field: 'title', msg: data.error.title[0]})
//     }
//   }
// }

function get (self) {
  authAxios.get('/boards/' + self.$route.params.boardId + '/lists').then(response => {
    self.board_title = response.data.board.title
    self.lists = response.data.board.lists
    console.log(response)
  }).catch(error => {
    console.log(error)
  })
}

function store (target, self) {
  self.$validator.validateAll().then((result) => {
    if (result) {
      let formData = new FormData()
      formData.append('title', self.list_title)
      authAxios.post('/boards/' + self.$route.params.boardId + '/lists', formData).then(response => {
        let newList = response.data.list
        self.lists.push(newList)
        self.list_title = ''
        setTimeout(function () {
          let container = document.querySelector('.board-canvas')
          container.scrollLeft = container.scrollWidth
        }, 100)
        self.$validator.reset()
      }).catch(error => {
        // serverSideValidation(self, error)
        console.log(error)
      })
    }
  })
}

function update (self) {
  let formData = new FormData()
  formData.append('_method', 'PUT')
  formData.append('id', self.id)
  formData.append('title', self.list_title)
  authAxios.post('/boards/' + self.$route.params.boardId + '/lists/' + self.id, formData).then(response => {
    if (self.list_title === '') {
      self.list_title = response.data.list.title
    }
    let list
    for (list in self.lists) {
      if (self.lists[list].id === response.data.list.id) {
        self.lists[list].title = response.data.list.title
      }
    }
    self.closeUpdateList()
  }).catch(error => {
    console.log(error)
  })
}

function destroy (id, self) {
  authAxios.delete('/boards/' + self.$route.params.boardId + '/lists/' + id).then(response => {
    let list
    for (list in self.lists) {
      if (self.lists[list].id === response.data.list.id) {
        self.lists.splice(list, 1)
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

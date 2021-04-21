import authAxios from '../../config/authAxios'

function validation () {
  return {
    list_title: {
      required: true
    }
  }
}

function serverSideValidation (self, error) {
  const data = error.response.data
  if (data.error) {
    if (data.error.title) {
      self.$validator.errors.add({field: 'list_title', msg: data.error.title[0]})
    }
  }
}

function get (self) {
  self.isLoading = true
  authAxios.get('/boards/' + self.$route.params.id + '/lists').then(response => {
    self.board_title = response.data.board.title
    self.lists = response.data.board.lists
    self.isLoading = false
  }).catch(() => {
    self.isLoading = false
  })
}

function store (target, self) {
  self.$validator.validate('list_title').then((result) => {
    if (result) {
      let formData = new FormData()
      formData.append('title', self.list_title)
      authAxios.post('/boards/' + self.$route.params.id + '/lists', formData).then(response => {
        let newList = response.data.list
        self.lists.push(newList)
        self.list_title = ''
        setTimeout(function () {
          let container = document.querySelector('.board-canvas')
          container.scrollLeft = container.scrollWidth
        }, 100)
        self.errors.remove(self.list_title)
        sort(self)
      }).catch(error => {
        serverSideValidation(self, error)
      })
    }
  })
}

function update (self, listParam) {
  let formData = new FormData()
  formData.append('_method', 'PUT')
  formData.append('id', listParam.id)
  formData.append('title', listParam.title)
  authAxios.post('/boards/' + self.$route.params.id + '/lists/' + listParam.id, formData).then(response => {
    if (listParam.title === '') {
      listParam.title = response.data.list.title
    }
    // listParam.title = response.data.list.title
    self.updateListId = ''
  }).catch(error => {
    console.log(error)
  })
}

function destroy (listParam, self) {
  authAxios.delete('/boards/' + self.$route.params.id + '/lists/' + listParam.id).then(response => {
    let list
    for (list in self.lists) {
      if (self.lists[list].id === response.data.list.id) {
        self.lists.splice(list, 1)
      }
    }
    sort(self)
  }).catch(error => {
    console.log(error)
  })
}

function sort (self) {
  self.isLoading = true
  let ids = self.lists.map((list) => {
    return list.id
  })
  authAxios.post('/sort_list', {ids: ids}).then(response => {
    self.isLoading = false
  }).catch(() => {
    self.isLoading = false
  })
}

export {
  validation,
  get,
  store,
  update,
  destroy,
  sort
}

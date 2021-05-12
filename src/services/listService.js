import authAxios from '../../config/authAxios'

function store (self) {
  if (self.list_title) {
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
      sort(self)
    }).catch(error => {
      console.log(error)
    })
  }
}

function update (self) {
  // Loader
  let loader = self.$refs.spinner
  loader.style.display = 'inline-block'
  // End Loader
  let formData = new FormData()
  formData.append('_method', 'PUT')
  formData.append('id', self.list.id)
  formData.append('title', self.list.title)
  authAxios.post('/boards/' + self.$route.params.id + '/lists/' + self.list.id, formData).then(response => {
    // Loader
    loader.style.display = 'none'
    // End Loader
    if (self.list.title === '') {
      self.list.title = response.data.list.title
    }
    self.list.title = response.data.list.title
    self.list_title = response.data.list.title
    let textarea = self.$refs.textarea
    self.text_size = textarea.scrollHeight
    textarea.blur()
  }).catch(error => {
    console.log(error)
  })
}

function destroy (self) {
  authAxios.delete('/boards/' + self.$route.params.id + '/lists/' + self.list.id).then(response => {
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
  authAxios.post('/sort-list', {ids: ids}).then(() => {
    self.isLoading = false
  }).catch(() => {
    self.isLoading = false
  })
}

export {
  store,
  update,
  destroy,
  sort
}

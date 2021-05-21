import authAxios from '../../config/authAxios'

function validation () {
  return {
    title: {
      required: true
    }
  }
}

function serverSideValidation (self, error) {
  const data = error.response.data
  if (data.error) {
    if (data.error.title) {
      self.$validator.errors.add({field: 'title', msg: data.error.title[0]})
    }
  }
}

function get (self) {
  self.isLoading = true
  authAxios.get('/boards').then(response => {
    self.isLoading = false
    self.boards = response.data.boards
  }).catch(() => {
    self.isLoading = false
  })
}

function store (target, self) {
  self.$validator.validateAll().then((result) => {
    if (result) {
      let formData = new FormData()
      formData.append('title', self.title)
      authAxios.post('/boards', formData).then(response => {
        self.closeModal()
        self.page = 1
        let newBoard = response.data.board
        self.boards.unshift(newBoard)
      }).catch(error => {
        serverSideValidation(self, error)
      })
    }
  })
}

function update (target, self) {
  self.$validator.validateAll().then((result) => {
    if (result) {
      let formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('id', self.id)
      formData.append('title', self.title)
      authAxios.post('/boards/' + self.id, formData).then(response => {
        self.closeModal()
        console.log(response.data.board)
        let board
        for (board of self.boards) {
          if (board.id === response.data.board.id) {
            board.title = response.data.board.title
          }
        }
        // get(self)
      }).catch(error => {
        serverSideValidation(self, error)
      })
    }
  })
}

function destroy (target, id, self) {
  authAxios.delete('/boards/' + id).then(response => {
    let board
    for (board in self.boards) {
      if (self.boards[board].id === response.data.board.id) {
        self.boards.splice(board, 1)
      }
    }
  }).catch(error => {
    console.log(error)
  })
}

function singleBoard (self) {
  // Loader
  self.$refs['board-title'].style.display = 'none'
  self.$refs['board-title-loader'].style.display = ''
  self.isLoading = true
  // End Loader
  authAxios.get('/single-board/board/' + self.$route.params.id).then(response => {
    // Loader
    self.$refs['board-title'].style.display = ''
    self.$refs['board-title-loader'].style.display = 'none'
    self.isLoading = false
    // End Loader
    self.board_title = response.data.board.title
    self.lists = response.data.board.lists
    self.board_users = response.data.board.users
    // self.board = response.data.board
  }).catch(() => {
    self.$refs['board-title'].style.display = ''
    self.$refs['board-title-loader'].style.display = 'none'
    self.isLoading = false
  })
}

export {
  validation,
  get,
  store,
  update,
  destroy,
  singleBoard
}

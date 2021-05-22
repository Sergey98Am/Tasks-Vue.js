import authAxios from '../../config/authAxios'

function store (self, target) {
  if (self.card_title) {
    let formData = new FormData()
    formData.append('title', self.card_title)
    authAxios.post('/lists/' + self.list.id + '/cards', formData).then(response => {
      let newCard = response.data.card
      self.list.cards.push(newCard)
      self.card_title = ''
      setTimeout(function () {
        let container = target.closest('.list-wrapper').querySelector('.cards')
        container.scrollTop = container.scrollHeight
      }, 100)
      sort(self, self.list)
    }).catch(error => {
      console.log(error)
    })
  }
}

function update (self, event) {
  // Loader
  let loader = event.target.closest('.update-card').querySelector('.spinner-border')
  loader.style.display = 'inline-block'
  // End Loader
  let formData = new FormData()
  formData.append('_method', 'PUT')
  formData.append('id', self.card.id)
  formData.append('title', self.card.title)
  formData.append('lists_id', self.list.id)
  authAxios.post('/lists/' + self.list.id + '/cards/' + self.card.id, formData).then(response => {
    // Loader
    loader.style.display = 'none'
    // End Loader
    if (self.card.title === '') {
      self.card.title = response.data.card.title
    }
    self.card.title = response.data.card.title
    self.card_title = response.data.card.title
    let textarea = self.$refs.textarea
    self.text_size = textarea.scrollHeight
    textarea.blur()
  }).catch(error => {
    console.log(error)
  })
}

function destroy (self) {
  authAxios.delete('/lists/' + self.list.id + '/cards/' + self.card.id).then(response => {
    let card
    for (card in self.list.cards) {
      if (self.list.cards[card].id === response.data.card.id) {
        self.list.cards.splice(card, 1)
      }
    }
    sort(self, self.list)
  }).catch(error => {
    console.log(error)
  })
}

function sort (self) {
  self.isLoading = true
  let ids = self.list.cards.map((card) => {
    return card.id
  })
  authAxios.post('/sort-card', {ids: ids}).then(() => {
    self.isLoading = false
  }).catch(() => {
    self.isLoading = false
  })
}

function moveCard (self, event) {
  let cardId = event.item.getAttribute('cardId')
  authAxios.post('/move-card-to-another-list/' + cardId, {lists_id: self.list.id}).then(response => {
    console.log(response)
  }).catch(error => {
    console.log(error)
  })
}

function addOrRemoveMembers (self) {
  let formData = new FormData()
  for (let i = 0; i < self.selectedMembers.length; i++) {
    formData.append('members[]', self.selectedMembers[i])
  }
  authAxios.post('/cards/' + self.cardId + '/members', formData).then(response => {
    let card = self.list.cards.find(card => card.id === response.data.card.id)
    card.members = response.data.card.members
  }).catch(() => {
    //
  })
}

function priority (self) {
  let formData = new FormData()
  formData.append('priority', self.priority)
  authAxios.post('/cards/' + self.cardId + '/priority', formData).then(response => {
    let card = self.list.cards.find(card => card.id === response.data.card.id)
    card.priority = response.data.card.priority
    console.log(self.priority)
  }).catch(() => {
    //
  })
}

export {
  store,
  update,
  destroy,
  sort,
  moveCard,
  addOrRemoveMembers,
  priority
}

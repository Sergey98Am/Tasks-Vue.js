import authAxios from '../../config/authAxios'

function validation () {
  return {
    card_title: {
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

function store (self, target, list) {
  self.$validator.validate('card_title').then((result) => {
    if (result) {
      let formData = new FormData()
      formData.append('title', self.card_title)
      authAxios.post('/lists/' + list.id + '/cards', formData).then(response => {
        let newCard = response.data.card
        list.cards.push(newCard)
        self.card_title = ''
        setTimeout(function () {
          let container = target.closest('.list-wrapper').querySelector('.list-cards')
          container.scrollTop = container.scrollHeight
        }, 100)
        self.errors.remove(self.card_title)
        sort(list)
      }).catch(error => {
        serverSideValidation(self, error)
        console.log(error)
      })
    }
  })
}

function update (self, list, card) {
  let formData = new FormData()
  formData.append('_method', 'PUT')
  formData.append('id', card.id)
  formData.append('title', card.title)
  formData.append('lists_id', list.id)
  authAxios.post('/lists/' + list.id + '/cards/' + card.id, formData).then(response => {
    if (card.title === '') {
      card.title = response.data.card.title
    }
    // card.title = response.data.card.title
    self.updateCardId = ''
  }).catch(error => {
    console.log(error)
  })
}

function destroy (self, list, card) {
  authAxios.delete('/lists/' + list.id + '/cards/' + card.id).then(response => {
    let card
    for (card in list.cards) {
      if (list.cards[card].id === response.data.card.id) {
        list.cards.splice(card, 1)
      }
    }
    sort(list)
  }).catch(error => {
    console.log(error)
  })
}

function sort (list) {
  let ids = list.cards.map((card) => {
    return card.id
  })
  authAxios.post('/sort_card', {ids: ids}).then(response => {
    console.log(response)
  }).catch(error => {
    console.log(error)
  })
}

function moveCard (event, list) {
  let cardId = event.item.getAttribute('cardId')
  authAxios.post('/move_card_to_another_list/' + cardId, {lists_id: list.id}).then(response => {
    console.log(response)
  }).catch(error => {
    console.log(error)
  })
}

export {
  validation,
  store,
  update,
  destroy,
  sort,
  moveCard
}

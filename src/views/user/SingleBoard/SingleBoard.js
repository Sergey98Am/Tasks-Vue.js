import draggable from 'vuedraggable'
import * as listService from '../../../services/listService'
import * as cardService from '../../../services/cardService'

export default {
  data () {
    return {
      isLoading: false,
      // List
      typingModeList: false,
      updateListId: '',
      board_title: '',
      lists: [],
      list_title: '',
      // Card
      listId: '',
      updateCardId: '',
      cards: [],
      card_title: ''
    }
  },
  components: {
    draggable
  },
  computed: {
    dragOptions () {
      return {
        disabled: false,
        ghostClass: 'ghost',
        chosenClass: 'chosen',
        dragClass: 'drag'
      }
    }
  },
  mounted () {
    this.getLists()
  },
  methods: {
    // Lists
    openAddListTypingMode () {
      this.typingModeList = true
      this.updateListId = ''
      this.list_title = ''
    },
    openUpdateListTypingMode (list) {
      this.typingModeList = false
      this.updateListId = list.id
      this.list_title = list.title
    },
    closeList (list) {
      this.typingModeList = false
      this.updateListId = ''
      list.title = this.list_title
      this.list_title = ''
      this.errors.remove(this.list_title)
      // console.log(list) // If there is no list, console.log is empty
    },

    // Validation
    listValidation () {
      return listService.validation()
    },

    // CRUD
    getLists () {
      listService.get(this)
    },
    storeList (target) {
      listService.store(target, this)
    },
    updateList (list) {
      listService.update(this, list)
    },
    deleteList (list) {
      listService.destroy(list, this)
    },

    // Sort
    sortList () {
      listService.sort(this)
    },

    // Cards
    openAddCardTypingMode (list) {
      this.listId = list.id
      this.updateCardId = ''
      this.card_title = ''
    },
    openUpdateCardTypingMode (card) {
      this.listId = ''
      this.updateCardId = card.id
      this.card_title = card.title
    },
    closeCard (card) {
      this.listId = ''
      this.updateCardId = ''
      card.title = this.card_title
      this.card_title = ''
      this.errors.remove(this.card_title)
      // console.log(list) // If there is no list, console.log is empty
    },

    // Validation
    cardValidation () {
      return cardService.validation()
    },

    // CRUD
    storeCard (target, list) {
      cardService.store(this, target, list)
    },
    updateCard (list, card) {
      cardService.update(this, list, card)
    },
    deleteCard (list, card) {
      cardService.destroy(this, list, card)
    },
    // End CRUD

    sortCard (list) {
      cardService.sort(this, list)
    },
    moveCardToAnotherList (event, list) {
      cardService.moveCard(event, list)
    }
  }
}

<template>
  <div class="add-card">
    <div v-click-outside="closeCard" class="modes">
      <div class="typing-mode" ref="update-list-typing-mode">
        <input type="text" placeholder="Add a card"
               id="card_title"
               name="card_title"
               v-model="card_title"
               @keyup.enter="storeCard($event.target)">
        <button @click="closeCard">
          <font-awesome-icon :icon="['fas', 'times']"/>
        </button>
        <button class="add" @click="storeCard($event.target)">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <span class="icon">
          <font-awesome-icon :icon="['fas', 'check']"/>
        </span>
        </button>
      </div>
      <div class="button-mode active" ref="update-list-button-mode">
        <button @click="openAddCardTypingMode()">
          <font-awesome-icon :icon="['fas', 'plus']"/>
          Add a card
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import * as cardService from '../../../services/cardService'
import ClickOutside from 'vue-click-outside'

export default {
  directives: {
    ClickOutside
  },
  props: [
    'list'
  ],
  data () {
    return {
      listId: '',
      card_title: ''
    }
  },
  methods: {
    openAddCardTypingMode () {
      let buttonMode = this.$refs['update-list-button-mode']
      let typingMode = this.$refs['update-list-typing-mode']
      buttonMode.classList.remove('active')
      typingMode.classList.add('active')
      typingMode.querySelector('input').focus()
    },
    closeCard () {
      let typingMode = this.$refs['update-list-typing-mode']
      let buttonMode = this.$refs['update-list-button-mode']
      typingMode.classList.remove('active')
      buttonMode.classList.add('active')
      this.card_title = ''
    },
    storeCard (target) {
      cardService.store(this, target)
    }
  }
}
</script>

<style scoped>
.add-card {
  display: inline-block;
  padding: 5px 10px;
}

.spinner-border {
  display: none;
  width: 15px;
  height: 15px;
  color: #060240;
}

.icon {
  pointer-events: none;
}

input {
  width: 100%;
  border: none;
  border-bottom: 1px solid #ffffff;
  background: none;
  color: #ffffff;
}

.typing-mode {
  display: none;
  text-align: center;
}

.typing-mode button {
  border: 1px solid #10294e;
  background: #ffffff;
  color: #10294e;
}

.button-mode {
  display: none;
}

.button-mode button {
  width: 100%;
  padding: 5px 10px;
  border-radius: 4px;
  background: white;
  color: #10294e;
  font-size: 14px;
}

.active {
  display: flex !important;
}
</style>

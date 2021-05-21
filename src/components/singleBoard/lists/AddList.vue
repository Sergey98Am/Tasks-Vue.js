<template>
  <div class="add-list">
    <div v-click-outside="closeList" class="modes">
      <div class="typing-mode" ref="add-list-typing-mode">
        <input type="text" placeholder="Add a list"
               id="list_title"
               name="list_title"
               v-model="list_title"
               @keyup.enter="storeList">
        <button class="input-button close-button" @click="closeList">
          <font-awesome-icon :icon="['fas', 'times']"/>
        </button>
        <button class="input-button" @click="storeList">Add</button>
      </div>
      <div class="button-mode active" ref="add-list-button-mode">
        <button class="only-button" @click="openAddListTypingMode('list')">
          <font-awesome-icon :icon="['fas', 'plus']"/>
          Add List
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import * as listService from '../../../services/listService'
import ClickOutside from 'vue-click-outside'

export default {
  directives: {
    ClickOutside
  },
  props: [
    'lists'
  ],
  data () {
    return {
      list_title: ''
    }
  },
  methods: {
    openAddListTypingMode () {
      let buttonMode = this.$refs['add-list-button-mode']
      let typingMode = this.$refs['add-list-typing-mode']
      buttonMode.classList.remove('active')
      typingMode.classList.add('active')
      typingMode.querySelector('input').focus()
    },
    closeList () {
      let typingMode = this.$refs['add-list-typing-mode']
      let buttonMode = this.$refs['add-list-button-mode']
      typingMode.classList.remove('active')
      buttonMode.classList.add('active')
      this.list_title = ''
      this.errors.clear()
    },
    storeList () {
      listService.store(this)
    }
  }
}
</script>

<style scoped>
.add-list {
  display: inline-block;
}

button {
  width: 50px;
  padding: 10px;
  border: 1px solid #ffffff;
  background: #10294e;
  color: #ffffff;
  font-weight: 400;
  text-align: center;
  transition: background-color 150ms;
}

.typing-mode {
  display: none;
  border-radius: 10px;
}

input {
  width: 250px;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #060240;
  border-radius: 0.3rem;
  background: none;
  color: #ffffff;
  font-weight: 400;
  transition: background-color 150ms;
}

input::placeholder {
  color: #ffffff;
}

.add-list .button-mode {
  display: none;
}

.button-mode .only-button {
  width: 360px;
  padding: 10px 5px;
  border-radius: 5px;
}

.active {
  display: block!important;
}
</style>

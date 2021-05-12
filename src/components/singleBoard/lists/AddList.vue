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

<style scoped >
.add-list {
  padding: 10px 0;
  display: flex;
  justify-content: center;
  vertical-align: top;
}

.add-list button {
  width: 50px;
  background: #12E7D4;
  color: #060240;
  border: 2px solid #060240;
  font-weight: 400;
  padding: 10px;
  border-radius: 0.3rem;
  transition: background-color 150ms;
  text-align: center;
  margin: 2px;
}

.add-list .typing-mode {
  display: none;
  border-radius: 10px;
}

.add-list .typing-mode input {
  background: none;
  color: #060240;
  font-weight: 400;
  border: none;
  border-bottom: 2px solid #060240;
  padding: 10px;
  border-radius: 0.3rem;
  transition: background-color 150ms;
  width: 250px;
}

.add-list .button-mode {
  display: none;
}

.add-list .button-mode .only-button {
  padding: 10px 5px;
  background-color: #12E7D4;
  color: #060240;
  border: 2px solid #060240;
  width: 360px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}

.active {
  display: block!important;
}
</style>

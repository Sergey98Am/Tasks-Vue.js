<template>
  <div class="board">
    <div class="board-header">
      <h3 class="board-title">{{ board_title }}</h3>
      <div class="add-list">
        <div class="input-mode" v-if="editMode">
          <input type="text" placeholder="Add List"
                 id="list_title"
                 name="list_title"
                 v-model="list_title"
                 v-validate="listValidation().list_title"
                 :class="{ 'is-invalid':errors.has('list_title') }"
                 @keyup.enter="storeList">
          <button class="input-button close-button" @click="closeAddList">
            <font-awesome-icon :icon="['fas', 'times']"/>
          </button>
          <button class="input-button" @click="storeList">Add</button>
          <div class="invalid-feedback">
            <span v-if="errors.has('list_title')">{{ errors.first('list_title') }}</span>
          </div>
        </div>
        <div class="button-mode" @click="editMode=true" v-else>
          <button class="only-button">
            <font-awesome-icon :icon="['fas', 'plus']"/>
            Add List
          </button>
        </div>
      </div>
    </div>
    <div class="board-content">
      <div class="board-canvas">
        <div class="list-wrapper" v-for="list in lists" :key="list.id">
          <div class="list-content">
            <div class="list-header">
              <div class="update-list">
                <div class="input-mode" v-if="updateListId===list.id">
                  <input type="text" v-model="list_title" @keyup.enter="updateList">
                  <button @click="closeUpdateList">
                    <font-awesome-icon :icon="['fas', 'times']"/>
                  </button>
                  <button class="update" @click="updateList">
                    <font-awesome-icon :icon="['fas', 'check']"/>
                  </button>
                </div>
                <div class="button-mode" @click="updateInput(list)" v-else>
                  <h5 class="list-title">{{ list.title }}</h5>
                  <button>
                    <font-awesome-icon :icon="['fas', 'edit']"/>
                  </button>
                </div>
              </div>
            </div>
            <ul class="list-cards">
              <li>Complete mock-up for client website</li>
              <li>Email mock-up to client for feedback</li>
              <li>Email mock-up to client for feedback</li>
              <li>Email mock-up to client for feedback</li>
              <li>Email mock-up to client for feedback</li>
              <li>Email mock-up to client for feedback</li>
              <li>Email mock-up to client for feedback</li>
            </ul>
            <div class="list-footer">
              <div class="add-card">
                <button>
                  <font-awesome-icon :icon="['fas', 'plus']"/>
                  Add a card
                </button>
              </div>
              <div class="delete-list">
                <button @click="deleteList(list.id)">
                  <font-awesome-icon :icon="['fas', 'trash']"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.board {
  padding-top: 55px;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.board .board-header {
  display: flex;
  padding: 10px 0;
}

.board .board-header .board-title {
  color: #060240;
  margin: 0 15px;
  font-style: italic;
  font-weight: 700;
}

.board .board-header .add-list {
  display: inline-block;
  vertical-align: top;
}

.board .board-header .add-list button {
  font-weight: 400;
  padding: 10px;
  border-radius: 0.3rem;
  transition: background-color 150ms;
  text-align: center;
}

.board .board-header .add-list .input-mode {
  border-radius: 10px;
}

.board .board-header .add-list .input-mode input {
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

.board .board-header .add-list .input-mode .input-button {
  background-color: #12E7D4;
  color: #060240;
  border: 2px solid #060240;
  width: 50px;
}

.board .board-header .add-list .input-mode .close-button {
  background: #060240;
  color: #12E7D4;
  border: 2px solid #12E7D4;
}

.board .board-header .add-list .only-button {
  background-color: #12E7D4;
  color: #060240;
  border: 2px solid #060240;
  width: 250px;
}

.board .board-content {
  position: relative;
  height: 100%;
}

.board .board-content .board-canvas {
  position: absolute;
  overflow-x: auto;
  overflow-y: hidden;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 5px;
  white-space: nowrap;
}

.board .board-content .board-canvas .list-wrapper {
  display: inline-block;
  vertical-align: middle;
  white-space: normal;
  width: 250px;
  margin: 0 5px;
  height: 100%;
  border-radius: 5px;
}

.board .board-content .board-canvas .list-wrapper .list-content {
  background-color: #eaeaea;
  max-height: 100%;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.board .board-content .board-canvas .list-wrapper .list-content .list-header {
  background: #12E7D4;
  color: #060240;
  font-weight: 700;
  padding: 16px;
}

.board .list-wrapper .list-content .list-header .update-list .button-mode {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #060240;
  padding: 5px 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.board .list-header .update-list .button-mode button {
  background: none;
  color: #12E7D4;
  border: none;
}

.board .list-header .update-list .list-title {
  color: #12E7D4;
  margin: 0;
}

.board .list-content .list-header .update-list .input-mode {
  display: flex;
  background: #060240;
  padding: 5px 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.board .list-header .update-list button {
  background: #12E7D4;
  border-bottom: 1px solid #12E7D4;
  border-left: 1px solid #060240;
  border-top: 1px solid #060240;
  border-right: 1px solid #060240;
}

.board .list-header .update-list .input-mode input {
  background: none;
  border: none;
  border-bottom: 1px solid #12E7D4;
  color: #12E7D4;
  width: 100%;
}

.board .list-header .update-list .update {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 3px;
}

.board .list-cards {
  padding: 9px 9px 0;
  overflow-y: auto;
}

.board .list-cards::-webkit-scrollbar {
  width: 20px;
}

.board .list-cards::-webkit-scrollbar-thumb {
  border-right: 10px solid #bfc4ce;
}

.board .list-cards li {
  background: #e0dede;
  color: #261473;
  list-style: none;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 10px;
  border-bottom: 2px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
}

.board .list-cards li:hover {
  background-color: #eee;
}

.board .list-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #12E7D4;
  color: #060240;
  font-weight: 400;
  text-align: left;
  padding: 11px;
}

.board .list-footer .add-card button {
  background: #12E7D4;
  color: #060240;
  padding: 5px 10px;
  font-size: 14px;
  border: 1px solid #060240;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.board .list-footer .delete-list button {
  background: #060240;
  color: #12E7D4;
  border: 1px solid #21e3d1;
  border-bottom-right-radius: 8px;
}

.is-invalid {
  border-color: #dc3545 !important;
}
</style>

<script>
import * as listService from '../services/listService'

export default {
  data () {
    return {
      editMode: false,
      updateListId: '',
      board_title: '',
      lists: [],
      id: '',
      list_title: ''
    }
  },
  mounted () {
    this.getLists()
  },
  methods: {
    closeAddList () {
      this.editMode = false
      this.list_title = ''
      this.$validator.reset()
    },
    closeUpdateList () {
      this.id = ''
      this.updateListId = ''
      this.list_title = ''
    },
    updateInput (list) {
      this.id = list.id
      this.updateListId = list.id
      this.list_title = list.title
    },

    // Validation
    listValidation: function () {
      return listService.validation()
    },
    // End Validation

    // CRUD
    getLists () {
      listService.get(this)
    },
    storeList: function (target) {
      listService.store(target, this)
    },
    updateList: function () {
      listService.update(this)
    },
    deleteList (id) {
      listService.destroy(id, this)
    }
    // End CRUD
  }
}
</script>

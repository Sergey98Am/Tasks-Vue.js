<template>
  <div class="board">
    <div class="board-header">
      <h3 ref="board-title" class="board-title">
        {{ board_title }}
      </h3>
      <div ref="board-title-loader" class="spinner-border text-secondary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="items">
        <div class="invite-member">
          <div class="typing-mode" ref="invite-typing-mode">
            <input type="text" placeholder="Email Address"
                   id="email"
                   name="email"
                   v-model="email">
            <button @click="closeInvite" class="input-button close-button">
              <font-awesome-icon :icon="['fas', 'times']"/>
            </button>
            <button class="input-button" @click="invite">
              <font-awesome-icon :icon="['fas', 'check']"/>
            </button>
          </div>
          <div class="button-mode active" ref="invite-button-mode">
            <button class="only-button" @click="openInviteTypingMode('invite')">
              Invite
            </button>
          </div>
        </div>
        <div class="board-users" style="color: black">
          <button @click="toggleDropdown">Users</button>
          <div class="mini-container" v-if="dropdown">
            <ul>
              <li v-for="user in board_users" :key="user.id">{{ user.name }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="board-content">
      <div class="board-canvas">
        <div v-if="isLoading" class="spinner-border text-primary big-loader" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <!-- Lists -->
        <lists v-else :lists="lists">
          <template #add-list>
            <add-list :lists="lists"></add-list>
          </template>
          <template #update-list="{list}">
            <update-list :list="list"></update-list>
          </template>
          <template #delete-list="{list}">
            <delete-list :lists="lists" :list="list"></delete-list>
          </template>
          <!-- Cards -->
          <template #cards="{list, dragOptions}">
            <cards :list="list" :dragOptions="dragOptions" @event_triggered="goToComments" @event="goToCardModal">
              <template #add-card="{list}">
                <add-card :list="list"></add-card>
              </template>
              <template #update-card="{list, card}">
                <update-card :list="list" :card="card"></update-card>
              </template>
              <template #delete-card="{list, card}">
                <delete-card :list="list" :card="card"></delete-card>
              </template>
            </cards>
          </template>
        </lists>
      </div>
    </div>
    <card-modal :list="lists.find(list => list.id === listId)" :board_users="board_users" ref="card-modal"></card-modal>
    <comments ref="comments"></comments>
  </div>
</template>

<script>
import * as inviteToBoardService from '../../services/inviteToBoardService'
import * as boardService from '../../services/boardService'
import Lists from '../../components/singleBoard/lists/Lists'
import AddList from '../../components/singleBoard/lists/AddList'
import UpdateList from '../../components/singleBoard/lists/UpdateList'
import DeleteList from '../../components/singleBoard/lists/DeleteList'
import Cards from '../../components/singleBoard/cards/Cards'
import AddCard from '../../components/singleBoard/cards/AddCard'
import Comments from '../../components/singleBoard/Comments'
import UpdateCard from '../../components/singleBoard/cards/UpdateCard'
import DeleteCard from '../../components/singleBoard/cards/DeleteCard'
import CardModal from '../../components/singleBoard/cards/CardModal'

export default {
  data () {
    return {
      isLoading: true,
      board_title: '',
      board_users: [],
      lists: [],
      listId: '',
      // Invite
      typingModeInvite: false,
      email: '',
      dropdown: false
    }
  },
  components: {
    'lists': Lists,
    'add-list': AddList,
    'update-list': UpdateList,
    'delete-list': DeleteList,
    'cards': Cards,
    'add-card': AddCard,
    'update-card': UpdateCard,
    'delete-card': DeleteCard,
    'card-modal': CardModal,
    'comments': Comments
  },
  mounted () {
    this.getSingleBoard()
  },
  methods: {
    // Single Board
    getSingleBoard () {
      boardService.singleBoard(this)
    },

    // Invite
    openInviteTypingMode () {
      let buttonMode = this.$refs['invite-button-mode']
      let typingMode = this.$refs['invite-typing-mode']
      buttonMode.classList.remove('active')
      typingMode.classList.add('active')
      typingMode.querySelector('input').focus()
    },
    closeInvite () {
      let typingMode = this.$refs['invite-typing-mode']
      let buttonMode = this.$refs['invite-button-mode']
      typingMode.classList.remove('active')
      buttonMode.classList.add('active')
      this.email = ''
      this.$validator.reset()
    },
    invite () {
      inviteToBoardService.invite(this)
    },
    toggleDropdown (selected) {
      this.selected = selected
      this.dropdown = !this.dropdown
    },

    // Comments
    goToComments (cardId) {
      this.$refs.comments.commentModal(cardId)
    },

    // Card Modal
    goToCardModal (listId, card) {
      this.listId = listId
      this.$refs['card-modal'].cardModal(card)
    }
  }
}
</script>

<style scoped>
/* Loader */
.big-loader {
  display: block;
  width: 100px;
  height: 100px;
  margin: 150px auto;
}

ul {
  list-style: none;
  padding: 0;
}

.board {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 55px;
}

.board-content {
  position: relative;
  height: 100%;
}

.board-header {
  display: flex;
  align-items: center;
  padding: 8px 20px;
  background: #1d2c44;
}

.board-header .items {
  display: flex;
}

.board-title {
  margin: 0;
}

.board-header button {
  width: 50px;
  padding: 5px 7px;
  border: none;
  font-weight: 400;
  text-align: center;
}

.invite-member {
  margin-left: 10px;
  margin-right: 10px;
}

.invite-member button {
  background: #ffffff;
  color: #10294e;
}

.invite-member .typing-mode {
  display: none;
}

.invite-member .typing-mode button {
  width: 30px;
}

.invite-member .typing-mode input {
  width: 160px;
  border: none;
  border-bottom: 2px solid #ffffff;
  background: none;
  color: #ffffff;
  font-weight: 400;
  transition: background-color 150ms;
}

.invite-member .typing-mode input::placeholder {
  color: #ffffff;
}

.invite-member .button-mode {
  display: none;
}

.invite-member .button-mode .only-button {
  width: 220px;
}

.board-users {
  position: relative;
}

.board-users button {
  width: 150px;
  background: #405471;
  color: #ffffff;
}

.board-users .mini-container {
  position: absolute;
  z-index: 9;
  width: 150px;
  padding: 10px;
  border-top: 1px solid #ffffff;
  background: #405471;
}

.users-dropdown {
  display: block !important;
}

.board-users .mini-container ul {
  overflow: auto;
  max-height: 250px;
  margin: 0;
}

.board-users .mini-container ul::-webkit-scrollbar {
  width: 20px;
}

.board-users .mini-container ul::-webkit-scrollbar-thumb {
  border-right: 10px solid #bfc4ce;
}

.board-users .mini-container ul li {
  padding: 5px;
  border-bottom: 2px solid #ffffff;
  border-radius: 5px;
  margin: 5px;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
}

.active {
  display: flex !important;
}

.navbar-toggler {
  background-color: red !important;
}

@media (max-width: 991px) {
  .board {
    padding-top: 62px;
  }
}

@media (max-width: 768px) {
  .invite-member .button-mode button {
    width: 120px !important;
  }

  .board-users button {
    width: 120px !important;
  }
}

@media (max-width: 576px) {
  .board-header {
    flex-direction: column;
    padding: 8px;
  }

  .board-header .spinner-border {
    margin-bottom: 10px;
  }

  .board-title {
    margin-bottom: 10px;
    font-size: 16px;
  }

  .invite-member .typing-mode input {
    width: 100px !important;
    font-size: 14px;
  }

  .invite-member .button-mode button {
    width: 90px !important;
  }

  .board-users button {
    width: 90px !important;
  }

  .mini-container {
    right: 0;
  }
}
</style>

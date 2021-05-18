<template>
  <div class="board">
    <div class="board-header">
      <h3 class="board-title">
        {{ board_title }}
        <circle-spin v-show="isLoading"></circle-spin>
      </h3>
      <div class="invite-member">
        <div class="typing-mode" ref="invite-typing-mode">
          <input type="text" placeholder="Email Address"
                 id="email"
                 name="email"
                 v-model="email"
                 v-validate="inviteValidation().email"
                 :class="{ 'is-invalid':errors.has('email') }">
          <button @click="closeInvite" class="input-button close-button">
            <font-awesome-icon :icon="['fas', 'times']"/>
          </button>
          <button class="input-button" @click="invite">
            <font-awesome-icon :icon="['fas', 'check']"/>
          </button>
          <div class="invalid-feedback">
            <span v-if="errors.has('email')">{{ errors.first('email') }}</span>
          </div>
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
    <!-- Lists -->
    <lists :lists="lists">
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
      isLoading: false,
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
    // Validation
    inviteValidation () {
      return inviteToBoardService.validation()
    },
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
ul {
  list-style: none;
  padding: 0;
}

.is-invalid {
  border-bottom: 2px solid red !important;
}

/* Loading */

.sk-fading-circle {
  margin: 0 !important;
  margin-left: 10px !important;
}

.sk-circle::before {
  background-color: #060240 !important;
}

.board {
  padding-top: 55px;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.board-header {
  background: dodgerblue;
  display: flex;
  padding: 10px 0;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.board-header button {
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

.invite-member {
  margin-left: 10px;
}

.invite-member button {
  background-color: #060240;
  color: #12E7D4;
  border: 2px solid #12E7D4;
  padding: 10px;
}

.invite-member .typing-mode {
  display: none;
}

.invite-member .typing-mode input {
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

.invite-member .button-mode {
  display: none;
}

.invite-member .button-mode .only-button {
  background-color: #060240;
  color: #12E7D4;
  border: 2px solid #12E7D4;
  width: 250px;
}

.board-users button {
  width: 150px;
}

.board-users .mini-container {
  background: #12E7D4;
  border: 2px solid #060240;
  border-radius: 15px;
  padding: 10px;
  position: absolute;
  z-index: 9;
  /*display: none;*/
}

.users-dropdown {
  display: block !important;
}

.board-users .mini-container ul {
  max-height: 250px;
  overflow: auto;
}

.board-users .mini-container ul::-webkit-scrollbar {
  width: 20px;
}

.board-users .mini-container ul::-webkit-scrollbar-thumb {
  border-right: 10px solid #bfc4ce;
}

.board-users .mini-container ul li {
  color: #060240;
  padding: 5px;
  margin: 5px;
  border-bottom: 2px solid #060240;
  border-radius: 10px;
  font-size: 14px;
}

.active {
  display: block !important;
}
</style>

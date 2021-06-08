<template>
  <div class="list-cards">
    <div class="cards">
      <draggable :list="list.cards" :options="{group:'cards'}" v-bind="dragOptions" :scroll-sensitivity="200"
                 @add="moveCardToAnotherList($event)" @change="sortCard()">
        <transition-group class="transition" type="transition" name="flip-list">
          <div v-for="card in list.cards" :key="card.id" :cardId="card.id" class="card">
            <div class="priority">
              <span v-if="card.priority === 'Highest'" style="background: #eb5a46">{{ card.priority }}</span>
              <span v-if="card.priority === 'Critical'" style="background: #ff9f1a">{{ card.priority }}</span>
              <span v-if="card.priority === 'High'" style="background: #f2d600">{{ card.priority }}</span>
              <span v-if="card.priority === 'Medium'" style="background: #61bd4f">{{ card.priority }}</span>
              <span v-if="card.priority === 'Low'" style="background: #0079BF">{{ card.priority }}</span>
            </div>
            <div class="actions">
              <slot name="update-card" :list="list" :card="card"></slot>
              <button @click="$emit('event', list.id, card)">
                <font-awesome-icon :icon="['fas', 'door-open']"/>
              </button>
              <button @click="$emit('event_triggered', card.id)">
                <font-awesome-icon :icon="['fas', 'comment-alt']"/>
              </button>
              <slot name="delete-card" :list="list" :card="card"></slot>
            </div>
            <div class="members">
              <p v-for="member in card.members" :key="member.id">{{ member.name_initials }}</p>
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>
    <slot name="add-card" :list="list"></slot>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import * as cardService from '../../../services/cardService'

export default {
  props: [
    'list',
    'dragOptions'
  ],
  components: {
    draggable
  },
  methods: {
    sortCard () {
      cardService.sort(this)
    },
    moveCardToAnotherList (event) {
      cardService.moveCard(this, event)
    }
  }
}
</script>

<style scoped>
.flip-list-move {
  transition: transform .6s;
}

.ghost {
  opacity: 0;
}

.priority {
  display: flex;
  margin-bottom: 5px;
}

.priority span {
  padding: 5px;
  border-radius: 5px;
}

.actions {
  display: flex;
}

.actions button {
  background: none;
  border: none;
  color: #060240;
}

.list-cards {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cards {
  margin: 0;
  padding: 9px;
  overflow-y: auto;
}

.cards .transition {
  display: block;
  height: auto;
}

.cards::-webkit-scrollbar {
  width: 20px;
}

.cards::-webkit-scrollbar-thumb {
  border-right: 10px solid #bfc4ce;
}

.card {
  background: #bfcbe2;
  /*color: #10294e;*/
  list-style: none;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
}

.card:last-child {
  margin: 0;
}

.members {
  margin-top: 5px;
  display: flex;
}

.members p {
  background: #10294e;
  color: #ffffff;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  margin: 2px;
  padding: 5px;
  border-radius: 50%;
}
</style>

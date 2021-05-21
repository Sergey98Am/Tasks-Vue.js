<template>
  <div class="list-cards">
    <ul>
      <draggable :list="list.cards" :options="{group:'cards'}" v-bind="dragOptions"
                 @add="moveCardToAnotherList($event)" @change="sortCard()">
        <transition-group class="transition" type="transition" name="flip-list">
          <li v-for="card in list.cards" :key="card.id" :cardId="card.id">
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
          </li>
        </transition-group>
      </draggable>
    </ul>
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

ul {
  margin: 0;
  padding: 9px;
  overflow-y: auto;
}

ul .transition {
  display: block;
  height: auto;
}

ul::-webkit-scrollbar {
  width: 20px;
}

ul::-webkit-scrollbar-thumb {
  border-right: 10px solid #bfc4ce;
}

li {
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

li:last-child {
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

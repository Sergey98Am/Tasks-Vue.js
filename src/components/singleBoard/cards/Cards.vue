<template>
  <ul class="list-cards">
    <draggable :list="list.cards" :options="{group:'cards'}" v-bind="dragOptions"
               @add="moveCardToAnotherList($event)" @change="sortCard()">
      <transition-group class="transition" type="transition" name="flip-list">
        <li v-for="card in list.cards" :key="card.id" :cardId="card.id">
          <div class="actions">
            <slot name="update-card" :list="list" :card="card"></slot>
            <button @click="$emit('event_triggered', card.id)">
              <font-awesome-icon :icon="['fas', 'comment-alt']"/>
            </button>
            <slot name="delete-card" :list="list" :card="card"></slot>
          </div>
        </li>
      </transition-group>
    </draggable>
    <slot name="add-card" :list="list"></slot>
  </ul>
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
  transition: transform 0.5s;
}

.ghost {
  opacity: 0;
}

.drag {
  z-index: 1;
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
  padding: 9px;
  overflow-y: auto;
}

.list-cards .transition {
  display: block;
  height: auto;
}

.list-cards::-webkit-scrollbar {
  width: 20px;
}

.list-cards::-webkit-scrollbar-thumb {
  border-right: 10px solid #bfc4ce;
}

.list-cards li {
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

.list-cards li:hover {
  background-color: #eee;
}
</style>

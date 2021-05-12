<template>
  <div class="board-content">
    <slot name="add-list"></slot>
    <div class="board-canvas">
      <draggable :list="lists" :options="{group:'lists'}" v-bind="dragOptions" style="height: 100%"
                 @change="sortList">
        <transition-group type="transition" name="flip-list">
          <div class="list-wrapper" v-for="list in lists" :key="list.id">
            <div class="list-content">
              <div class="list-header">
                <slot name="update-list" :list="list"></slot>
              </div>
              <slot name="cards" :list="list" :dragOptions="dragOptions"></slot>
              <div class="list-footer">
                <slot name="delete-list" :list="list"></slot>
              </div>
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import * as listService from '../../../services/listService'

export default {
  props: [
    'lists'
  ],
  data () {
    return {
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
  methods: {
    // Sort
    sortList () {
      listService.sort(this)
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

.board-content {
  position: relative;
  height: 100%;
}

.board-canvas {
  position: absolute;
  overflow-x: auto;
  overflow-y: hidden;
  left: 0;
  top: 65px;
  right: 0;
  bottom: 0;
  padding: 5px;
  white-space: nowrap;
}

.list-wrapper {
  display: inline-block;
  vertical-align: middle;
  white-space: normal;
  width: 250px;
  margin: 0 5px;
  height: 100%;
  border-radius: 5px;
}

.list-content {
  background-color: #eaeaea;
  max-height: 100%;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.list-header {
  background: #12E7D4;
  color: #060240;
  font-weight: 700;
  padding: 16px;
}

.list-footer {
  display: flex;
  justify-content: center;
  align-items: start;
  background: #12E7D4;
  color: #060240;
  font-weight: 400;
  text-align: left;
  padding: 11px;
}
</style>

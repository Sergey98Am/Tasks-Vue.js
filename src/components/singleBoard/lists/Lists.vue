<template>
  <div class="lists">
    <draggable :list="lists" :options="{group:'lists'}" v-bind="dragOptions" :scroll-sensitivity="200"
               style="height: 100%; display: inline-block"
               @change="sortList">
      <transition-group type="transition" name="flip-list">
        <div @drag="a($event)" class="list-wrapper" v-for="list in lists" :key="list.id">
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
    <slot name="add-list"></slot>
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
        animation: 200,
        disabled: false,
        ghostClass: 'ghost',
        chosenClass: 'chosen',
        dragClass: 'drag'
      }
    }
  },
  methods: {
    a (event) {
      event.dataTransfer.clearData()
      console.log(event.dataTransfer)
    },
    // Sort
    sortList () {
      listService.sort(this)
    }
  }
}
</script>

<style scoped>
/* Draggable */
.flip-list-move {
  transition: transform .5s;
}

.ghost {
  opacity: 0;
}

.lists {
  position: absolute;
  left: 0;
  top: 15px;
  right: 0;
  bottom: 15px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 5px;
  white-space: nowrap;
}

.list-wrapper {
  display: inline-block;
  vertical-align: middle;
  width: 250px;
  height: 100%;
  border-radius: 5px;
  margin: 0 10px;
  white-space: normal;
}

.list-content {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 100%;
  border-radius: 5px;
  background: #10294e;
  box-shadow: rgba(222, 219, 219, 0.43) 0px 2px 8px;
}

.list-header {
  padding: 10px;
  font-weight: 700;
}

.list-footer {
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 8px;
  color: #060240;
  font-weight: 400;
  text-align: left;
}
</style>

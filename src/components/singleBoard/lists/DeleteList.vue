<template>
  <div class="delete-list">
    <button @click="deleteList(list)">
      <font-awesome-icon :icon="['fas', 'trash']"/>
    </button>
  </div>
</template>

<script>
import * as listService from '../../../services/listService'

export default {
  props: [
    'lists',
    'list'
  ],
  methods: {
    deleteList () {
      listService.destroy(this)
    }
  }
}
</script>

<style scoped>
.delete-list button {
  background: #060240;
  color: #12E7D4;
  border: 1px solid #21e3d1;
  border-radius: 5px;
}
</style>

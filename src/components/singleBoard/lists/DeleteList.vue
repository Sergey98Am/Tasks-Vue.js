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
  border: 1px solid #ffffff;
  border-radius: 5px;
  background: #10294e;
  color: #ffffff;
}
</style>

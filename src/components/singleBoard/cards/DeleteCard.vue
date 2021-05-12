<template>
  <button @click="deleteCard">
    <font-awesome-icon :icon="['fas', 'trash']"/>
  </button>
</template>

<script>
import * as cardService from '../../../services/cardService'

export default {
  props: [
    'list',
    'card'
  ],
  methods: {
    deleteCard () {
      cardService.destroy(this)
    }
  }
}
</script>

<style>
button {
  background: none;
  border: none;
  color: #060240;
}
</style>

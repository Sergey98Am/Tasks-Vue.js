<template>
  <div>
    <!-- Modal -->
    <transition name="fade">
      <div class="modal" style="display: block" v-show="modal" @click.self="closeModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header" style="overflow: hidden">
              <h5 class="modal-title">{{ title }}</h5>
              <button type="button" class="close" @click="closeModal">
                <span>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <multiselect placeholder="Select Member(s)" :multiple="true"
                             :options="board_users.map(user => user.id)"
                             :custom-label="opt => board_users.find(user => user.id === opt).name"
                             v-model="selectedMembers"></multiselect>
              </div>
              <div class="modal-footer">
                <button type="button" class="close-button btn btn-secondary" @click="closeModal">Close</button>
                <button class="create-button btn btn-dark" @click="addOrRemoveMembers">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- End Modal -->
    <!--    <circle-spin v-show="isLoading"></circle-spin>-->
  </div>
</template>

<script>
import * as cardService from '../../../services/cardService'

export default {
  data () {
    return {
      modal: false,
      cardId: '',
      title: '',
      selectedMembers: []
    }
  },
  props: [
    'board_users',
    'list'
  ],
  methods: {
    cardModal (card) {
      this.modal = true
      this.cardId = card.id
      this.title = card.title
      this.selectedMembers = card.members ? card.members.map(member => member.id) : []
    },
    closeModal () {
      this.modal = false
      this.title = ''
      this.selectedMembers = []
    },
    addOrRemoveMembers () {
      cardService.addOrRemoveMembers(this)
    }
  }
}
</script>

<style>
/* Multiselect */
.multiselect__tags {
  background: #060240;
}

.multiselect__placeholder {
  color: #12E7D4;
}

.multiselect__content-wrapper {
  background: #060240;
}

.multiselect__option--highlight {
  background: #12E7D4;
  color: #060240;
}

.multiselect__option--highlight::after {
  background: #12E7D4;
}

.multiselect__tag {
  background: #12E7D4;
}

.multiselect__tag-icon:hover {
  background: #060240;
}
</style>

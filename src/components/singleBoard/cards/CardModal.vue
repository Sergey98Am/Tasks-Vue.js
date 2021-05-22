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
                             v-model="selectedMembers" @input="addOrRemoveMembers"></multiselect>
              </div>
              <div class="form-group">
                <select @change="addPriority" v-model="priority" class="form-control">
                  <option value="">Select Priority</option>
                  <option>Highest</option>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="close-button btn btn-secondary" @click="closeModal">Close</button>
<!--              <button @click="addOrRemoveMembers" class="create-button btn btn-dark">-->
<!--                Add-->
<!--              </button>-->
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- End Modal -->
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
      selectedMembers: [],
      priority: ''
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
      this.priority = card.priority ? card.priority : ''
    },
    closeModal () {
      this.modal = false
      this.title = ''
      this.selectedMembers = []
      this.priority = ''
    },
    addOrRemoveMembers () {
      cardService.addOrRemoveMembers(this)
    },
    addPriority () {
      cardService.priority(this)
    }
  }
}
</script>

<style>
/* Multiselect */
.multiselect__tags {
  background: #ffffff;
}

.multiselect__placeholder {
  color: #10294e;
}

.multiselect__content-wrapper {
  background: #ffffff;
}

.multiselect__option--selected {
  background: #10294e;
  color: #ffffff;
}

.multiselect__option--highlight {
  background: #405471;
  color: #ffffff;
}

.multiselect__option--highlight::after {
  background: #405471;
}

.multiselect__tag {
  background: #10294e;
}

.multiselect__tag-icon:hover {
  background: #060240;
}

.create-button {
  border: none;
  background: #445874 !important;
  color: #ffffff !important;
}
</style>

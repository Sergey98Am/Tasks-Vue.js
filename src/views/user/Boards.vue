<template>
  <div class="boards">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="title">Boards</h1>
          <div class="create-board">
            <button type="button" @click="newModal">
              Create New Board
            </button>
          </div>
        </div>
        <div class="col-2" v-for="board in displayedBoards" :key="board.id">
          <div class="card text-center">
            <div class="card-body">
              <h6 class="card-title">
                <router-link :to="'/boards/' + board.id">{{ board.title }}</router-link>
              </h6>
              <button type="button" class="btn btn-secondary" @click="editModal(board)">
                <font-awesome-icon :icon="['fas', 'edit']"/>
              </button>
              <form @submit.prevent="deleteBoard($event.target, board.id)" style="display: inline-block">
                <button class="btn btn-danger">
                  <font-awesome-icon :icon="['fas', 'trash']"/>
                </button>
              </form>
            </div>
          </div>
        </div>
       <div class="col-12">
         <paginate v-model="page" :page-count="pageCount" :page-range="3"
                   :margin-pages="1" :prev-text="'Prev'" :next-text="'Next'"
                   :container-class="'pagination'" :page-class="'page-item'"
                   :hide-prev-next="true"></paginate>
       </div>
      </div>
    </div>

    <!-- Modal -->
    <transition name="fade">
      <div class="modal" style="display: block" v-show="modal" @click.self="closeModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 v-if="editMode" class="modal-title">Edit Board</h5>
              <h5 v-else class="modal-title">Create Board</h5>
              <button type="button" class="close" @click="closeModal">
                <span>&times;</span>
              </button>
            </div>
            <form @submit.prevent="editMode ? updateBoard($event.target) : storeBoard($event.target)">
              <div class="modal-body">
                <div class="form-group">
                  <label style="color: black" for="title">Title</label>
                  <input type="text" class="form-control"
                         id="title"
                         name="title"
                         v-model="title"
                         v-validate="boardValidation().title"
                         :class="{ 'is-invalid':errors.has('title') }">
                  <div class="invalid-feedback">
                    <span v-if="errors.has('title')">{{ errors.first('title') }}</span>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="close-button btn btn-secondary" @click="closeModal">Close</button>
                <button v-if="editMode" class="update-button btn btn-dark">Update</button>
                <button v-else class="create-button btn btn-dark">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
    <!-- End Modal -->
  </div>
</template>

<script>
import * as boardService from '../../services/boardService'
import * as Pagination from '../../pagination'

export default {
  data () {
    return {
      page: 1,
      pageCount: 0,
      pageSize: 4,
      modal: false,
      editMode: false,
      boards: [],
      id: '',
      title: ''
    }
  },
  computed: {
    displayedBoards () {
      return Pagination.paginate(this, this.boards)
    }
  },
  mounted () {
    this.getBoards()
  },
  methods: {
    // Modal Settings
    newModal () {
      this.editMode = false
      this.modal = true
    },
    editModal (board) {
      this.editMode = true
      this.id = board.id
      this.title = board.title
      this.modal = true
    },
    closeModal () {
      this.modal = false
      this.$validator.reset()
      this.id = ''
      this.title = ''
    },

    // Validation
    boardValidation () {
      return boardService.validation()
    },

    // CRUD
    getBoards () {
      boardService.get(this)
    },
    storeBoard (target) {
      boardService.store(target, this)
    },
    updateBoard (target) {
      boardService.update(target, this)
    },
    deleteBoard (target, id) {
      boardService.destroy(target, id, this)
    }
  }
}
</script>

<style>
.boards {
  padding: 50px 0;
  margin-top: 55px;
  overflow: auto;
  height: calc(100% - 55px);
}
.boards .title {
  color: #060240;
}
.boards .create-board {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.boards .create-board button {
  background: #12E7D4;
  color: #060240;
  border: 1px solid #060240;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}

.boards .card {
  background: #060240;
}

.boards .card h6 a {
  color: #12E7D4;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>

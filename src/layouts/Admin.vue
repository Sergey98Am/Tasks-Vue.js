<template>
  <div v-if="$can('view_admin_dashboard')" class="admin d-flex flex-column">
    <v-menu></v-menu>
    <div class="main">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="loading" v-else>
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
import Menu from '../components/AdminMenu'
import authAxios from '../../config/authAxios'

export default {
  components: {
    'v-menu': Menu
  },
  data () {
    return {
      isLoading: false
    }
  },
  watch: {
    $route: {
      handler () {
        this.isLoading = true
        authAxios.get('/abilities').then(response => {
          this.isLoading = false
          let abilities = response.data.permissions
          if (abilities.includes('view_admin_dashboard')) {
            this.$ability.update([
              {subject: 'all', action: response.data.permissions}
            ])
          } else {
            this.$router.push('/')
          }
        })
      },
      immediate: true
    }
  }
}
</script>

<style>
.admin {
  min-height: 100vh;
}

/* Loader */
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh
}

.admin .spinner-border {
  width: 15px;
  height: 15px;
  display: none;
}

.admin .icon {
  pointer-events: none;
}

/* Main */
.admin .main {
  overflow: auto;
  margin-top: 41px;
  margin-left: 250px;
  height: calc(100vh - 41px);
}

.admin .title {
  color: #060240;
}

/* Create button */
.admin .create {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.admin .create button {
  background: #060240;
  color: #12E7D4;
  font-weight: bold;
  border: 3px solid #12E7D4;
  border-radius: 7px;
  padding: 10px;
  margin-bottom: 10px;
}

/* Inputs */
.admin input {
  background: none;
  border: none;
  color: #12E7D4;
  border-bottom: 3px solid #12E7D4;
}

.admin input:focus {
  background: none;
  color: #12E7D4;
  box-shadow: none !important;
}

.admin input:read-only {
  background-color: lightgrey;
  color: #060240;
}

/* Modal */
.admin .modal {
  background-color: rgba(0, 0, 0, 0.3);
  overflow: auto;
  z-index: 9999;
}

.admin .modal .close {
  color: #12E7D4;
}

.admin .modal .modal-content {
  background: #060240 !important;
  border: 2px solid #12E7D4;
}

.admin .modal .modal-title {
  color: #12E7D4;
}

.admin .modal label {
  color: #12E7D4;
}

.modal input {
  background: none;
  color: #12E7D4;
  border: none;
  border-bottom: 3px solid #12E7D4;
}

.admin .modal .create-button {
  background: #12E7D4;
  color: #060240;
}

.admin .modal .update-button {
  background: #12E7D4;
  color: #060240;
}

/* Multiselect */
.admin .multiselect__tags {
  background: #12E7D4;
}

.admin .multiselect__placeholder {
  color: #060240;
}

.admin .multiselect__content-wrapper {
  background: #12E7D4;
}

.admin .multiselect__option--highlight {
  background: #060240;
  color: #12E7D4;
}

.admin .multiselect__option--highlight::after {
  background: #060240;
}

.admin .multiselect__tag {
  background: #060240;
}

.admin .multiselect__tag-icon:hover {
  background: #12E7D4;
}

/* Table */
.table thead {
  background: #060240;
  color: #12E7D4;
}

.table tbody {
  background: #12E7D4;
  color: #060240;
}

.table button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  width: 100px;
  margin: 2px;
}

.table .edit {
  background: #060240;
  color: #12E7D4;
}

.table .delete {
  background: red;
  color: #12E7D4;
}

.table {
  text-align: center;
}

.table .actions {
  text-align: right;
}

/* Pagination */
.admin .pagination > .active > a {
  background: #060240;
  color: #12E7D4 !important;
}

.admin .pagination > li > a {
  background: #12E7D4;
  color: #060240 !important;
  display: block;
  padding: 6px 12px;
  outline: none;
  text-decoration: none;
}

.admin .pagination > .active > a:hover {
  font-weight: bold;
}

@media (max-width: 991px) {
  .main {
    margin-top: 145px;
    margin-left: 0;
  }
}
</style>

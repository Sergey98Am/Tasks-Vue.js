<template>
  <div class="user" style="height: 100%">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '../components/UserNavbar'

export default {
  components: {Navbar}
}
</script>

<style>
/* Modal */
.user .modal {
  background-color: rgba(0, 0, 0, 0.3);
  overflow: auto;
}

.user .modal .modal-content {
  background: #12E7D4!important;
}

.user .modal .modal-title {
  color: #060240;
}

.user .modal label {
  color: #060240;
}

.user .modal input {
  background: none;
  border: none;
  border-bottom: 3px solid #060240;
}

.user .modal .create-button {
  background: #060240;
  color: #12E7D4;
}

.user .modal .update-button {
  background: #060240;
  color: #12E7D4;
}

/* Pagination */
.user .pagination {
  margin-top: 10px;
}
.user .pagination > .active > a {
  color: white;
  background-color: grey;
}

.user .pagination > li > a {
  background: white;
  display: block;
  padding: 6px 12px;
  outline: none;
  text-decoration: none;
  color: inherit;
}

.user .pagination > .active > a:hover {
  color: white;
}
</style>

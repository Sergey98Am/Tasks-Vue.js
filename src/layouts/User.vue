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
.is-invalid {
  border-color: #dc3545 !important;
}

/* Modal */
.user {
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../assets/images/background.jpg');
  background-size: cover;
  background-attachment: fixed;
}

.modal {
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal-content {
  background: #10294e !important;
}

.modal-title {
  color: #ffffff;
}

.modal label {
  color: #ffffff;
}

.modal input {
  border: none !important;
  border-bottom: 3px solid #ffffff !important;
  background: none !important;
  color: #ffffff !important;
}

.create-button {
  background: #405471;
  color: #ffffff;
}

.update-button {
  background: #405471;
  color: #ffffff;
}

/* Pagination */
.pagination {
  margin-top: 10px;
}

.pagination > .active > a {
  background-color: grey;
  color: white;
}

.pagination > li > a {
  display: block;
  padding: 6px 12px;
  background: white;
  color: inherit;
  text-decoration: none;
  outline: none;
}

.pagination > .active > a:hover {
  color: white;
}
</style>

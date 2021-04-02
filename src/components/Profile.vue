<template>
  <div class="profile">
    <div class="container">
      <div class="row">
        <div class="col-8 offset-2">
          <div class="mt-5 card">
            <div class="card-header" v-if="user"><h2>{{ user.name }}</h2></div>
            <div class="card-body" v-if="user">
              <h5 class="card-title">Email</h5>
              <h6 class="card-title">{{ user.email }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.get_user
    }
  }
}
</script>

<style>
.profile {
  margin-top: 55px;
  overflow: auto;
  height: 100%;
}
.profile .card {
  background: #12E7D4;
  color: #060240;
  border: 1px solid #060240;
}
</style>

<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top">
    <router-link class="navbar-brand" to="/">Tasks</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
      </ul>
      <ul v-if="!loggedIn" class="nav navbar-nav navbar-right">
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
      </ul>
      <ul v-if="loggedIn" class="nav navbar-nav navbar-right">
        <li class="nav-item">
          <router-link tag="button" class="profile-button btn btn-secondary" to="/profile">Profile</router-link>
        </li>
        <li class="nav-item">
          <button class="btn btn-light" @click.prevent="LogoutRequest">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import * as userService from '../services/userService'

export default {
  computed: {
    loggedIn () {
      return this.$store.getters.get_loggedIn
    }
  },
  methods: {
    LogoutRequest: function () {
      userService.performLogout(this)
    }
  }
}
</script>

<style>
.navbar {
  background: #060240;
  border-bottom: 1px solid white;
  margin-bottom: 50px;
}
.navbar a {
  color: #12E7D4!important;
}
.navbar .profile-button {
  margin-right: 5px;
}
</style>

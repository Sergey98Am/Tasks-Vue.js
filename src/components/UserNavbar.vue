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
          <router-link tag="button" class="profile-button" to="/profile">Profile</router-link>
        </li>
        <li class="nav-item">
          <button @click.prevent="LogoutRequest" class="logout">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import * as authService from '../services/authService'

export default {
  computed: {
    loggedIn () {
      return this.$store.getters.get_loggedIn
    }
  },
  methods: {
    LogoutRequest: function () {
      authService.logout(this)
    }
  }
}
</script>

<style scoped>
.navbar {
  background: #08162d;
}

a {
  color: #ffffff !important;
}

button {
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
}

.profile-button {
  background: #314666;
  color: #ffffff;
  margin-right: 5px;
}

.logout {
  background: #ffffff;
  color: #314666;
}
</style>

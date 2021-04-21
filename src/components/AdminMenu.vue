<template>
  <div class="menu">
    <nav class="navbar navbar-expand-lg navbar-light p-0 fixed-top">
      <router-link to="/admin" class="navbar-brand ml-2">
        <b><i>Admin Panel</i></b>
      </router-link>
      <button @click="toggle" class="navbar-toggler" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="navbar-nav ml-auto navbar-menu flex-row">
        <li class="nav-item text-nowrap">
          <router-link class="nav-link" to="/profile">Profile</router-link>
        </li>
        <li class="nav-item text-nowrap">
          <a @click="LogoutRequest" class="nav-link">Logout</a>
        </li>
      </ul>
    </nav>
    <div class="sidebarMenu" :class="{ toggled: isToggled }">
      <div class="sidebar-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link to="/admin" class="nav-link active" href="#">
              <font-awesome-icon :icon="['fas', 'tachometer-alt']"/>
              Dashboard
            </router-link>
          </li>
          <li v-if="$can('user_management_access')" class="nav-item sidebar-dropdown dropdown-show">
            <a @click="toggleOn" class="nav-link">
              <span>
                <font-awesome-icon :icon="['fas', 'users']"/>
                User Management
              </span>
              <font-awesome-icon :icon="['fas', 'chevron-down']"/>
            </a>
            <div class="sidebar-dropdown-menu" :class="{ 'toggled-on': toggleOnOff }">
              <router-link v-if="$can('permission_access')" to="/admin/permissions" @click="toggleOnOff = false"
                           class="d-block">
                <font-awesome-icon :icon="['fas', 'unlock-alt']"/>
                Permissions
              </router-link>
              <router-link v-if="$can('role_access')" to="/admin/roles" @click="toggleOnOff = false" class="d-block">
                <font-awesome-icon :icon="['fas', 'suitcase']"/>
                Roles
              </router-link>
              <router-link v-if="$can('user_access')" to="/admin/users" @click="toggleOnOff = false" class="d-block">
                <font-awesome-icon :icon="['fas', 'user']"/>
                Users
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import * as authService from '../services/authService'

export default {
  name: 'Menu',
  data () {
    return {
      isToggled: false,
      toggleOnOff: false
    }
  },
  methods: {
    toggle () {
      this.isToggled = !this.isToggled
    },
    toggleOn () {
      this.toggleOnOff = !this.toggleOnOff
    },
    LogoutRequest () {
      authService.logout(this)
    }
  }
}
</script>

<style>
/* Menu */
.admin .menu a {
  cursor: pointer;
  color: #12E7D4 !important;
}

/* Navbar */
.admin .menu .navbar {
  background: #060240;
  border-bottom: 1px solid white;
  padding: 0 15px;
  z-index: 9999;
  margin-bottom: 0;
}

.admin .menu .navbar-brand {
  width: 250px;
  color: #12E7D4;
}

.admin .menu .navbar-toggler {
  background: #12E7D4;
}

.admin .menu .toggled {
  left: 0 !important;
}

/* Sidebar */
.admin .menu .sidebarMenu {
  background: #060240;
  position: fixed;
  width: 250px;
  transition: 0.5s;
  padding: 48px 0 0;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
}

.admin .menu .sidebar-sticky {
  text-align: start;
  height: calc(100vh - 48px);
  overflow: auto;
}

.admin .menu .sidebar-dropdown-menu {
  overflow: hidden;
  transition: max-height .3s;
  max-height: 0;
}

.admin .menu .sidebar-dropdown a {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin .menu .sidebar-dropdown-menu a {
  padding: 5px 5px 5px 25px;
  text-decoration: none;
}

.admin .menu .toggled-on {
  max-height: 10em;
}

@media (max-width: 991px) {
  .admin .menu .navbar {
    padding: 10px !important;
  }

  .admin .menu .navbar-menu {
    flex-basis: 100%;
  }

  .admin .menu .navbar-brand {
    width: 200px;
  }

  .admin .menu .sidebarMenu {
    width: 100%;
    left: -100%;
    padding: 100px 0 0;
  }

  .admin .menu .main {
    margin-top: 145px;
    margin-left: 0;
  }
}
</style>

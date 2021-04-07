<template>
  <div class="profile">
    <div class="container">
      <div class="row" v-if="userDetails">
        <div class="col-8 offset-2">
          <div class="card personal-information">
            <div class="card-header"><h2>My Profile</h2></div>
            <div class="card-body">
              <div class="form">
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="name">Name</label>
                    <input type="text" class="form-control"
                           id="name"
                           name="name"
                           v-model="userDetails.name"
                           v-validate="userValidation().name"
                           :class="{ 'is-invalid':errors.has('name') }">
                    <div class="invalid-feedback">
                      <span v-if="errors.has('name')">{{ errors.first('name') }}</span>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <label for="email">Email</label>
                    <input type="text" class="form-control"
                           id="email"
                           name="email"
                           v-model="userDetails.email"
                           :class="{ 'is-invalid':errors.has('email') }"
                           readonly>
                    <div class="invalid-feedback">
                      <span v-if="errors.has('email')">{{ errors.first('email') }}</span>
                    </div>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="password">Password</label>
                    <input type="password" class="form-control"
                           id="password"
                           name="password"
                           v-model="user.password"
                           v-validate="userValidation().password"
                           ref="password"
                           :class="{ 'is-invalid':errors.has('password') }">
                    <div class="invalid-feedback">
                      <span v-if="errors.has('password')">{{ errors.first('password') }}</span>
                    </div>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="password_confirmation">Password Confirmation</label>
                    <input type="password" class="form-control"
                           id="password_confirmation"
                           name="password_confirmation"
                           v-model="user.password_confirmation"
                           v-validate="userValidation().password_confirmation"
                           :class="{ 'is-invalid':errors.has('password_confirmation') }">
                    <div class="invalid-feedback">
                      <span v-if="errors.has('password_confirmation')">{{
                          errors.first('password_confirmation')
                        }}</span>
                    </div>
                  </div>
                </div>
                <button @click="changeUserDetails(userDetails)">Update Profile</button>
                <span class="message"><font-awesome-icon :icon="['fas', 'check']"/> {{ message }}</span>
              </div>
            </div>
          </div>
          <circle-spin v-show="isLoading"></circle-spin>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.sk-fading-circle {
  margin: 30px auto !important;
}

.sk-circle::before {
  background-color: #060240 !important;
}

.profile {
  margin-top: 55px;
  padding: 50px 0;
  overflow: auto;
  height: calc(100% - 55px);
}

.profile .card {
  background: #12E7D4;
  color: #060240;
  /*border: 1px solid #060240;*/
  border-top-left-radius: 30px;
  border-bottom-right-radius: 30px;
  overflow: hidden;
}

.profile .card-header {
  background: #060240;
  color: #12E7D4;
}

.profile .card-header h2 {
  margin: 0;
}

.profile label {
  color: #060240;
}

.profile input {
  background: none;
  border: none;
  border-bottom: 3px solid #060240;
}

.profile input:focus {
  background: none;
  border-color: inherit !important;
  box-shadow: none !important;
}

.profile input:read-only {
  background-color: lightgrey;
}

.profile .personal-information button {
  background: #060240;
  color: #12E7D4;
  border: none;
  border-radius: 10px;
  padding: 10px;
}

.profile .message {
  display: none;
}
</style>

<script>
import * as userService from '../../services/userService'

export default {
  data () {
    return {
      isLoading: false,
      message: '',
      user: {
        password: '',
        password_confirmation: ''
      }
    }
  },
  computed: {
    userDetails () {
      return this.$store.getters.get_user
    }
  },
  methods: {
    userValidation: function () {
      return userService.userValidation()
    },
    changeUserDetails: function (user) {
      userService.changeDetails(this, user)
    }
  }
}
</script>

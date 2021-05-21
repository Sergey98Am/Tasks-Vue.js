<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import * as CheckToken from './services/checkToken'

export default {
  name: 'App',
  mounted () {
    CheckToken.checkToken(this)
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
*, *:before, *:after {
  box-sizing: border-box;
}

html {
  height: 100%;
}

body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

input:focus, .modal .form-control:focus, textarea:focus, select:focus {
  background: none !important;
}

.form-control:focus {
  outline: 0 !important;
  /*border-color: inherit !important;*/
  -webkit-appearance:none !important;
  box-shadow: none !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #E0DEDE;
  /*background-image: url('assets/images/background.jpg');*/
  /*background-size: cover;*/
  /*background-attachment: fixed;*/
  position: relative;
  height: 100%;
}

/* Modal */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>

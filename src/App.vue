<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/UserNavbar'
import * as CheckToken from './services/checkToken'

export default {
  name: 'App',
  components: {Navbar},
  mounted () {
    CheckToken.checkToken(this)
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
/* Loader */

.sk-fading-circle {
  margin: 30px auto !important;
}

.sk-circle::before {
  background-color: #060240 !important;
}

/* End Loader */

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

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #E0DEDE;
  background: lightgray;
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

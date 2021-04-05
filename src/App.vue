<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import * as CheckToken from './services/checkToken'
export default {
  name: 'App',
  components: {Navbar},
  mounted () {
    CheckToken.checkToken(this)
  }
}
</script>

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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #E0DEDE;
  background: lightgray;
  position: relative;
  height: 100%;
  /*min-height: 90vh;*/
}
</style>

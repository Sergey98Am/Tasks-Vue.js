<template>
  <div>fdskjfds</div>
</template>

<script>
import * as verifyEmail from '../../services/verifyEmailService'

export default {
  mounted () {
    console.log(this.$route.query)
    this.verifyEmailService()
  },
  methods: {
    verifyEmailService: function () {
      verifyEmail.verifyEmailService(this)
    }
  }
}
</script>

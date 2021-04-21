<template>
  <div>fdskjfds</div>
</template>

<script>
import * as verifyEmail from '../../../services/verifyEmailService'

export default {
  mounted () {
    this.verifyEmailService()
  },
  methods: {
    verifyEmailService () {
      verifyEmail.verifyEmailService(this)
    }
  }
}
</script>

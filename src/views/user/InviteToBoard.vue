<template>
  <div></div>
</template>
<script>
import * as inviteToBoardService from '../../services/inviteToBoardService'

export default {
  mounted () {
    this.confirmInvitation()
  },
  methods: {
    confirmInvitation () {
      inviteToBoardService.confirmInvitation(this)
    }
  }
}
</script>

<template>
  <div class="update-card">
    <div class="typing-mode">
      <div ref="div" @click="editingTarget" class="editing-target"></div>
      <textarea ref="textarea" type="text" rows="1" v-model="card.title" @focus="focus"
                @keyup.enter="updateCard($event)" @blur="closeCard($event.target)"
                @keydown="autosize($event)"></textarea>
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as cardService from '../../../services/cardService'

export default {
  props: [
    'list',
    'card'
  ],
  data () {
    return {
      card_title: '',
      text_size: ''
    }
  },
  mounted () {
    let textarea = this.$refs.textarea
    textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px'
  },
  methods: {
    focus () {
      let textarea = this.$refs.textarea
      this.text_size = textarea.scrollHeight
      this.card_title = this.card.title
    },
    autosize (event) {
      if ((event.keyCode === 13)) {
        event.preventDefault()
      }
      setTimeout(function () {
        event.target.style.cssText = 'height:auto; padding:0'
        event.target.style.cssText = 'height:' + event.target.scrollHeight + 'px'
      }, 0)
    },
    editingTarget () {
      this.$refs.div.classList.add('is-hidden')
      this.$refs.textarea.focus()
    },
    closeCard () {
      // this.$refs.input.blur()
      let textarea = this.$refs.textarea
      textarea.style.cssText = 'height:' + this.text_size + 'px'
      this.text_size = ''
      this.$refs.div.classList.remove('is-hidden')
      this.card.title = this.card_title
      this.card_title = ''
    },
    updateCard () {
      cardService.update(this)
    }
  }
}
</script>

<style scoped>
.editing-target {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
}

.is-hidden {
  display: none;
}
.spinner-border {
  display: none;
  width: 15px;
  height: 15px;
  color: #060240;
}

.icon {
  pointer-events: none;
}

.typing-mode {
  display: flex;
}

.typing-mode button {
  border: 1px solid #060240;
  background: #12E7D4;
}

.typing-mode textarea {
  overflow: hidden;
  width: 100%;
  border: none;
  border-radius: 10px;
  background: none;
  color: #10294e;
  font-size: 14px;
  resize: none;
}

.typing-mode {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.typing-mode .update-delete {
  display: flex;
}

.typing-mode .update-delete button {
  font-size: 12px;
}

.typing-mode p {
  margin: 0;
}

.active {
  cursor: auto !important;
}
</style>

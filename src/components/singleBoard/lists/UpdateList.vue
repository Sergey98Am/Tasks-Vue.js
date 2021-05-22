<template>
  <div class="update-list">
    <div ref="div" @click="editingTarget" class="editing-target"></div>
    <textarea ref="textarea" type="text" rows="1" v-model="list.title" @focus="focus"
              @keyup.enter="updateList($event)" @blur="closeList($event.target)"
              @keydown="autosize($event)"></textarea>
    <div ref="spinner" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
import * as listService from '../../../services/listService'

export default {
  props: [
    'list'
  ],
  data () {
    return {
      list_title: '',
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
      this.list_title = this.list.title
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
    updateList (event) {
      listService.update(this, event)
    },
    closeList () {
      // this.$refs.input.blur()
      let textarea = this.$refs.textarea
      textarea.style.cssText = 'height:' + this.text_size + 'px'
      this.text_size = ''
      this.$refs.div.classList.remove('is-hidden')
      this.list.title = this.list_title
      this.list_title = ''
    }
  }
}
</script>

<style scoped>
.spinner-border {
  display: none;
  width: 15px;
  height: 15px;
  color: #12E7D4;
}

.icon {
  pointer-events: none;
}

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

.update-list {
  position: relative;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

textarea {
  overflow: hidden;
  width: 100%;
  border: none;
  border-radius: 10px;
  background: none;
  color: #ffffff;
  font-size: 14px;
  resize: none;
}

.active {
  cursor: auto !important;
}
</style>

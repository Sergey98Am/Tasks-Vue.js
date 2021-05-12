<template>
  <transition name="fade">
    <div class="modal" style="display: block" v-show="modal" @click.self="closeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Comments</h5>
            <button @click="closeModal" type="button" class="close">
              <span>&times;</span>
            </button>
          </div>
          <div class="form">
            <div class="modal-body">
              <div class="write-comment">
                <div class="form-group">
                <textarea v-model="comment" class="form-control" rows="3"
                          placeholder="Write a comment..."></textarea>
                  <button @click="addComment">Add Comment</button>
                </div>
              </div>
              <div class="comment-list">
                <div v-for="comment in cardComments" :key="comment.id" class="comment">
                  <span>{{ comment.user.name }}</span>
                  <span class="date">{{ comment.created_at }}</span>
                  <div class="comment-container">
                    <div class="typing-mode" v-if="updateCommentId===comment.id">
                      <div class="form-group">
                        <textarea v-model="comment.comment" rows="2" class="form-control"
                                  placeholder="Edit a comment..."></textarea>
                        <button @click="updateComment(comment)">Update</button>
                        <button @click="closeComment(comment)">&times;</button>
                      </div>
                    </div>
                    <p v-else>{{ comment.comment }}</p>
                    <div class="items">
                      <button v-if="comment.user_id !== $store.getters.get_user.id"
                              @click="openReplyTypingMode(comment)">Reply
                      </button>
                      <div v-else>
                        <button @click="openUpdateCommentTypingMode(comment)" v-if="updateCommentId!==comment.id">Edit
                        </button>
                        <button @click="deleteComment(comment)">Delete</button>
                      </div>
                    </div>
                    <div class="typing-mode" v-if="commentId===comment.id">
                      <div class="form-group">
                        <textarea v-model="comment_reply" rows="3" class="form-control"
                                  placeholder="Write a comment..."></textarea>
                        <button @click="addReply(comment)">Add</button>
                        <button @click="closeReply">&times;</button>
                      </div>
                    </div>
                  </div>
                  <div class="reply-list">
                    <h6 class="title" v-if="comment.replies && comment.replies.length"><b><i>Reply</i></b></h6>
                    <div v-for="reply in comment.replies" :key="reply.id" class="reply">
                      <span>{{ reply.user.name }}</span>
                      <span class="date">{{ reply.created_at }}</span>
                      <div class="comment-container">
                        <div class="typing-mode" v-if="updateCommentId===reply.id">
                          <div class="form-group">
                            <textarea v-model="reply.comment" rows="2" class="form-control"
                                      placeholder="Edit a comment..."></textarea>
                            <button @click="updateComment(reply)">Update</button>
                            <button @click="closeComment(reply)">&times;</button>
                          </div>
                        </div>
                        <p v-else>{{ reply.comment }}</p>
                        <div class="items">
                          <button v-if="reply.user_id !== $store.getters.get_user.id"
                                  @click="openReplyTypingMode(reply)">Reply
                          </button>
                          <div v-else>
                            <button @click="openUpdateCommentTypingMode(reply)" v-if="updateCommentId!==reply.id">Edit
                            </button>
                            <button @click="deleteReply(reply)">Delete</button>
                          </div>
                        </div>
                        <div class="typing-mode" v-if="commentId===reply.id">
                          <div class="form-group">
                            <textarea v-model="comment_reply" rows="3" class="form-control"
                                      placeholder="Write a comment..."></textarea>
                            <button @click="addReply(comment)">Add</button>
                            <button @click="closeReply">&times;</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button @click="closeModal" type="button" class="close-button btn btn-secondary">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import * as commentService from '../../services/commentService'

export default {
  data () {
    return {
      modal: false,
      cardId: '',
      cardComments: [],
      comment: '',
      commentId: '',
      comment_reply: '',
      updateCommentId: '',
      commentUpdate: ''
    }
  },
  methods: {
    // Comment Modal
    commentModal (cardId) {
      this.modal = true
      this.cardId = cardId
      this.getComments()
    },
    openUpdateCommentTypingMode (comment) {
      this.updateCommentId = comment.id
      this.commentUpdate = comment.comment
    },
    closeComment (comment) {
      this.updateCommentId = ''
      comment.comment = this.commentUpdate
      this.commentUpdate = ''
    },

    closeModal () {
      this.modal = false
      this.cardId = ''
      this.cardComments = ''
      this.comment = ''
    },

    // Reply typing mode
    openReplyTypingMode (comment) {
      this.comment_reply = ''
      this.commentId = comment.id
      if (comment.parent_id) {
        this.comment_reply = '@' + comment.user.name
      }
    },
    closeReply () {
      this.commentId = ''
      this.comment_reply = ''
    },

    // CRUD
    getComments () {
      commentService.get(this)
    },
    addComment () {
      commentService.addComment(this)
    },
    addReply (parentComment) {
      commentService.addReply(this, parentComment)
    },
    updateComment (comment) {
      commentService.update(this, comment)
    },
    deleteComment (comment) {
      commentService.destroyComment(this, comment)
    },
    deleteReply (comment) {
      commentService.destroyReply(this, comment)
    }
  }
}
</script>

<style scoped>
@media (min-width: 576px) {
  .modal-dialog {
    max-width: 700px;
  }
}

.write-comment button {
  background: #060240;
  color: #12E7D4;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
}

.comment-list {
  max-height: 300px;
  overflow: auto;
}

.comment-list::-webkit-scrollbar {
  width: 20px;
}

.comment-list::-webkit-scrollbar-thumb {
  border-right: 10px solid white;
}

.comment {
  margin-bottom: 20px;
}

.comment:last-child {
  margin: 0;
}

.comment span {
  color: #060240;
}

.comment .comment-container {
  margin-bottom: 10px;
  margin-top: 5px;
}

.comment .comment-container p {
  background: white;
  color: #060240;
  padding: 10px;
  border-radius: 20px;
  font-size: 13px;
  margin: 0;
  display: inline-block;
  max-width: 100%;
  word-break: break-word;
}

.comment .typing-mode textarea {
  margin-top: 10px;
}

.comment .typing-mode button {
  background: white;
  color: #060240;
  border: none;
  border-radius: 5px;
  margin-top: 5px;
}

.comment .date {
  font-size: 12px;
  font-weight: bolder;
}

.comment .items button {
  background: #060240;
  color: #12E7D4;
  font-size: 13px;
  border: none;
  border-radius: 10px;
  margin-top: 5px;
}

.comment .items button:first-child {
  margin-right: 2px;
}

.reply-list {
  margin-top: 20px;
  margin-left: 40px;
}

.reply-list .title {
  color: black;
  text-decoration: underline;
}

.reply-list .comment-container p {
  background: navajowhite;
}
</style>

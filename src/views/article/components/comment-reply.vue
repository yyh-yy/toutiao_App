<template>
  <div class="comment-reply">
  <!-- 导航栏 -->
  <van-nav-bar :title="`${comment.reply_count}条回复`">
  <van-icon
    name="cross"
    slot="left"
    @click="$emit('click-close')"
  />
  </van-nav-bar>

  <!-- 当前评论项 -->
  <comment-item :comment="comment" />

  <van-cell title="所有回复"></van-cell>

  <!-- 评论列表 -->
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  >
  <comment-item v-for="(comment,index) in list" :key="index" :comment="comment" />
  </van-list>

  <!-- 底部区域 -->
        <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论</van-button>
      <van-icon
        color="#e5645f"
        :name="comment.is_liking ? 'like' : 'like-o'"
        @click="onCommentLike(comment)"
      />
      <!-- 发布回复 -->
      <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <!--
        value
        input
       -->
      <post-comment
        v-model="postMessage"
        @click-post="onPost"
      />
    </van-popup>
    <!-- /发布回复 -->
    </div>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import { getComment, addComment, addCommentLike, delCommentLike } from '@/API/comment'
import PostComment from './post-comment'

export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    PostComment
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20,
      isPostShow: false,
      postMessage: ''
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Object, Number],
      required: true
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getComment({
        type: 'c',
        source: this.comment.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      })

      const { results } = data.data
      this.list.push(...results)

      this.loading = false

      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    },
    async onPost () {
      console.log(123)

      const postMessage = this.postMessage
      if (!postMessage) {
        return
      }
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '操作中...'
      })
      try {
        const { data } = await addComment({
          target: this.comment.com_id.toString(),
          content: postMessage,
          art_id: this.articleId.toString()
        })

        this.isPostShow = false
        this.postMessage = ''
        this.list.unshift(data.data.new_obj)
        this.comment.reply_count++

        this.$toast.success('发布成功')
      } catch (error) {
        this.$toast.fail('发布失败')
      }
    },
    async onCommentLike (comment) {
      try {
        if (comment.is_liking) {
          await delCommentLike(comment.com_id.toString())
        } else {
          await addCommentLike(comment.com_id.toString())
        }

        comment.is_liking = !comment.is_liking
        comment.like_count += comment.is_liking ? 1 : -1
        this.$toast.success(comment.is_liking ? '点赞' : '取消点赞')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    }

  }
}
</script>

<style scoped lang="less">
.comment-reply {
  padding-bottom: 44px;
}

.reply-nav-bar {
  background: #fff;
  .van-icon, .van-nav-bar__title, .van-nav-bar__right {
    color: #333;
  }
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .write-btn {
    width: 160px;
  }
  .van-icon {
    font-size: 20px;
  }
}
</style>

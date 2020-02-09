<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      fixed
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 -->
    <van-loading
    v-if="loading"
      class="loading"
      color="#1989fa"
      vertical
    >
      <slot>加载中...</slot>
    </van-loading>
    <!-- /加载中 -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{article.title}}</h3>
      <div class="author-wrap">
        <div class="base-info">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div class="text">
            <p class="name">{{article.aut_name}}</p>
            <p class="time">{{article.pubdate |relativeTime}}</p>
          </div>
        </div>
        <van-button
        class="follow-btn"
        :type="article.is_followed?'default':'info'"
        size="small"
        round
        @click="onFollow"
        :loading="isFollowLoading"
         v-if="!$store.state.user || article.aut_id !== $store.state.user.id"
        >{{article.is_followed?'已关注':'+ 关注'}}</van-button>
      </div>
      <div class="markdown-body" v-html="article.content"></div>
      <van-divider>正文结束</van-divider>
           <!-- 文章评论 -->
       <van-cell title="全部评论"></van-cell>
        <van-list
        v-model="articleComment.loading"
        :finished="articleComment.finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <comment-item
          v-for="(comment, index) in articleComment.list"
          :key="index"
          :comment="comment"
          @click-reply="onReplyShow"
        ></comment-item>
        </van-list>
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败提示 -->
    <div class="error" v-else>
      <img src="./no-network.png" alt="no-network">
      <p class="text">亲，网络不给力哦~</p>
      <van-button
        class="btn"
        type="default"
        size="small"
        @click="loadArticle"
      >点击重试</van-button>
    </div>
    <!-- /加载失败提示 -->

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论
      </van-button>
      <van-icon
        class="comment-icon"
        name="comment-o"
        :info="articleComment.totalCount"
      />
      <van-icon
        color="orange"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        color="#e5645f"
        :name="article.attitude === 1 ? 'good-job' :'good-job-o'"
        @click="onLike"
      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->
    <!-- 发布文章评论 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <div class="post-comment">
        <van-field
          class="post-field"
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
        <van-button
          size="small"
          type="primary"
          @click="onAddComment"
          :disabled="!message"
        >发布</van-button>
      </div>
    </van-popup>
    <!-- 评论回复 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      style="height:90%"
    >
    <comment-reply
    v-if="isReplyShow"
    @click-close="isReplyShow=false"
    :comment="currentComment"
    :article-id="articleId"
     />
    </van-popup>
    </div>

</template>

<script>
import { getArticlesById, addCollect, delCollect, addLike, delLike } from '@/API/article'
import { addFollow, delFollow } from '@/API/user'
import { getComment, addComment } from '@/API/comment'
import CommentItem from './components/comment-item'
import CommentReply from './components/comment-reply'

export default {
  name: 'ArticlePage',
  components: {
    CommentItem,
    CommentReply
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: true,
      isFollowLoading: false,

      // 文章评论

      articleComment: {
        list: [],
        loading: false,
        finished: false,
        offset: null,
        totalCount: 0
      },
      message: '',
      isPostShow: false,
      isReplyShow: false,
      currentComment: {}

    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {

  },
  methods: {
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticlesById(this.articleId)
        this.article = data.data
        console.log(data)
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    // 文章收藏或取消
    async onCollect () {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '操作中...'
      })
      try {
        if (this.article.is_collected) {
          await delCollect(this.articleId)
          this.$toast.fail('取消收藏')
        } else {
          await addCollect(this.articleId)
          this.$toast.success('收藏成功')
        }
        this.article.is_collected = !this.article.is_collected
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },
    // 点赞或取消
    async onLike () {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '操作中...'
      })
      try {
        if (this.article.attitude === 1) {
          await delLike(this.articleId)
          this.article.attitude = -1
          this.$toast.fail('取消点赞')
        } else {
          await addLike(this.articleId)
          this.article.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },
    // 关注用户或取消
    async onFollow () {
      if (this.$store.state.user) {
        this.isFollowLoading = true
        try {
          const authorId = this.article.aut_id
          // 如果已关注，则取消
          if (this.article.is_followed) {
            await delFollow(authorId)
          } else {
            await addFollow(authorId)
          }
          this.article.is_followed = !this.article.is_followed
        } catch (error) {
          this.$toast.fail('更新失败')
        }
        this.isFollowLoading = false
      } else {
        this.$router.push('/login')
      }
    },
    // 请求获取评论列表
    async onLoad () {
      const articleComment = this.articleComment
      // 1.请求获取数据
      const { data } = await getComment({
        type: 'a',
        source: this.articleId,
        offset: articleComment.offset,
        limit: 10
      })
      // console.log(data)
      const { results } = data.data
      articleComment.totalCount = data.data.total_count
      articleComment.list.push(...results)

      articleComment.loading = false
      // 2.将数据添加到列表中
      // 3.将加载更多的loading设置为 false
      // 4.判断是否还有数据
      if (results.length) {
        articleComment.offset = data.data.last_id
      } else {
        articleComment.finished = true
      }
    },
    // 发布文章评论
    async onAddComment () {
      const postMessage = this.message
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
          target: this.articleId,
          content: postMessage
        // art_id:
        })

        this.isPostShow = false
        this.message = ''
        this.articleComment.list.unshift(data.data.new_obj)
        this.articleComment.totalCount++

        this.$toast.success('发布成功')
      } catch (error) {
        this.$toast.fail('发布失败')
      }
    },
    async onReplyShow (comment) {
      // 将子组件中传给我评论对象存储对象
      this.currentComment = comment
      this.isReplyShow = true
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  padding: 46px 20px 150px;
  background: #fff;
  .loading {
    padding-top: 100px;
    text-align: center;
  }
      .van-cell__title{
        margin-top: 30px
      }
    .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3A3A3A;
    }
    .author-wrap {

      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      height: 40px;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
        .text {
          line-height: 1.5;
          .name {
            margin: 0;
            font-size: 14px;
          }
          .time {
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
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
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
  .post-comment {
   display: flex;
   align-items: flex-end;
   padding: 10px;
   .post-field {
     background: #f5f7f9;
     margin-right: 15px;
   }
  }
}
</style>

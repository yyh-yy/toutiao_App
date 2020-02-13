<template>
  <div class="user-articles">
    <!-- 导航栏 -->
    <!--
      router.push 会形成历史记录
      router.replace 也 push 的使用方式一样，但是不会形成历史记录
     -->
    <van-nav-bar
      title="我的收藏/历史/作品"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- /导航栏 -->

    <!-- 标签列表 -->
    <van-tabs v-model="active">
      <van-tab title="我的收藏">
        <user-collect />
      </van-tab>
      <van-tab title="我的历史">
        <user-history />
      </van-tab>
      <van-tab title="我的作品">
        <user-article />
      </van-tab>
    </van-tabs>
    <!-- /标签列表 -->

    <!-- 动态组件 -->
    <!-- <component v-bind:is="currentTabComponent"></component> -->
  </div>
</template>

<script>
import UserArticle from './components/articles'
import UserCollect from './components/collect'
import UserHistory from './components/history'
export default {
  beforeRouteLeave (to, from, next) {
    if (to.name === 'article') {
      this.$store.commit('addCachePage', 'UserArticles')
    } else {
      this.$store.commit('removeCachePage', 'UserArticles')
    }
    next()
  },
  name: 'UserArticles',
  components: {
    UserArticle,
    UserCollect,
    UserHistory
  },
  props: {
    type: {
      type: String
    }
  },
  data () {
    let active = ['collect', 'history'].indexOf(this.type)
    if (active === -1) {
      active = 2
    }
    return {
      active
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.user-articles {
  padding-top: 90px;
  padding-bottom: 50px;
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>

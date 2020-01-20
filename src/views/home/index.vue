<template>
  <div class="home-container">
   <!-- 导航栏 -->
    <!-- <van-nav-bar title="首页" fixed /> -->
    <div class="nav-bar">
      <div class="logo"></div>
      <van-button
        class="search-btn"
        round
        type="info"
        size="small"
        icon="search"
        @click="$router.push('/search')"
      >搜索</van-button>
    </div>
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <!--
      tab 组件
        v-model="active" 控制被激活的标签
        title 标签标题
     -->
    <van-tabs v-model="active">
      <van-icon
        class="wap-nav"
        slot="nav-right"
        name="wap-nav"
        @click="isChannelEditShow = true"
      />
      <van-tab
        :title="channel.name"
        v-for="channel in userChannels"
        :key="channel.id"
      >
        <article-list :channel="channel" />
      </van-tab>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup v-model="isChannelEditShow"
     position="bottom"
     closeable
     close-icon-position="top-left"
     :style="{ height: '85%' }"
     >
     <channel-edit
     :user-channels="userChannels"
     v-model="active"
     @close="isChannelEditShow=false"
     />

     </van-popup>

  </div>
</template>

<script>
import { getUserChannels } from '@/API/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      value: '',
      userChannels: [],
      isChannelEditShow: false
    }
  },
  computed: {

  },
  watch: {},
  created () {
    this.loadUserChannels()
  },
  mounted () {},
  methods: {
    // 关闭弹窗

    async loadUserChannels () {
      // 1. 定义一个变量用来存储频道列表
      let channels = []

      // 2. 获取本地存储的频道列表
      const localUserChannles = getItem('user-channels')

      // 3. 如果本地存储有，就使用本地存储的
      if (localUserChannles) {
        channels = localUserChannles
      } else {
        // 4. 如果本地存储没有，则请求获取接口推荐的频道列表
        const { data } = await getUserChannels()
        channels = data.data.channels
      }

      // 5. 最后，把数据赋值到当前组件中
      this.userChannels = channels
    }

  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 46px;
  padding-bottom: 50px;
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 46px;
    background-color: #3196fa;
    z-index: 1;
    .logo {
      background: url("./logo.png") no-repeat;
      background-size: cover;
      width: 100px;
      height: 30px;
    }
    .search-btn {
      background-color: #5babfb;
      width: 50%;
    }
  }
  .wap-nav {
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
  }
    /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }

}

</style>

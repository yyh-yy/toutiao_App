<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger" plain @click="editOrOver">{{isEditShow?'完成':'编辑'}}</van-button>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        v-for="(item,index) in userChannels"
        :key="item.id"
        :text="item.name"
        @click="onUserChannelClick(index)"
      >
       <van-icon v-show="isEditShow && index!==0" slot="icon" name="close" @click="onUserChannelClick(index)"></van-icon>
      </van-grid-item>
    </van-grid>

    <van-cell title="推荐频道" :border="false" />
    <van-grid :gutter="10">
      <van-grid-item
        v-for="item in remainingChangels"
        :key="item.id"
        :text="item.name"
        @click="onChannelAdd(item)"
      >

      </van-grid-item>

    </van-grid>

  </div>
</template>

<script>
import { getAllChannels } from '@/API/channel'
export default {

  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEditShow: false // 编辑开关
    }
  },
  computed: {
    remainingChangels () {
      const { allChannels, userChannels } = this
      const channel = []

      allChannels.forEach(item => {
        if (!userChannels.find(c => c.id === item.id)) {
          channel.push(item)
        }
      })
      return channel
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {

    //   删除收藏频道
    onUserChannelClick (index) {
      if (this.isEditShow && index !== 0) {
        this.userChannels.splice(index, 1)
      } else {
        this.$emit('input', index)
        this.$emit('close')
      }
    },
    //   编辑开关
    editOrOver () {
      this.isEditShow = !this.isEditShow
    },
    // getChannels () {
    //   console.log(this.userChannels)
    // }
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    onChannelAdd (channel) {
      this.userChannels.push(channel)
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 40px 0;
  /deep/ .van-grid-item__icon-wrapper {
  position: absolute;
  top: -14px;
  right: -5px;
  .van-icon-close {
    font-size: 14px;
  }
}
}
</style>

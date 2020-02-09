<template>
  <div class="edit-name">
    <van-nav-bar
     title="编辑昵称"
     left-text="取消"
     @click-left="$emit('close')"
     @click-right="$emit('confirm',message)"
     right-text="完成"
    />
   <van-field
    class="field"
    :value="name"
    rows="2"
    autosize
    type="textarea"
    maxlength="20"
    placeholder="请输入昵称"
    @input="message = $event"
    show-word-limit
/>

  </div>
</template>

<script>
export default {
  name: 'EditName',
  components: {},
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {},
  created () {}
}
</script>

<style scoped lang='less'>
    .van-nav-bar {
        background: #ffffff;
        .van-nav-bar__title{
          color: #333;
     }
    .field {
        background: #fff;
        /deep/ .van-cell__value{
            background: #f5f5f5;
            padding: 10px;
        }
    }
    }

</style>

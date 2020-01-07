<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 表单 -->
    <van-cell-group>
      <van-field v-model="userName.mobile"  label="手机号" placeholder="请输入手机号" />

      <van-field v-model="userName.code"  label="验证码" placeholder="请输入6位验证码">
            <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn">
      <van-button type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loginPage',
  components: {},
  props: {},
  data () {
    return {
      userName: {
        mobile: null,
        code: null

      }
    }
  }
}
</script>

<style lang="less" scoped>

.btn {
  padding: 26px 16px;

  .van-button {
    width: 100%;
    border-radius: 4px;
  }
}

</style>

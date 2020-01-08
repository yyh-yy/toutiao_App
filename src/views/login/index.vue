<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 表单 -->
    <van-cell-group>

      <van-field
         v-model="userName.mobile"
         label="手机号"
         placeholder="请输入手机号"
         >
        <i class="iconfont icon-phone_icon" slot="left-icon"></i>
      </van-field>

      <van-field v-model="userName.code"
        label="验证码"
        placeholder="请输入6位验证码"
        >
        <i class="iconfont icon-mima" slot="left-icon"></i>
            <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/API/user'
// import { ValidationProvider } from 'vee-validate'
export default {
  name: 'loginPage',
  components: {},
  props: {},
  data () {
    return {
      userName: {
        mobile: '',
        code: ''

      }
    }
  },
  methods: {
    async onLogin () {
      const user = this.userName
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true

      })

      try {
        const res = await login(user)
        console.log(res)

        this.$toast.success('登录成功')
      } catch (err) {
        this.$toast.fail('手机号或验证码错误')
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
    background: #6db4fb;
  }
}

</style>

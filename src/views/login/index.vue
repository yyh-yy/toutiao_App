<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 表单 -->
    <ValidationObserver ref="form">
      <ValidationProvider name="手机号"  rules="required">
      <van-field
         v-model="userName.mobile"
         label="手机号"
         placeholder="请输入手机号"
         >
        <i class="iconfont icon-phone_icon" slot="left-icon"></i>
      </van-field>
      </ValidationProvider>

      <ValidationProvider name="验证码"  rules="required">
      <van-field v-model="userName.code"
        label="验证码"
        placeholder="请输入6位验证码"
        >
        <i class="iconfont icon-mima" slot="left-icon"></i>
            <van-count-down
             slot="button"
             v-if="isCountDownShow"
             :time=" 1000 * 60 "
             format=" ss s"
             @finish="isCountDownShow = false"
              />
            <van-button
             v-else
             slot="button"
             size="small"
             type="primary"
             @click="onSendSmsCode"
            >
             发送验证码
            </van-button>
      </van-field>
      </ValidationProvider>
    </ValidationObserver>
    <div class="btn">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/API/user'
import { validate } from 'vee-validate'
export default {
  name: 'loginPage',
  components: {},
  props: {},
  data () {
    return {
      userName: {
        mobile: '',
        code: ''

      },
      isCountDownShow: false
    }
  },
  methods: {
    async onLogin () {
      const user = this.userName
      // 表单验证
      const success = await this.$refs.form.validate()

      // 如果验证失败，提示错误消息，停止表单提交
      if (!success) {
        // 这里加定时器的原因是因为获取验证失败的结果有延迟问题，并不是我们的原因
        setTimeout(() => {
          const errors = this.$refs.form.errors
          // forEach 无法停止
          // find 方法会遍历数组，对每个元素执行方法中的条件判定
          // const item = Object.values(errors).find(item => item[0])

          // 找到第1个有错误的字段并弹出提示
          for (let key in errors) {
            const item = errors[key]
            if (item[0]) {
              this.$toast(item[0])
              return
            }
          }
        }, 100)
        return
      }
      // 通过验证，弹出loading
      this.$toast.loading({
        duration: 0,
        message: '登录中...',
        forbidClick: true

      })

      // 提交请求
      try {
        const res = await login(user)
        console.log(res)
        // 把token储存到Vuex容器中
        this.$store.commit('setUser', res.data.data)

        this.$toast.success('登录成功')
      } catch (err) {
        this.$toast.fail('手机号或验证码错误')
      }
    },

    async onSendSmsCode () {
      const { mobile } = this.userName
      // 校验

      const validateResult = await validate(mobile, 'required|mobile', { name: '手机号' })
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
      try {
        this.isCountDownShow = true
        await getSmsCode(mobile)
      } catch (error) {
        console.log(error)
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('请勿频繁发送')
          return
        }
        this.$toast('发送失败')
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

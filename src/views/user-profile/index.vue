<template>
  <div class="user-profile">
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" right-text="保存" />
    <van-cell-group>
      <van-cell title="头像" is-link>
        <van-image round width="30" height="30" fit="cover" :src="user.photo" />
      </van-cell>
      <van-cell
       title="昵称" @click="isEditNameshow = true" :value="user.name" is-link />
      <van-cell title="性别" @click="isEditGenderShow=true" :value="user.gender?'女':'男'" is-link />
      <van-cell title="生日" @click="isBirthdayShow=true" :value="user.birthday" is-link />
    </van-cell-group>

    <van-popup
     v-model="isEditNameshow"
     round
     position="bottom"
     >
      <edit-name
       :name="user.name"
       @close="isEditNameshow=false"
       @confirm="onSave"
       />
    </van-popup>

    <!-- 修改用户性别 -->
    <van-action-sheet
     v-model="isEditGenderShow"
      :actions="actions"
      @select="onGenderSelect"
      cancel-text="取消"
      />

      <!-- 修改生日 -->
       <van-popup
        v-model="isBirthdayShow"
        round
        position="bottom"
     >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="isBirthdayShow=false"
        @confirm="onBirthday"
      />
     </van-popup>
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile } from '@/API/user'
import EditName from './components/edit-name'
import moment from 'moment'
export default {
  name: 'UserIndex',
  components: {
    EditName
  },
  data () {
    return {
      user: {},
      isEditNameshow: false,
      isEditGenderShow: false,
      isBirthdayShow: false,
      actions: [
        { name: '男', value: 0 },
        { name: '女', value: 1 }
      ],
      minDate: new Date(1970, 1, 0),
      maxDate: new Date(),
      currentDate: new Date()
    }
  },
  created () {
    this.loadProfile()
  },
  methods: {
    async saveProfile (field, value) {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '保存中...'
      })
      try {
        await updateUserProfile({ [field]: value })
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    },
    async loadProfile () {
      try {
        const { data } = await getUserProfile()
        console.log(data)
        this.user = data.data
      } catch (error) {
        this.$toast.fail('获取数据失败')
      }
    },
    async onSave (name) {
      await this.saveProfile('name', name)

      this.user.name = name

      this.isEditNameshow = false
    },
    async onGenderSelect ({ value }) {
      await this.saveProfile('gerder', value)

      this.user.gender = value

      this.isEditGenderShow = false
    },
    async onBirthday (value) {
      value = moment(value).format('YYYY-MM-DD')
      await this.saveProfile('birthday', value)

      this.user.birthday = value
      this.isBirthdayShow = false
    }
  }
}
</script>

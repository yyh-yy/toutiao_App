<template>
  <div class="user-profile">
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" right-text="保存" />
    <van-cell-group>
      <van-cell title="头像" is-link   @click="onSeletFile">
        <van-image round width="30" height="30" fit="cover" :src="user.photo" />
      </van-cell>
      <input type="file" hidden ref="file" @change="onFileChange">
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

     <!-- 修改用户头像 -->
     <van-image-preview
      v-model="isPreviewPhotoShow"
      :images="PreviewImages"
      @close="file.value=''"
      >
      <van-nav-bar
       slot="cover"
       left-text="取消"
       right-text="确定"
       @click-left="isPreviewPhotoShow=false"
       @click-right="onPhotoConfirm"
       />>
      </van-image-preview>

  </div>
</template>

<script>
import { getUserProfile, updateUserProfile, updateUserPhoto } from '@/API/user'
import EditName from './components/edit-name'
import moment from 'moment'
export default {
  computed: {
    file () {
      return this.$refs['file']
    }
  },
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
      isPreviewPhotoShow: false,
      // 性别
      actions: [
        { name: '男', value: 0 },
        { name: '女', value: 1 }
      ],
      // 日期
      minDate: new Date(1970, 1, 0),
      maxDate: new Date(),
      currentDate: new Date(),
      // 图片预览
      PreviewImages: []
    }
  },
  created () {
    this.loadProfile()
  },
  methods: {
    // 统一处理修改昵称、性别、生日方法
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
    // 获取用户数据
    async loadProfile () {
      try {
        const { data } = await getUserProfile()
        console.log(data)
        this.user = data.data
      } catch (error) {
        this.$toast.fail('获取数据失败')
      }
    },
    // 修改昵称
    async onSave (name) {
      await this.saveProfile('name', name)

      this.user.name = name

      this.isEditNameshow = false
    },
    // 修改性别
    async onGenderSelect ({ value }) {
      await this.saveProfile('gerder', value)

      this.user.gender = value

      this.isEditGenderShow = false
    },
    // 修改生日
    async onBirthday (value) {
      value = moment(value).format('YYYY-MM-DD')
      await this.saveProfile('birthday', value)

      this.user.birthday = value
      this.isBirthdayShow = false
    },
    onSeletFile () {
      this.file.click()
    },
    onFileChange () {
      // 文件对象
      const fileObj = this.file.files[0]
      // 获取文件数据
      const fileData = URL.createObjectURL(fileObj)
      // 将要预览的图片放到数组中
      this.PreviewImages = [fileData]
      // 显示预览
      this.isPreviewPhotoShow = true
    },

    async onPhotoConfirm () {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '保存中...'
      })
      try {
        const fd = new FormData()
        fd.append('photo', this.file.files[0])
        const { data } = await updateUserPhoto(fd)
        this.user.photo = data.data.photo
        this.$toast.success('更新成功')
        this.isPreviewPhotoShow = false
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }

  }
}
</script>
<style lang="less" scoped>
/deep/ .van-image-preview__cover{
  top: unset;
  left: 0;
  bottom: 0;
  right: 0;
  .van-nav-bar {
    background: #181818;
    .van-nav-bar__text,.van-nav-bar__right{
      color: #fff
    }

  }
}
</style>

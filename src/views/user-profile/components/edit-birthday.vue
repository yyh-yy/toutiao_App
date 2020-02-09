<template>
  <div class="edit-brithday">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
/>

  </div>
</template>

<script>
export default {
  name: 'EditBrithday',
  components: {},
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
    }
  },
  methods: {},
  created () {}
}
</script>

<style>

</style>

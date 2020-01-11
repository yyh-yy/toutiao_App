<template>
<div class="tabbar-container">
    <router-view></router-view>

<van-tabbar route>
  <van-tabbar-item name="home" icon="wap-home-o" to="/">首页</van-tabbar-item>
  <van-tabbar-item name="search" icon="search" to="/qa">问答</van-tabbar-item>
  <van-tabbar-item name="friends" icon="tv-o" to="/video">视频</van-tabbar-item>
  <van-tabbar-item name="setting" icon="user-o" to="/my">我的</van-tabbar-item>
</van-tabbar>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>

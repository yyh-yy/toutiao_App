<template>
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell
  v-for="(article,index) in list"
  :key="index"
  :title="article.title"
  @click="$router.push({
    name:'article',
    params:{
      articleId:article.art_id.toString()
    }
  })"
   />
</van-list>
</template>

<script>
import { getHistoryArticles } from '@/API/article'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },
  methods: {
    async  onLoad () {
      const { data } = await getHistoryArticles({
        page: this.page,
        per_page: this.perPage
      })
      const { results } = data.data
      this.list.push(...results)

      this.loading = false

      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>

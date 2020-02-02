<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296fa"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow=false"
        @input="onSearchInput"

      />
    </form>
    <!-- /搜索栏 -->
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :q="searchText"/>
    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchText">
      <van-cell
       icon="search"
       v-for="(item,index) in suggestion"
       :key="index"
       @click="onSuggestionClick(item)">
       <div slot="title" v-html="heightLight(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->

    <van-cell-group v-else>
      <van-cell title="历史记录">
        <template v-if="isDeleteShow">
          <span @click="searchHistories=[]">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isDeleteShow=false">完成</span>
        </template>
      <van-icon name="delete" v-else @click="isDeleteShow=true"/>

    </van-cell>
      <van-cell
       v-for="(item,index) in searchHistories"
       :key="index"
       :title="item"
       @click="onHistoryClick(item,index)">
       <van-icon v-show="isDeleteShow" name="close"></van-icon>
       </van-cell>

    </van-cell-group>
    <!-- /历史记录 -->

    <!-- 搜索结果 -->

  </div>
</template>

<script>
import SearchResult from './components/search-result'
import { getSuggestions } from '@/API/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchPage',
  components: {
    SearchResult
  },
  props: {},
  data () {
    return {
      searchHistories: [], // 搜索历史记录
      isResultShow: false,
      searchText: '',
      suggestion: [],
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onHistoryClick (item, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        this.onSearch(item)
      }
    },
    onSuggestionClick (str) {
      this.searchText = str
      this.isResultShow = true
    },
    onSearch () {
      const index = this.searchHistories.indexOf(this.searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.isResultShow = true
      this.searchHistories.unshift(this.searchText)
    },
    // 处理防抖
    onSearchInput: debounce(async function () {
      const searchText = this.searchText
      if (!searchText) {
        return
      }
      const { data } = await getSuggestions(searchText)
      console.log(data)

      this.suggestion = data.data.options
    }, 200),
    heightLight (str) {
      return str.replace(this.searchText, `<span style="color:red;">${this.searchText}</span>`)
    },
    onCancel () {
      console.log('onCancel')
    },

    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 54px;
  // 让搜索栏固定在顶部
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>

<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form class="search-form" action="/">
      <van-search
        background="#3296fa"
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
        @input="onSearchInput"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :q="searchText" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchText">
      <van-cell
        icon="search"
        :key="index"
        v-for="(item, index) in suggestions"
        @click="onSearch(item)"
      >
        <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <template v-if="isDeleteShow">
          <span @click="searchHistories = []">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isDeleteShow = false">完成</span>
        </template>
        <van-icon v-else name="delete" @click="isDeleteShow = true"></van-icon>
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item, index) in searchHistories"
        :key="index"
        @click="onHistoryClick(item, index)"
      >
        <van-icon
          v-show="isDeleteShow"
          name="close"
        ></van-icon>
      </van-cell>
    </van-cell-group>
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchResult from './components/search-result'
import { getSuggestions } from '@/API/search'
import { getItem, setItem } from '@/utils/storage'
import { debounce } from 'lodash'

export default {
  name: 'SearchPage',
  components: {
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '', // 搜索框内容
      isResultShow: false, // 搜索结果的显示状态
      suggestions: [], // 联想建议
      searchHistories: getItem('search-histories') || [], // 搜索历史记录
      isDeleteShow: false // 删除的显示状态
    }
  },
  computed: {},
  watch: {
    searchHistories (newVal) {
      setItem('search-histories', newVal)
    }
  },
  created () {},
  mounted () {},
  methods: {
    onSearch (q) {
      // q: 文本框数据本身、联想建议文本、历史记录文本
      // 1. 修改搜索框的文本内容
      this.searchText = q

      // 2. 记录搜索历史记录
      const index = this.searchHistories.indexOf(this.searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(this.searchText)

      // 3. 展示搜索结果
      this.isResultShow = true
    },

    onSearchInput: debounce(async function () {
      const searchText = this.searchText
      if (!searchText) {
        return
      }
      const { data } = await getSuggestions(searchText)
      this.suggestions = data.data.options
    }, 300),

    highlight (str) {
      return str.toLowerCase().replace(
        this.searchText.toLowerCase(),
        `<span style="color: red;">${this.searchText}</span>`
      )
    },

    onHistoryClick (item, index) {
      if (this.isDeleteShow) {
        // 删除操作
        this.searchHistories.splice(index, 1)
      } else {
        // 展示搜索结果
        this.onSearch(item)
      }
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

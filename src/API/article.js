/**
 * 文章接口模块
 */
import request from '@/utils/request'

/**
 * 获取频道的文章列表
 */
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
// 获取指定文章
export const getArticlesById = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}
// 收藏文章
export const addCollect = target => {
  return request({
    method: 'POST',
    url: `/app/v1_0/article/collections`,
    data: {
      target
    }

  })
}
// 取消文章收藏
export const delCollect = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`

  })
}
// 文章点赞
export const addLike = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}
// 文章取消点赞
export const delLike = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}
// 获取用户文章列表

export const getCurrentUserArticles = params => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user/articles`,
    params
  })
}
// 获取用户收藏文章列表
export const getCollectArticles = params => {
  return request({
    method: 'GET',
    url: `/app/v1_0/article/collections`,
    params
  })
}
// 获取用户文历史列表

export const getHistoryArticles = params => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user/histories`,
    params
  })
}

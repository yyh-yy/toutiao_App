// 文章评论
import request from '@/utils/request'
// 获取文章评论或评论回复
export const getComment = params => {
  return request({
    url: '/app/v1_0/comments',
    method: 'GET',
    params
  })
}

// 评论回复
export const addComment = data => {
  return request({
    url: '/app/v1_0/comments',
    method: 'POST',
    data
  })
}
// 点赞
export const addCommentLike = commentId => {
  return request({
    url: '/app/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: commentId
    }

  })
}
// 取消点赞
export const delCommentLike = commentId => {
  return request({
    url: `/app/v1_0/comment/likings/${commentId}`,
    method: 'DELETE'
  })
}

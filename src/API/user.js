import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
export const getSmsCode = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`

  })
}
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user`

  })
}
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'

  })
}
// 关注文章
export const addFollow = userId => {
  return request({
    method: 'POST',
    url: `/app/v1_0/user/followings`,
    data: {
      target: userId
    }

  })
}
// 取消关注
export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}
// 获取用户个人信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user/profile`

  })
}
// 编辑用户照片资料

export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/photo`,
    data
  })
}
// 更新用户资料
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/profile`,
    data
  })
}

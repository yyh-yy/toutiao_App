import require from '@/utils/request'
export const getAllChannels = () => {
  return require({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}

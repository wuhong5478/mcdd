// 开发环境URL
const BASE_URL_DEV = 'http://118.31.247.145:8088'
// 生产环境URL
const BASE_URL_PROD = 'http://118.31.247.145:8088'

// 根据node环境确定URL
export default (process.env.NODE_ENV === 'production'
  ? BASE_URL_PROD
  : BASE_URL_DEV
)

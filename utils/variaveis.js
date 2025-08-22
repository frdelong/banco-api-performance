const configLocal = JSON.parse(open('../config/config.local.json'))


export function pegarBaseURL() {
  // const baseURL = __ENV.BASE_URL || 'http://localhost:3000'
  // return baseURL
  // return __ENV.BASE_URL || 'http://localhost:3000'
  return __ENV.BASE_URL || configLocal.baseUrl
}
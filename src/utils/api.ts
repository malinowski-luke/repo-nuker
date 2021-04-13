import axios from 'axios'

// define intercepotrs
const requestSucess = <T>(request: any) => {
  console.log(request)
  return request
}

const requestError = <T>(request: any) => {
  console.error(request)
  return Promise.reject(request)
}

axios.interceptors.request.use(requestSucess, requestError)

export default axios

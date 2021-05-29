import axios from 'axios'

export const mockGetResponse = (response: any) => {
  axios.get = () => Promise.resolve(response)
}

export const mockGetReject = (response: any) => {
  axios.get = () => Promise.reject(response)
}

export const mockPostResponse = (response: any) => {
  axios.post = () => Promise.resolve(response)
}

export const mockPostReject = (response: any) => {
  axios.post = () => Promise.reject(response)
}
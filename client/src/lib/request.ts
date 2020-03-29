import axios from 'axios'
import { getToken } from './storage'

const createRequest = () =>
  axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      'content-Type': 'application/json',
      Authorization: getToken(),
    },
  })

export default createRequest

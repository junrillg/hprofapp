import axios from 'axios'
import { getToken } from './storage'

export default () =>
  axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      Accept: 'application/json, application/xml, text/play, text/html, *.*',
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
  })

import notify from 'lib/notify'

export const errorHandler = (e: any) => {
  const { message } = e.response.data
  if (message) notify.error(message)
  return Promise.reject(e)
}

export const successHandler = (response: any) => {
  const { data } = response
  if (data.message) notify.success(data.message)
  return Promise.resolve(data)
}

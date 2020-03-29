import notify from 'lib/notify'

export const errorHandler = (e: any) => {
  const { message } = e
  if (message) notify.error(message)
  return Promise.reject(e)
}

export const successHandler = (response: any) => {
  const { data } = response
  if (response.message) notify.success(response.message)
  return Promise.resolve(data)
}

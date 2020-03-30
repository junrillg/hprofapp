import { fs } from './admin'

export const btoa = (data: string) => Buffer.from(data).toString('base64')

export const includes = (list: string[], value: string) => {
  const data = list.find((item) => value.indexOf(item) !== -1)
  return !!data
}

export const constructData = (req: any) => ({
  ...req.body,
  createdAt: fs.Timestamp.fromDate(new Date()),
  createdBy: `${req.user.firstName} ${req.user.lastName}`,
})

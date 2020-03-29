import { ClusterZone } from '../schema/cluster'

export type Response = {
  json(param: { message: string; data?: object | [] | null }): void
  status(number: number): any
}

export type User = {
  createdAt: string
  handle: string
  email: string
  userId: string
  role: string
  clusterId: string
  firstName: string
  lastName: string
  address: string
  phoneNumber: string
}

export type Cluster = {
  clusterName: string
  clusterData: any
  clusterZone: ClusterZone[]
}

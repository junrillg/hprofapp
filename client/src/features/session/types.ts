import { SET_LOGGED_IN, SET_SESSION_DATA } from './actionTypes'

export type ClusterZone = {
  label: string
  key: string
}

export type Cluster = {
  clusterName: string
  clusterData: any
  clusterZone: ClusterZone[]
}

export type Session = {
  email: string
  password: string
  confirmPassword: string
  role: string
  clusterId: string
  firstName: string
  lastName: string
  phoneNumber: string
  address: string
  cluster: Cluster
}

export interface SessionState {
  loggedIn: boolean
  session: Session
}

export type SessionActionTypes = {
  type: typeof SET_LOGGED_IN | typeof SET_SESSION_DATA
  payload: boolean | Session
}

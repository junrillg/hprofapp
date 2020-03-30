import fetch from 'lib/fetch'
import { errorHandler, successHandler } from './requestHandler'

type Person = {
  firstName: string
  lastName: string
  phoneNumber: string
  isPrimary: boolean
}

export type HouseholdRequest = {
  familyName: string
  clusterId: string
  address: string
  clusterZoneId: string
  clusterData: any
  persons: Person[]
}

export const createHousehold = (data: HouseholdRequest) =>
  fetch().post('/households', data).then(successHandler).catch(errorHandler)

export const getHouseholdById = (id: number) =>
  fetch().get(`/households/${id}`).then(successHandler).catch(errorHandler)

export const getAllHousehold = () =>
  fetch().get(`/households`).then(successHandler).catch(errorHandler)

export const updateHousehold = (id: number, data: HouseholdRequest) =>
  fetch()
    .put(`/households/${id}`, data)
    .then(successHandler)
    .catch(errorHandler)

export const deleteHousehold = (id: number) =>
  fetch().delete(`/households/${id}`).then(successHandler).catch(errorHandler)

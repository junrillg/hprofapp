import request from 'lib/request'
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
  request().post('/households', data).then(successHandler).catch(errorHandler)

export const getHouseholdById = (id: number) =>
  request().get(`/households/${id}`).then(successHandler).catch(errorHandler)

export const getAllHousehold = () =>
  request().get(`/households`).then(successHandler).catch(errorHandler)

export const updateHousehold = (id: number, data: HouseholdRequest) =>
  request()
    .put(`/households/${id}`, data)
    .then(successHandler)
    .catch(errorHandler)

export const deleteHousehold = (id: number) =>
  request().delete(`/households/${id}`).then(successHandler).catch(errorHandler)

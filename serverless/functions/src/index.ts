import request from './util/request'
import { createHouseHoldHandler } from './handlers/household'

/**
 * Household
 */
export const createHouseHold = request(createHouseHoldHandler)

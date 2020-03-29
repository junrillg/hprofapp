import { get, set } from 'local-storage'

export const TOKEN = 'appToken'

export const getToken = () => get<string>(TOKEN)

export const setToken = (token: string) => set<string>(TOKEN, token)

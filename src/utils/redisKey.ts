import { CacheKeys } from './../constant/cache'

export const generateTokenKey = (token: string) => { 
  return `${CacheKeys.Token}:${token}`
}

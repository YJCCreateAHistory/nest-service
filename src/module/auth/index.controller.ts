import { TokenService } from './service/token.service'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { AUTH } from 'src/constant/api'
import { UserService } from '../user/index.service'
import { Resp } from 'src/constant'
import { AES_CBC_DECRYPT } from 'src/utils/encryption'
import { Redis } from 'ioredis'
import { generateTokenKey } from 'src/utils/redisKey'

enum INDEX {
  START = 0
}
@Controller(AUTH.BASE)
export class AuthController {

  constructor(
    private readonly UserService: UserService,
    private readonly TokenService: TokenService,
    private readonly redis: Redis
  ) { }

  @Get(AUTH.INDEITY)
  isExister() {
    return this.UserService.isExistUserById('123')
  }

  @Post(AUTH.LOGIN)
  async login(@Body() body) {

    const expiredTime = 1000 * 60 * 60 * 24 * 7
    const { telephone, password } = body
    const encryoptPsd = AES_CBC_DECRYPT(password, process.env.SECRET_KEY)

    const isExist = await this.UserService.isExistUserByPhone(telephone)

    if (!isExist.length) {
      return Resp.NO_AUTHORIZATION
    }

    if (isExist[INDEX.START].psd === encryoptPsd) {
      const token = await this.TokenService.builderAccessToken(isExist[INDEX.START].uid, telephone)
      
      // redis缓存token
      await this.redis.set(generateTokenKey(isExist[0].uid), token.accessToken, 'EX', expiredTime)
      delete isExist[INDEX.START].psd
      return {
        ...Resp.SUCCESS,
        data: {
          data: isExist[INDEX.START],
          token: token
        }
      }
    }

    return Resp.NO_AUTHORIZATION
  }

  @Post(AUTH.REGISTER)
  async register(@Body() body) {
    const { telephone, password, username } = body
    const isExist = await this.UserService.regeister({ telephone, password, username })
    if (!isExist) {
      return Resp.EXIST
    }
    return isExist
  }

}
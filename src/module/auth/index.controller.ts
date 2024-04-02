import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './index.service'
import { AUTH } from 'src/constant/api'
import { UserService } from '../user/index.service';
import { HTTP_OPTION } from 'src/constant';
import { AES_CBC_DECRYPT } from 'src/utils/encryption';

const secretKey = process.env.SECERT_KEY

@Controller(AUTH.BASE)
export class AuthController {

  constructor(
    private readonly PermissionService: AuthService,
    private readonly UserService: UserService
  ) { }

  @Get(AUTH.INDEITY)
  isExister() {
    return this.UserService.isExistUserById('123');
  }

  @Post(AUTH.LOGIN)
  async login(@Body() body) {
    const { telephone, password } = body

    const encryoptPsd = AES_CBC_DECRYPT(password, secretKey)

    const isExist = await this.UserService.isExistUserByPhone(telephone)
    if (!isExist.length) {
      return HTTP_OPTION.NO_AUTHORIZATION
    }

    switch (encryoptPsd) { 
      case isExist[0].password:
        return isExist
      default:
        return HTTP_OPTION.NO_AUTHORIZATION
    }
  }

  @Post(AUTH.REGISTER)
  async register(@Body() body) {
    const { telephone, password, username } = body
    const isExist = await this.UserService.regeister({ telephone, password, username })
    if (!isExist) {
      return HTTP_OPTION.EXIST
    }
    return isExist
  }

}
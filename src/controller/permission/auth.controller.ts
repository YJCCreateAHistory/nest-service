import { Body, Controller, Post, Res } from '@nestjs/common'
import { cookieConfig } from 'src/config/cookie.config'
import { setCookie } from 'src/utils/cookie'
import { PermissionService } from 'src/module/permission/index.service'

@Controller('auth')
export class AuthController {

  constructor(private readonly PermissionService: PermissionService) { }

  @Post('login')
  async fetchLoginManagePlatform(@Res() res, @Body() user) {

    // const decodePhone = AES_CBC_DECRYPT(user.phone, config.secretKey)
    const result = await this.PermissionService.validateUser(user.uid, user.psd)

    const cookie = setCookie('token', 'uid', 'username', 'appId')
    res.cookie('auth', cookie, cookieConfig)

    res.send({
      code: 200,
      data: result.data,
      message: 'success'
    })

  }

}

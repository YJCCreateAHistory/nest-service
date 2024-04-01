import { Body, Controller, Post, Res } from '@nestjs/common'
import { cookieConfig } from 'src/config/cookie.config'
import { setCookie } from 'src/utils/cookie'
import { config } from '../../../config.base'
import { AES_CBC_DECRYPT } from 'src/utils/encryption'
import { AuthService } from 'src/service/permission/auth.service'

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async fetchLoginManagePlatform(@Res() res, @Body() user) {
    
    // const decodePhone = AES_CBC_DECRYPT(user.phone, config.secretKey)
    const result = await this.authService.validateUser(user.uid, user.psd)

    const cookie = setCookie('token', 'uid', 'username', 'appId')
    res.cookie('auth', cookie, cookieConfig)
    
    res.send({
      code: 200,
      data: result.data,
      message: 'success'
    })

  }

}

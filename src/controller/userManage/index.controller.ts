import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../../module/user/index.service';

@Controller('user')
export class UserController {
  // 依赖注入
  constructor(private readonly user_service: UserService) { }

  @Post()
  user(@Body() req) {
    return this.user_service.fetchUserResourceList();
  }

}
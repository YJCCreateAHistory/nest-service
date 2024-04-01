import { Controller, Get, Inject } from '@nestjs/common'
import { PermissionService } from '../../module/permission/index.service'
import { UserService } from '../../module/user/index.service'

@Controller('permission')
export class PermissionController {

  @Inject("HTTP_TOKEN")
  public x_token: string;
  // 依赖注入
  constructor(
    private readonly auth_service: PermissionService,
    private readonly user_service: UserService
  ) { }

  @Get("identity")
  fetchPermission() {
    // 鉴权通过之后，拉取用户信息
    const res = this.user_service.fetchUserResourceList()
    if (res.status === 200 && this.x_token === 'x-token') {
      return this.auth_service.permission();
    }
  }
  @Get("user")
  fetchUserIdentity() {
    return this.user_service.fetchUserResourceList();
  }
}
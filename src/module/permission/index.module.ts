import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { PermissionController } from '../../controller/permission/index.controller'
import { InterceptorMiddleware } from 'src/middleware/interceptor.middleware'
import { AuthController } from 'src/controller/permission/auth.controller'
import { PermissionService } from 'src/module/permission/index.service'
import { UserService } from 'src/module/user/index.service'
import { UserModule } from '../user/index.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/database/user.entity'
import { Psd } from 'src/database/psd.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Psd]), UserModule],
  controllers: [PermissionController, AuthController],
  // 提供依赖，注入到Controller
  providers: [
    PermissionService,
    UserService,
    PermissionService,
    { provide: 'HTTP_OPTION', useValue: 'auth' },
    { provide: 'HTTP_TOKEN', useValue: 'x-token' }
  ],
  exports: [TypeOrmModule, UserModule]
})

export class PermissionModule {
  // 中间件
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(InterceptorMiddleware).forRoutes(PermissionController)
    consumer.apply(InterceptorMiddleware).forRoutes(AuthController)
    consumer.apply(InterceptorMiddleware).
      exclude(
        {
          path: 'permission/identity',
          method: RequestMethod.GET
        },
        {
          path: 'permission/user',
          method: RequestMethod.GET
        }
      )
  }
}

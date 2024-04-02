import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AuthController } from './index.controller'
import { InterceptorMiddleware } from 'src/common/middleware/interceptor.middleware'
import { AuthService } from 'src/module/auth/index.service'
import { UserService } from 'src/module/user/index.service'
import { UserModule } from '../user/index.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/module/user/entity/user.entity'
import { JwtService, JwtModule } from '@nestjs/jwt'
import { PermissionController } from './controller/permission.controller'
import { PermissionService } from './service/permission.service'
import { TokenService } from './service/token.service';
import { TokenController } from './controller/token.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule, JwtModule],
  controllers: [AuthController, AuthController, PermissionController, TokenController],
  providers: [
    AuthService,
    UserService,
    JwtService,
    PermissionService,
    TokenService
  ],
  exports: [TypeOrmModule, UserModule]
})

export class AuthModule {
  // 中间件
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(InterceptorMiddleware).forRoutes(AuthController)
    consumer.apply(InterceptorMiddleware).
      exclude(
        {
          path: 'openAi/auth/identity',
          method: RequestMethod.GET
        },
        {
          path: 'openAi/auth/user',
          method: RequestMethod.GET
        }
      )
  }
}

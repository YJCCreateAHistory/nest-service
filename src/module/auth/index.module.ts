import { TokenEntity } from 'src/module/auth/entity/token.entity';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AuthController } from './index.controller'
import { InterceptorMiddleware } from 'src/common/middleware/interceptor.middleware'
import { AuthService } from './index.service'
import { UserService } from '../user/index.service'
import { UserModule } from '../user/index.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermissionService } from './service/permission.service'
import { TokenService } from './service/token.service';
import { RefreshTokenEntity } from './entity/refresh.entity'
import { AuthTreeEntity } from './entity/auth.entity'
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { RedisModule } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        AuthTreeEntity,
        TokenEntity,
        RefreshTokenEntity,
      ]
    ),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => {
        return {
          secret: process.env.SECECT_KEY,
          signOptions: {},
        }
      },
      inject: [ConfigService],
    }),
    UserModule,
    RedisModule
  ],
  controllers: [AuthController],
  providers: [
    PermissionService,
    AuthService,
    TokenService,
    UserService,
    JwtService,
    RedisService
  ],
  exports: [TypeOrmModule, PermissionService, TokenService]
})

export class AuthModule {
  // 中间件
  configure(consumer: MiddlewareConsumer) {
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

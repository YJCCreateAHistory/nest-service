import { Module } from '@nestjs/common'
import { AppController } from './app/app.controller'
import { AppService } from './app/app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService, ConfigModule } from '@nestjs/config'
import { getSqlConfigure } from 'src/config/db.config'
import { JwtModule } from '@nestjs/jwt'
import Modules from './module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, Modules.UserModule, Modules.PermissionModule],
      useFactory: () => getSqlConfigure(),
      inject: [ConfigService],
    }),
    Modules.UserModule,
    Modules.CommonModule,
    Modules.PermissionModule,
    Modules.MaterilModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: 'your-secret-key', // 替换为您自己的密钥
      signOptions: { expiresIn: 3 * 24 * 60 * 60 * 1000 }, // 可选：设置令牌过期时间
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
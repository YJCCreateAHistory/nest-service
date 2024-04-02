import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService, ConfigModule } from '@nestjs/config'
import { getSqlConfigure } from 'src/config/db.config'
import { JwtModule } from '@nestjs/jwt'
import { ReporterModule } from './module/reporter/reporter.module';
import { ReporterService } from './module/reporter/reporter.service';
import { ReporterController } from './module/reporter/reporter.controller';
import { ThrottlerGuard, ThrottlerModule, seconds } from '@nestjs/throttler'
import Modules from './module'
import { SharedModule } from './shared'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, Modules.UserModule, Modules.AuthModule],
      useFactory: () => getSqlConfigure(),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: 3 * 24 * 60 * 60 * 1000 },
    }),
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        errorMessage: '当前操作过于频繁，请稍后再试！',
        throttlers: [
          { ttl: seconds(10), limit: 7 },
        ],
      })
    }),
    Modules.UserModule,
    Modules.AuthModule,
    ReporterModule,
    SharedModule
  ],
  controllers: [AppController, ReporterController],
  providers: [
    AppService,
    ReporterService,
    // 防止暴力请求
    { provide: 'APP_GUARD', useClass: ThrottlerGuard },
  ],
})
export class AppModule {

}
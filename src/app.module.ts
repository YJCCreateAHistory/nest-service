import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ReporterModule } from './module/reporter/reporter.module';
import { ReporterService } from './module/reporter/reporter.service';
import { ReporterController } from './module/reporter/reporter.controller';
import { ThrottlerGuard, ThrottlerModule, seconds } from '@nestjs/throttler'
import { SharedModule } from './shared'
import { AuthModule } from './module/auth/index.module';
import { UserModule } from './module/user/index.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getSqlConfigure } from './config/db.config';
import { RedisModule } from './module/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, UserModule, AuthModule],
      useFactory: () => getSqlConfigure(),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      // 指定多个 env 文件时，第一个优先级最高
      envFilePath: ['.env.', `.env.${process.env.NODE_ENV}`, '.env'],
    }),
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        errorMessage: '当前操作过于频繁，请稍后再试！',
        throttlers: [
          { ttl: seconds(10), limit: 7 },
        ],
      })
    }),
    UserModule,
    AuthModule,
    ReporterModule,
    SharedModule,
    RedisModule
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
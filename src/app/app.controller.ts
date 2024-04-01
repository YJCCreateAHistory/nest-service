import { Controller, MiddlewareConsumer } from '@nestjs/common'
import cookieParser from 'cookie-parser'

@Controller('app')
export class AppController {
  consumer(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*')
  }
}

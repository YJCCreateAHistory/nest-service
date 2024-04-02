import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ReporterService } from './reporter.service';
import { ReporterController } from './reporter.controller';
import { UserModule } from '../user/index.module';
import { AuthModule } from '../auth/index.module';

@Module({
  imports: [
    UserModule,
    AuthModule
  ],
  controllers: [ReporterController],
  providers: [ReporterService],
})

export class ReporterModule implements NestModule {
  constructor(
    private readonly reporterService: ReporterService,
  ) {

  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes('*');
  }
}

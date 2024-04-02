import { LoggerModule } from "./logger/logger.module";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  imports: [LoggerModule.forRoot()],
  exports: [LoggerModule]
})

export class SharedModule {

}
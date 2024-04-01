import { Module } from '@nestjs/common'
import { CommonService } from '../../service/common/index.service'

// 提供一个通用Module
@Module({
  imports: [],
  exports: [],
  providers: [CommonService]
})
export class CommonModule {

}
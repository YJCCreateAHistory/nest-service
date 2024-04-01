import { Module } from '@nestjs/common'
import { MaterialService } from './index.service'
import { MaterailController } from '../../controller/material/index.controller'

const MaterialProvider = {
  provide: 'MaterialService',
  // 自定义
  useFactory: () => {
    return new MaterialService('x-token')
  },
  useValue: 'x-token'
}

@Module({
  providers: [MaterialService, MaterialProvider],
  controllers: [MaterailController],
})

export class MaterilModule {

}

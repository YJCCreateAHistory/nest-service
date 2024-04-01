import { Module } from '@nestjs/common'
import { UserService } from '../../service/user/index.service'
import { UserController } from '../../controller/userManage/index.controller'

@Module({
  imports: [],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService]
})
export class UserModule { }
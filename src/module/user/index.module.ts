import { Module } from '@nestjs/common'
import { UserService } from './index.service'
import { UserController } from '../../controller/userManage/index.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/database/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
  providers: [UserService]
})
export class UserModule { }
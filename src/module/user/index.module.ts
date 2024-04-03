import { Module } from '@nestjs/common'
import { UserService } from './index.service'
import { UserController } from './index.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'src/module/user/entity/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
  providers: [UserService]
})
export class UserModule { }
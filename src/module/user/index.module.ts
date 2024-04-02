import { Module } from '@nestjs/common'
import { UserService } from './index.service'
import { UserController } from './index.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/module/user/entity/user.entity'
import { AuthService } from '../auth/index.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule
  ],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService, AuthService],
  providers: [UserService, AuthService]
})
export class UserModule { }
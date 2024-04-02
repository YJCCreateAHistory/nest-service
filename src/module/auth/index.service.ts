import { Injectable } from '@nestjs/common'
import { User } from 'src/module/user/entity/user.entity'
import { UserService } from '../user/index.service'
import { HTTP_OPTION } from 'src/constant'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    private readonly UserService: UserService,
    private readonly JwtService: JwtService
  ) { }

}
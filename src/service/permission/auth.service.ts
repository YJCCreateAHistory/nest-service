import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/database/user.entity'
import { Repository } from 'typeorm'
import { HTTP_OPTION } from 'src/constants'

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async validateUser(uid: string, psd: string): Promise<User | any> {
    const getUser = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoin('user.psd', 'psd')
      .addSelect(['user.uid', 'user.name', 'user.phone_number', 'psd.psd'])
      .andWhere('user.uid = :uid', { uid })
      .getOne();

    console.log(getUser);

    return HTTP_OPTION.NO_AUTHORIZATION;
  }
}
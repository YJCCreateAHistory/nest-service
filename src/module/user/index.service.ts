import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/database/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  @Inject()
  fetchUserResourceList() {
    return {};
  }

  @Inject()
  validateUser(uid: string): Promise<User | any> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where(`user.uid = :uid`, { uid })
      .getOne()
  }

}


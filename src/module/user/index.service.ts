import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/module/user/entity/user.entity'
import { IRegsiter, IResponse } from 'src/types/base';
import { createTime } from 'src/utils/common';
import { EntityManager, Repository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid';
import { HTTP_OPTION } from 'src/constant';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) { }

  @Inject()
  isExistUserById(uid: string): Promise<User | any> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.uid = :uid', { uid })
      .orderBy('user.name', 'ASC')
      .getMany()
  }

  @Inject()
  isExistUserByPhone(phone_number: string): Promise<User | any> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.phone_number = :phone_number', { phone_number })
      .orderBy('user.name', 'ASC')
      .getMany()
  }

  @Inject()
  findUserlist() {
    return this.usersRepository
      .createQueryBuilder('user')
      .orderBy('user.name', 'ASC')
      .getMany()
  }

  @Inject()
  async regeister(regsiterInfo: IRegsiter): Promise<IResponse> {

    const { telephone, password, username } = regsiterInfo
    const isExist = await this.isExistUserByPhone(telephone)

    if (isExist.length) {
      return null;
    }

    const createUid = uuidv4()
    const time = createTime()

    await this.entityManager.transaction(async (manager) => {
      const u = manager.create(User, {
        uid: createUid,
        name: username,
        psd: password,
        phone_number: telephone,
        create_time: time,
        update_time: time
      })

      await manager.save(u)
    })

    return HTTP_OPTION.SUCCESS

  }

}


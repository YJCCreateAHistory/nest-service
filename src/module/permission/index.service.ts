import { Injectable } from '@nestjs/common'
import { User } from 'src/database/user.entity'
import { UserService } from '../user/index.service'

@Injectable()
export class PermissionService {

  constructor(
    private useService: UserService
  ) { }

  async validateUser(uid: string, psd: string): Promise<User | any> {
    const isUser = await this.useService.validateUser(uid)

    if (!isUser) {
      return null
    }else {
      return isUser
    }
    
  }

  validatePsd(psd: string): boolean { 
    return false;
  }

  permission() {
    return {
      data: 'permission',
      status: 200
    }
  }
}
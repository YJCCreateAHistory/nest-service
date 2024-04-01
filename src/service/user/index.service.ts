import { Injectable, Inject } from '@nestjs/common'

@Injectable()
export class UserService<T> {

  @Inject()
  fetchUserResourceList() {
    return {
      status: 200,
      data: {
        uid: 'xxxxxx',
        username: 'xxxxxx',
        user_phone: '18716981998'
      }
    };
  }

}


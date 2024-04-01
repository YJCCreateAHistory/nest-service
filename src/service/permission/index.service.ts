import { Injectable, Inject, Optional } from '@nestjs/common';

@Injectable()
export class PermissionService<T> {

  // @Optional可选依赖注入，注入的useValue为 'auth'，这里的this.app == 'auth'
  constructor(@Optional() @Inject('HTTP_OPTION') private readonly app?: T) {

  }

  permission() {
    return {
      data: 'permission',
      status: 200
    };
  }
}



import { Controller, Get, Query } from '@nestjs/common';
import { AUTH } from 'src/constant/api';
import { PermissionService } from '../service/permission.service';

@Controller(AUTH.BASE)
export class PermissionController {

  constructor(
    private permissionService: PermissionService
  ) { }
  
  @Get(AUTH.PERMISSION)
  async permssion(@Query() query) { 
    
    const { uid } = query

    return this.permissionService.getAuthTree(uid)
    
  }

}

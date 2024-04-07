import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { AuthTreeEntity } from "../entity/auth.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(AuthTreeEntity)
    private AuthTreeEntity: Repository<AuthTreeEntity>,
  ) { }
  
  // 获取权限树
  async getAuthTree(uid: string) {
    return await this.AuthTreeEntity
      .createQueryBuilder('auth_tree')
      .where('auth_tree.uid = :uid', { uid })
      .getOne()
  }

}
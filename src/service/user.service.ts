import { Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { IUserOptions } from '../interface';

@Provide()
@Scope(ScopeEnum.Singleton)
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  async getUser(options: IUserOptions) {
    return await this.userModel.findOne({
      where: options,
      select: ['username', 'email', 'nickname'],
    });
  }
}

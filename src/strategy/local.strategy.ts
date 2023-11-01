import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy } from 'passport-local';
import { Inject } from '@midwayjs/core';

import { UserService } from '../service/user.service';

@CustomStrategy()
export class LocalStrategy extends PassportStrategy(Strategy) {
  @Inject()
  userService: UserService;

  validate(payload: any) {
    return payload;
  }

  getStrategyOptions(): any {
    return {};
  }

  serializeUser(user, done) {
    done(null, user?.username);
  }

  deserializeUser(id, done) {
    this.userService
      .getUser({ username: id })
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err);
      });
  }
}

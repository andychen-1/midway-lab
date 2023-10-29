import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Config, Inject } from '@midwayjs/core';

import { UserService } from '../service/user.service';

@CustomStrategy()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  @Config('jwt')
  jwtConfig;

  @Inject()
  userService: UserService;

  async validate(payload: any) {
    return payload;
  }

  getStrategyOptions(): any {
    return {
      secretOrKey: this.jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
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

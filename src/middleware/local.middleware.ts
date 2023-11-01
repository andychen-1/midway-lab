import { Middleware } from '@midwayjs/core';
import { PassportMiddleware, AuthenticateOptions } from '@midwayjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';

@Middleware()
export class LocalPassportMiddleware extends PassportMiddleware(LocalStrategy) {
  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {
      failureRedirect: '/login',
    };
  }

  ignore: Array<any> = ['/login', '/api/login'];
}

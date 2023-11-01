import { App, Middleware, IMiddleware, Init } from '@midwayjs/core';
import { Application, Context, NextFunction } from '@midwayjs/koa';

import { IRedirectRecorderOpts } from '../interface';

const REDIRECT_RECORDER_MIDDLEWARE_NAME = 'redirectRecorder';

@Middleware()
export class RedirectRecorderMiddleware
  implements IMiddleware<Context, NextFunction>
{
  @App()
  app: Application;

  redirectConfig: IRedirectRecorderOpts;

  @Init()
  init(): void {
    const {
      loginPage = '/login',
      refererName = 'ref',
      returnUrl = undefined,
    } = this.app.getConfig(REDIRECT_RECORDER_MIDDLEWARE_NAME) ?? {};

    this.redirectConfig = { loginPage, refererName, returnUrl };
    this.app.addConfigObject({
      [REDIRECT_RECORDER_MIDDLEWARE_NAME]: this.redirectConfig,
    });
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();

      const { loginPage, refererName, returnUrl } = this.redirectConfig;

      if (ctx.status === 302) {
        const { location } = ctx.response.header ?? {};
        if (location && loginPage === location) {
          ctx.session[refererName] = returnUrl || ctx.req.url;
        }
      }

      // 返回给上一个中间件的结果
      return result;
    };
  }

  static getName(): string {
    return REDIRECT_RECORDER_MIDDLEWARE_NAME;
  }
}

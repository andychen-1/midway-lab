import { Controller, Inject, Get } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Get('/login')
  async login() {
    return await this.ctx.render('login.ejs', {
      csrfToken: this.ctx.csrf,
    });
  }
}

import { Config, Inject, Controller, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ParseStringPipe } from '../pipe/parseString.pipe';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Config('passport')
  passConfig: any;

  @Config('redirectRecorder.refererName')
  refererName: string;

  @Inject()
  userService: UserService;

  @Post('/login')
  async login(
    @Body('username', [ParseStringPipe]) username: string,
    @Body('password', [ParseStringPipe]) password: string
  ) {
    const { sessionUserProperty, userProperty } = this.passConfig;

    this.ctx.session[sessionUserProperty] = {};
    const user = await this.userService.getUser({ username, password });
    if (user && user.username === username) {
      this.ctx.session[sessionUserProperty] = { [userProperty]: username };
      this.ctx.rotateCsrfSecret();
      return {
        success: true,
        message: '用户登录成功',
        successRedirect: this.ctx.session[this.refererName],
        ct: this.ctx.csrf,
      };
    }
    this.ctx.status = 401;
    return { success: false, message: '用户名或密码错误' };
  }

  @Post('/get_user')
  async getUser() {
    return this.ctx.state.user;
  }
}

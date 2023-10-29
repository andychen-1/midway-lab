import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { ParseStringPipe } from '../pipe/parseString.pipe';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  jwtService: JwtService;

  @Inject()
  userService: UserService;

  @Post('/login')
  async login(
    @Body('username', [ParseStringPipe]) username: string,
    @Body('password', [ParseStringPipe]) password: string
  ) {
    const { session, sessionUserProperty, userProperty } =
      this.ctx.app.getConfig('passport') ?? {};
    if (session) {
      this.ctx.session[sessionUserProperty] = {};
    }

    const user = await this.userService.getUser({ username, password });
    if (user && user.username === username) {
      const signPayload = { [userProperty]: username };
      const jt = await this.jwtService.sign(signPayload);
      if (session) {
        this.ctx.session[sessionUserProperty] = signPayload;
        this.ctx.rotateCsrfSecret();
      }
      return {
        success: true,
        message: '用户登录成功',
        ct: this.ctx.csrf,
        jt,
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

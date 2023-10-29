import { Configuration, App, ILifeCycle } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as jwt from '@midwayjs/jwt';
import * as security from '@midwayjs/security';
import * as passport from '@midwayjs/passport';
import * as validate from '@midwayjs/validate';
import * as view from '@midwayjs/view-ejs';
import * as info from '@midwayjs/info';
import * as staticFile from '@midwayjs/static-file';
import * as orm from '@midwayjs/typeorm';
import { join } from 'path';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { JwtPassportMiddleware } from './middleware/jwt.middleware';

@Configuration({
  imports: [
    koa,
    security,
    jwt,
    passport,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    view,
    staticFile,
    orm,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration implements ILifeCycle {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([JwtPassportMiddleware, ReportMiddleware]);

    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}

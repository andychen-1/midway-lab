import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: ['z*e%,Fy$bzdK1K_'],
  koa: {
    port: 7001,
  },
  session: {
    maxAge: 'session',
  },
  security: {
    csrf: {
      useSession: true,
    },
  },
  passport: {
    session: true,
  },
  view: {
    mapping: {
      '.ejs': 'ejs',
    },
  },
  staticFile: {
    dirs: {
      default: {
        prefix: '/',
      },
    },
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mongodb',
        host: '127.0.0.1',
        port: 27017,
        database: 'MLdb',
        username: 'MLdb',
        password: '1Qaz@wsx',
        synchronize: false,
        logging: true,
        entities: ['**/entity/*.entity{.ts,.js}'],
      },
    },
  },
} as MidwayConfig;

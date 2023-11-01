import '@midwayjs/core';

/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  username: string;
  password?: string;
}

export interface IRedirectRecorderOpts {
  loginPage?: string;
  refererName?: string;
  returnUrl?: string;
}

declare module '@midwayjs/core/dist/interface' {
  interface MidwayConfig {
    redirectRecorder?: IRedirectRecorderOpts;
  }
}

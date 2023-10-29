import { Pipe } from '@midwayjs/core';
import { ParsePipe, RuleType } from '@midwayjs/validate';
// eslint-disable-next-line node/no-extraneous-import
import * as Joi from 'joi';

@Pipe()
export class ParseStringPipe extends ParsePipe {
  getSchema(): RuleType.AnySchema<any> {
    return Joi.string().required();
  }
}

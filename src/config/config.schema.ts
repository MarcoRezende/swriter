import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  /**
   * This will be used as heroku port.
   */
  PORT: Joi.number().default(3000),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(3306).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().default('').optional(),
  DB_DATABASE: Joi.string().required(),
});

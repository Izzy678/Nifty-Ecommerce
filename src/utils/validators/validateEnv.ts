import * as Joi from "joi";

export const validateEnv = Joi.object({
  NODE_ENV: Joi.string().required().valid("development", "environment"),
  PORT: Joi.number().required(),
  TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  TOKEN_EXPIRES_IN: Joi.string().required(),
  REFRESH_TOKEN_EXPRES_IN: Joi.string().required(),
  CONNECTION_STRING: Joi.string().required(),
});

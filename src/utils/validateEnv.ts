import { Type } from '@sinclair/typebox';

export const schema = Type.Object({
  APP_ENV: Type.String(),
  API_VERSION: Type.String(),
  ORIGIN: Type.String(),
  SECRET_KEY: Type.String(),
  PORT: Type.String(),
  DATABASE_URI: Type.String()
});

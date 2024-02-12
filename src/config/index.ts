import { config } from 'dotenv';

config({ path: `.env.${process.env.APP_ENV ?? 'development'}.local` });

export const { APP_ENV, PORT, API_VERSION, ORIGIN
  , CREDENTIALS, SECRET_KEY, DATABASE_URI
} = process.env;

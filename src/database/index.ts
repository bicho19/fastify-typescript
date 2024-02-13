import {DATABASE_URI} from '@config';
import appLogger from '@utils/logger';
import {drizzle} from 'drizzle-orm/node-postgres';
import {Client} from 'pg';
import * as schema from './models';

const client = new Client({
  connectionString: DATABASE_URI
});
export const db = drizzle(client, {schema});

export const initDb = async () => {
  try {
    await client.connect();
    appLogger.info('DATABASE :: Connected to database');
  } catch (error) {
    appLogger.error(error, `DATABASE :: Failed to connect to database`);
    throw new Error(`Failed to connect to database ${String(error)}`);
  }
};

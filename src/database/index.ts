import { DATABASE_URI } from '@config';
import appLogger from '@utils/logger';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Client } from 'pg';

// eslint-disable-next-line import/no-mutable-exports
export let db: ReturnType<typeof drizzle>;

export const initDb = async () => {
  try {
    const client = new Client({
      connectionString: DATABASE_URI
    });
    await client.connect();
    appLogger.info('DATABASE :: Connected to database');

    db = drizzle(client);

    // Run database migrations
    await migrate(db, {
      migrationsFolder: './src/database/migrations'
    })
      .then(() => {
        appLogger.info('DATABASE :: migrated database successfully');
      })
      .catch((error) => {
        appLogger.error(error, `Failed to migrate database`);
        throw new Error(`Failed to migrate database ${String(error)}`);
      });

  } catch (error) {
    appLogger.error(error, `DATABASE :: Failed to connect to database`);
    throw new Error(`Failed to connect to database ${String(error)}`);
  }
};

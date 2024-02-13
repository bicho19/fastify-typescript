import {drizzle} from 'drizzle-orm/node-postgres';
import {migrate} from 'drizzle-orm/node-postgres/migrator';
import {Client} from 'pg';
import * as dotenv from 'dotenv';

dotenv.config({path: '.env.development.local'});

if (!process.env.DATABASE_URI) {
  throw new Error('Cannot migrate. DATABASE_URI is not set');
}

// this will automatically run needed migrations on the database

const client = new Client({
  connectionString: process.env.DATABASE_URI
});
client.connect().then(() => {
  const db = drizzle(client);
  migrate(db, {migrationsFolder: './src/database/migrations'})
      .then(() => {
        console.log('Migrations complete!');
        process.exit(0);
      })
      .catch((err) => {
        console.error(err, 'Migrations failed!');
        process.exit(1);
      });
}).catch((error) => {
  console.error(error, 'Database connection failed!');
});


import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./src/database/models/*.model.ts",
  // Used to store the migration files
  out: "./src/database/migrations",
  driver: 'pg',
  verbose: true,
  strict: true,
})

import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./src/**/*.model.ts",
  // Used to store the migration files
  out: "./src/database/migrations",
  driver: 'pg',
  verbose: true,
  strict: true,
})

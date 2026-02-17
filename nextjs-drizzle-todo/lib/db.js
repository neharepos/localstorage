// lib/db.js
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

let pool;
if (process.env.NODE_ENV === 'production') {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
} else {
  // In development, attach to global to avoid new Pool on every hot reload
  global.__pgPool ||= new Pool({ connectionString: process.env.DATABASE_URL });
  pool = global.__pgPool;
}

export const db = drizzle({ client: pool });

// src/index.js
import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { users } from './db/schema.js';
import { eq } from 'drizzle-orm';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
// 1
const db = drizzle({ client: pool });
// 2

async function main() {
  // 3 - Create
  const [created] = await db.insert(users).values({
    email: 'ali@example.com',
    name: 'Alice',
    age: 28
  })
  .onConflictDoUpdate({
      target: users.email,
      set: {
        name: 'Alice',
        age: 28
      }
    })
  .returning();
  console.log('Created:', created);

  // 4 - Read
//   const all = await db.select().from(users);
//   console.log('All users:', all);

//   // 5 - Update
//   const [updated] = await db
//     .update(users)
//     .set({ name: 'Alice Smith' })
//     .where(eq(users.id, created.id))
//     .returning();

//   console.log('Updated:', updated);

  // 6 - Delete
//   const [deleted] = await db
//     .delete(users)
//     .where(eq(users.id, created.id))
//     .returning();

//   console.log('Deleted:', deleted);

  await pool.end();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

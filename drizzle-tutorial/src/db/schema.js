// src/db/schema.js
import { serial, pgTable, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  age: integer('age'),
  created_at: timestamp('created_at').defaultNow().notNull()
});

// pages/api/todos/index.js
import { db } from '../../../lib/db';
import { todos } from '../../../src/db/schema';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const all = await db.select().from(todos).orderBy(todos.created_at.desc());
    return res.status(200).json(all);
  }

  if (req.method === 'POST') {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }
    const [created] = await db.insert(todos).values({ title }).returning();
    return res.status(201).json(created);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

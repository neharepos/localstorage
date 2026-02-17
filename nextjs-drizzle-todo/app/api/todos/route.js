// app/api/todos/route.js
import { db } from '@/lib/db';
import { todos } from '@/src/db/schema';
import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allTodos = await db.select().from(todos).orderBy(desc(todos.created_at));
    return NextResponse.json(allTodos);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title } = await request.json();
    
    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Title must be a non-empty string' }, { status: 400 });
    }

    const [created] = await db.insert(todos).values({ title }).returning();
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
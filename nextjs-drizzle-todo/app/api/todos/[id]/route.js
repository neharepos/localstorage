
// app/api/todos/[id]/route.js
import { db } from '@/lib/db';
import { todos } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const todoId = parseInt(id, 10);

        if (Number.isNaN(todoId)) {
            return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
        }

        const body = await request.json();
        const { title, completed } = body;

        const data = {};
        if (typeof title === 'string') data.title = title;
        if (typeof completed === 'boolean') data.completed = completed;
        data.updated_at = new Date();

        const [updated] = await db.update(todos)
            .set(data)
            .where(eq(todos.id, todoId))
            .returning();

        if (!updated) {
            return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const todoId = parseInt(id, 10);

        if (Number.isNaN(todoId)) {
            return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
        }

        await db.delete(todos).where(eq(todos.id, todoId));

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

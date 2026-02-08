import { NextResponse } from "next/server";
import {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
} from "@/lib/db";

export async function GET(){
    const todos = getTodos();
    return NextResponse.json(todos);
}

export async function POST(request){
    const body = await request.json();
    const todo = addTodo(body.text);
    return NextResponse.json(todo);
}

export async function Put(request){
    const body = await request.json();
    const updated = updateTodo(body.id, body);

    if(!updated){
        return NextResponse.json(
            { error: "Todo not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(updated)
}

export async function DELETE(request){
    const body = await request.json();
    const success = deleteTodo(body.id);

    if(!success){
        return NextResponse.json(
            { error: "Todo not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true });
}
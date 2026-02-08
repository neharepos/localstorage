"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  async function fetchTodos(){
    const res = await fetch("/api/todos")
    const data = await res.json();
    setTodos(data);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  async function addNewTodo(){
    await fetch("/api/todos", {
      method:"POST",
      body: JSON.stringify({text}),
    });

    setText("");
    fetchTodos();

  }

  async function toggleTodo(todo){
    await fetch("/api/todos", {
      method: "PUT",
      body: JSON.stringify({
        id: todo.id,
        completed: !todo.completed,
      }),
    });
    fetchTodos();
  }

  async function removeTodo(id){
    await fetch("/api/todos", {
      method: "DELETE", 
      body: JSON.stringify({ id }),
    });

    fetchTodos();
  }
  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App</h1>

      <input
       className="border"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button 
      className="ml-4 border px-3"
      onClick={addNewTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo)}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {todo.text}
            </span>

            <button 
            className="ml-8 border mt-5 px-3"
            onClick={() => removeTodo(todo.id)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client"
import { useEffect, useState } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  async function fetchTodos() {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  async function addTodo(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.trim() })
    });
    if (res.ok) {
      setTitle('');
      fetchTodos();
    }
  }

  async function toggle(todo) {
    await fetch(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed })
    });
    fetchTodos();
  }

  async function remove(id) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Prisma + Next.js Todo</h1>
      <form onSubmit={addTodo}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New todo" />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              <input type="checkbox" checked={todo.completed} onChange={() => toggle(todo)} />
              {todo.title}
            </label>
            <button onClick={() => remove(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

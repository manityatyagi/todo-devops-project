import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:4000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const addTodo = async event => {
    event.preventDefault();
    if (!text.trim()) return;

    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    const newTodo = await response.json();
    setTodos([newTodo, ...todos]);
    setText('');
  };

  const updateTodo = async (id, completed) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });

    const updated = await response.json();
    setTodos(todos.map(todo => (todo.id === id ? updated : todo)));
  };

  const deleteTodo = async id => {
    await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="page-shell">
      <section className="todo-card">
        <div className="hero">
          <h1>Todo App</h1>
          <p>Simple task manager with a calm and modern interface.</p>
        </div>

        <form className="todo-form" onSubmit={addTodo}>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Add a new todo"
            aria-label="Add a new todo"
          />
          <button type="submit">Add</button>
        </form>

        {loading ? (
          <div className="empty-state">Loading tasks...</div>
        ) : todos.length === 0 ? (
          <div className="empty-state">No todos yet. Add one to get started.</div>
        ) : (
          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className={todo.completed ? 'todo-item completed' : 'todo-item'}>
                <button className="toggle-btn" onClick={() => updateTodo(todo.id, !todo.completed)}>
                  {todo.completed ? 'Undo' : 'Done'}
                </button>
                <span>{todo.text}</span>
                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;

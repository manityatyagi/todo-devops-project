const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

let todos = [
  { id: 1, text: 'Build a simple todo app', completed: false },
  { id: 2, text: 'Keep it clean and minimal', completed: true }
];

app.get("/", (req, res) => {
    res.json({
        message: "Server is running"
    });
})

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy"
    });
})

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Todo text is required.' });
  }

  const newTodo = {
    id: Date.now(),
    text: text.trim(),
    completed: false
  };

  todos = [newTodo, ...todos];
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { completed, text } = req.body;

  let updatedTodo;
  todos = todos.map(todo => {
    if (todo.id === id) {
      updatedTodo = {
        ...todo,
        completed: typeof completed === 'boolean' ? completed : todo.completed,
        text: typeof text === 'string' ? text.trim() : todo.text
      };
      return updatedTodo;
    }
    return todo;
  });

  if (!updatedTodo) {
    return res.status(404).json({ error: 'Todo not found.' });
  }

  res.json(updatedTodo);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const beforeLength = todos.length;
  todos = todos.filter(todo => todo.id !== id);

  if (todos.length === beforeLength) {
    return res.status(404).json({ error: 'Todo not found.' });
  }

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Todo backend running on http://localhost:${PORT}`);
});

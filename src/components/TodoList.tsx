import { useRef, useState } from 'react';

const Initial_Todos = [
  { id: 1, text: '할 일 1', completed: true },
  { id: 2, text: '할 일 2', completed: true },
  { id: 3, text: '할 일 3', completed: false },
];

export default function TodoList() {
  const [todos, setTodos] = useState(Initial_Todos);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const nextId = useRef(4);

  const addTodo = () => {
    const newTodo = {
      id: nextId.current,
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    nextId.current += 1;
    setInput('');
  };

  const toggleComplete = (todoId: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (todoId: number) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const filterTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'incompleted':
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  };

  const searchTodos = () => {
    return filterTodos().filter((todo) => todo.text.includes(searchQuery));
  };

  return (
    <>
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add +</button>
      <div>
        <p>필터링</p>
        <label>
          <input
            type='checkbox'
            checked={filter === 'all'}
            onChange={() => setFilter('all')}
          />
          Show All
        </label>
        <label>
          <input
            type='checkbox'
            checked={filter === 'completed'}
            onChange={() => setFilter('completed')}
          />
          Show Completed
        </label>
        <label>
          <input
            type='checkbox'
            checked={filter === 'incompleted'}
            onChange={() => setFilter('incompleted')}
          />
          Show Incompleted
        </label>
        {/* <button onClick={() => setFilter('all')}>Show All</button>
        <button onClick={() => setFilter('completed')}>Show Completed</button>
        <button onClick={() => setFilter('incompleted')}>
          Show Incompleted
        </button> */}
      </div>
      <input
        type='text'
        placeholder='Search ...'
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {searchTodos().map((todo) => (
          <li key={todo.id}>
            <button onClick={() => toggleComplete(todo.id)}>
              {todo.completed ? 'V' : 'ㅁ'}
            </button>{' '}
            {todo.text} <button onClick={() => removeTodo(todo.id)}>-</button>
          </li>
        ))}
      </ul>
    </>
  );
}

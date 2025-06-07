'use client'

import React,{useState,useRef} from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const Userpage = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: 'Read DataStructure', completed: false },
    { id: 2, title: 'Writing Homework', completed: false },
    { id: 3, title: 'Playing Volleyball', completed: false },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  const addEvent = () => {
    const task = inputRef.current?.value.trim();
    if (task) {
      const newTodo: Todo = {
        id: Date.now(),
        title: task,
        completed: false,
      };
      setTodos([...todos, newTodo]);
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };
  
  return (
    <main className='back-div'>
      <div className='back-div'>
        <button className="back-btn">
          <a href="http://localhost:3000">
            &laquo; Go Back
          </a>
        </button>
      </div>

      <center>
        <h1 className="h1-tag">To Do APP</h1>
      </center>

      <div className="main">
        <div className="sub-div">
          <input className='input' placeholder='Enter a ToDo Item' ref={inputRef} type="text" />
          <button className="add-btn" onClick={addEvent}>Add</button>
        </div>
        <br>
        </br>
        <br>
        </br>
        <div className="todo-list">
          <h2 className='todo-list-heading'>ToDo Lists</h2>
          {todos.length === 0 ? (
              <p style={{ textAlign: 'center', fontSize: '22px', color: 'darkbrown',fontWeight:'bold' ,fontStyle:'italic'}}>
                No To-Do Items
              </p>
            ) : (
          <ol>
            {todos.map((item) => (
              <li key={item.id} className="todo-item">
                <span
                  style={{
                    textDecoration: item.completed ? 'line-through' : 'none',
                  }}>
                  {item.title}
                </span>
                <div className="button-group">
                  <button onClick={() => toggleComplete(item.id)} className="complete">
                    {item.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button onClick={() => deleteTodo(item.id)} className="delete">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ol>
            )}
        </div>
      </div>
    </main>
  );
};

export default Userpage;

import React, { useState } from 'react';
import TodoService from '../TodoService';
import { IoMdAddCircleOutline } from "react-icons/io";

// TypeScript için props tipini tanımlıyoruz
interface TodoFormProps {
  setTodos: React.Dispatch<React.SetStateAction<any>>;
}

const TodoForm = ({ setTodos }: TodoFormProps) => {
  const [newTodoText, setNewTodoText] = useState<string>("");

  const handleAddTodo = () => {
    // Boşluk kontrolü
    if (newTodoText.trim() !== "") {
      const newTodo = TodoService.addTodos(newTodoText);
      setTodos((prevTodos: any) => [...prevTodos, newTodo]);
      setNewTodoText(""); // Inputu temizle
    }
  };

  // Enter tuşuna basınca ekleme yapması için
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-form" style={{ 
      display: 'flex', 
      gap: '10px', 
      marginBottom: '30px',
      background: '#fff',
      padding: '12px 15px',
      borderRadius: '20px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.04)',
      border: '1px solid #FFF5F5'
    }}>
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task..." 
        style={{ 
          flex: 1, 
          border: 'none', 
          outline: 'none', 
          padding: '5px 10px',
          fontSize: '1rem',
          color: '#555',
          background: 'transparent'
        }}
      />
      <button 
        onClick={handleAddTodo}
        style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          transition: 'transform 0.2s'
        }}
        title="Add Task"
      >
        <IoMdAddCircleOutline style={{ color: '#FFB7B2', fontSize: '32px' }} />
      </button>
    </div>
  );
};

export default TodoForm;
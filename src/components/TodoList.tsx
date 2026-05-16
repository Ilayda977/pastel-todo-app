import { useState } from 'react';
import TodoService from '../TodoService'; 
import type { TodoTypes } from '../todo'; 
import TodoForm from './TodoForm'; 

// İkon setini FontAwesome ve MdIcons olarak kullanıyoruz
import { FaPencilAlt, FaCheck, FaTrash, FaTimes } from "react-icons/fa";
import { MdOutlineCircle, MdCheckCircle } from "react-icons/md";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  const handleToggleTodo = (id: number) => {
    TodoService.toggleTodo(id);
    setTodos(TodoService.getTodos());
  };

  const handleEditSave = (id: number) => {
    if (editedTodoText.trim() !== "") {
      const updatedTodo = TodoService.updateTodo({
        id, text: editedTodoText, completed: false
      });
      setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)));
      setEditingTodoId(null);
    }
  };

  // Tamamlanan görev sayısını bulalım (Emoji için)
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="todo-list-wrapper" style={{ width: '100%' }}>
      {/* LİLA GÜLEN EMOJİ - Görev yapınca tepki verir */}
      <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '50px' }}>
        {completedCount > 0 ? (
          <div className="emoji-bounce" style={{ color: '#B19CD9' }}>😊</div>
        ) : (
          <div style={{ color: '#E0E0E0', filter: 'grayscale(100%)' }}>😶</div>
        )}
        <p style={{ fontSize: '0.9rem', color: '#B19CD9', marginTop: '5px' }}>
          {completedCount > 0 ? "Great job! Keep going! ✨" : "Waiting for your first task..."}
        </p>
      </div>

      <TodoForm setTodos={setTodos} />
      
      <div style={{ marginTop: '20px' }}>
        {todos.length === 0 ? (
          <p style={{ color: '#BDBDBD', textAlign: 'center', fontStyle: 'italic', marginTop: '30px' }}>
            You don't have any tasks yet... 🌸
          </p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="todo-card" style={{ 
              marginBottom: '15px', display: 'flex', alignItems: 'center', 
              padding: '15px', borderRadius: '15px', background: '#fff',
              border: '1px solid #FFF5F5', transition: 'all 0.3s ease',
              position: 'relative', overflow: 'hidden'
            }}>
              {editingTodoId === todo.id ? (
                /* EDIT MODU */
                <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                  <input
                    type="text" value={editedTodoText}
                    onChange={(e) => setEditedTodoText(e.target.value)}
                    autoFocus
                    className="edit-input"
                  />
                  <button onClick={() => handleEditSave(todo.id)} className="btn-icon">
                    <FaCheck style={{ color: '#A8E6CF', fontSize: '20px' }} title="Save" />
                  </button>
                  <button onClick={() => setEditingTodoId(null)} className="btn-icon">
                    <FaTimes style={{ color: '#FFB7B2', fontSize: '20px' }} title="Cancel" />
                  </button>
                </div>
              ) : (
                /* NORMAL MOD */
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  
                  {/* Yeni Checkbox ve Metin Kısmı */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, cursor: 'pointer' }} onClick={() => handleToggleTodo(todo.id)}>
                    {todo.completed ? (
                      <MdCheckCircle className="check-icon checked" style={{ color: '#A8E6CF', fontSize: '24px' }} />
                    ) : (
                      <MdOutlineCircle className="check-icon unchecked" style={{ color: '#E0E0E0', fontSize: '24px' }} />
                    )}
                    
                    <span style={{ 
                      color: todo.completed ? '#BDBDBD' : '#666', 
                      fontSize: '1.1rem',
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      transition: 'all 0.3s ease'
                    }}>
                      {todo.text}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '15px', marginLeft: '15px' }}>
                    {/* Tamamlanmış görev düzenlenemez */}
                    {!todo.completed && (
                      <button onClick={() => {setEditingTodoId(todo.id); setEditedTodoText(todo.text);}} className="btn-icon">
                        <FaPencilAlt style={{ color: '#A0C4FF', fontSize: '18px' }} title="Edit" />
                      </button>
                    )}
                    <button onClick={() => {TodoService.deleteTodo(todo.id); setTodos(TodoService.getTodos());}} className="btn-icon">
                      <FaTrash style={{ color: '#FFB7B2', fontSize: '18px' }} title="Delete" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* TÜM EFEKTLER BURADA (CSS) */}
      <style>{`
        /* 1. Görev Kutusu Hover Efekti */
        .todo-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(177, 156, 217, 0.08); /* Hafif lila gölge */
          border-color: #B19CD9; /* Lila kenarlık */
        }

        /* 2. Buton Temelleri */
        .btn-icon {
          background: none; 
          border: none; 
          cursor: pointer; 
          padding: 5px;
          transition: transform 0.2s ease, filter 0.2s ease;
          display: flex;
          alignItems: center;
        }

        /* 3. Buton Hover Efektleri (Büyüme ve Parlama) */
        .btn-icon:hover {
          transform: scale(1.25); /* Büyüme */
          filter: brightness(1.1); /* Hafif parlama */
        }

        /* 4. Checkbox Hover Efekti */
        .check-icon {
          transition: transform 0.2s ease;
        }
        .check-icon:hover {
          transform: scale(1.15);
        }

        /* 5. Emoji Zıplama Animasyonu */
        .emoji-bounce {
          animation: bounce 1.2s infinite alternate;
        }

        @keyframes bounce {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }

        /* 6. Düzenleme Giriş Kutusu */
        .edit-input {
          flex: 1; padding: 8px; border-radius: 8px; border: 1px solid #B19CD9; outline: none;
          color: #666; font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default TodoList;
import type { TodoTypes } from "./todo";
const LOCAL_STORAGE_KEY = "todos";

const TodoService = {
  // Görevleri getir
  getTodos: (): TodoTypes[] => {
    const todoStr = localStorage.getItem(LOCAL_STORAGE_KEY);
    return todoStr ? JSON.parse(todoStr) : [];
  },

  // Görev ekle
  addTodos: (text: string): TodoTypes => {
    const todos = TodoService.getTodos();
    const newTodo: TodoTypes = { id: Date.now(), text, completed: false };
    const updatedTodos = [...todos, newTodo];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    return newTodo;
  },

  // Görev güncelle (Edit)
  updateTodo: (todo: TodoTypes): TodoTypes => {
    const todos = TodoService.getTodos();
    const updatedTodos = todos.map((t) => (t.id === todo.id ? todo : t));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    return todo;
  },

  // TAMAMLANDI DURUMUNU DEĞİŞTİR (Hatanın çözümü burada!)
  toggleTodo: (id: number): TodoTypes => {
    const todos = TodoService.getTodos();
    const todoIndex = todos.findIndex((t) => t.id === id);
    if (todoIndex === -1) throw new Error("Todo not found!");

    todos[todoIndex].completed = !todos[todoIndex].completed;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    return todos[todoIndex];
  },

  // Görev sil
  deleteTodo: (id: number): void => {
    const todos = TodoService.getTodos();
    const updatedTodos = todos.filter((t) => t.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
  },
};

export default TodoService;
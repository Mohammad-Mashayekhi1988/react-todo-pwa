import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");

    if (!savedTodos) {
      return [];
    }

    return JSON.parse(savedTodos);
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (
    text: string,
    reminderDate: string,
    reminderTime: string,
  ) => {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      reminderDate,
      reminderTime,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const editTodo = (id: number, newText: string) => {
    if (!newText.trim()) return;

    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: newText,
            }
          : todo,
      ),
    );
  };

  const markAsNotified = (id: number) => {
  setTodos(
    todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            notified: true,
          }
        : todo
    )
  );
};
  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
      markAsNotified,

  };
}

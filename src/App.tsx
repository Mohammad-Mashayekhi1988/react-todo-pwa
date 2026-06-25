import { useState } from "react";
import Header from "./components/layout/Header";
import type { Todo } from "./types/todo";
import TodoForm from "./features/todo/TodoForm";
import TodoList from "./features/todo/TodoList";
import { useTodos } from "./hooks/useTodos";

function App() {
  const [task, setTask] = useState("");

  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <>
      <Header />

      <main className="mx-auto mt-10 max-w-xl px-4">
        <TodoForm
          task={task}
          onTaskChange={setTask}
          onAddTodo={() => {
            addTodo(task);
            setTask("");
          }}
        />

        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </main>
    </>
  );
}

export default App;

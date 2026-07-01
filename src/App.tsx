import { useEffect, useRef, useState } from "react";
import Header from "./components/layout/Header";
import TodoForm from "./features/todo/TodoForm";
import TodoList from "./features/todo/TodoList";
import { useTodos } from "./hooks/useTodos";
import { useTheme } from "./contexts/ThemeContext";
import { translations } from "./locales/translations";
import { useLanguage } from "./contexts/LanguageContext";
function App() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [task, setTask] = useState("");
  const [reminderDate, setReminderDate] = useState("");

  const [reminderTime, setReminderTime] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [search, setSearch] = useState("");

  const t = translations[language];
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, markAsNotified } =
    useTodos();
  const todosRef = useRef(todos);

  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
          ? !todo.completed
          : todo.completed;

    const matchesSearch = todo.text
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });
  const isDark = theme === "dark";

  const totalTodos = todos.length;

  const completedTodos = todos.filter((todo) => todo.completed).length;

  const remainingTodos = totalTodos - completedTodos;

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const todos = todosRef.current;

      const now = new Date();

      todos.forEach((todo) => {
        if (!todo.reminderDate || !todo.reminderTime) {
          return;
        }

        const reminder = new Date(`${todo.reminderDate}T${todo.reminderTime}`);

        if (!todo.notified && now >= reminder) {
          new Notification("Todo Reminder", {
            body: todo.text,
          });

          markAsNotified(todo.id);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    todosRef.current = todos;
  }, [todos]);

  return (
    <>
      <div
        className={
          theme === "dark"
            ? "min-h-screen bg-gray-900 text-white"
            : "min-h-screen bg-white text-black"
        }
      >
        <Header />

        <main
          className={`mx-auto mt-10 max-w-xl px-4 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          <TodoForm
            task={task}
            reminderDate={reminderDate}
            reminderTime={reminderTime}
            onReminderDateChange={setReminderDate}
            onReminderTimeChange={setReminderTime}
            onTaskChange={setTask}
            onAddTodo={() => {
              addTodo(task, reminderDate, reminderTime);

              setTask("");
              setReminderDate("");
              setReminderTime("");
            }}
            addButtonText={t.add}
          />
          <div
            className={`mb-6 flex gap-6 rounded-lg border p-4 ${
              isDark ? "border-gray-700 bg-gray-800" : "bg-white"
            }`}
          >
            <span>
              {t.total}: {totalTodos}
            </span>

            <span>
              {t.completed}: {completedTodos}
            </span>

            <span>
              {t.remaining}: {remainingTodos}
            </span>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.search}
            className={`mb-4 w-full rounded-lg border bg-transparent p-3 text-inherit placeholder:text-gray-400 ${
              isDark ? "border-gray-700" : ""
            }`}
          />
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`rounded border px-3 py-1 transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : isDark
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text-black"
              }`}
            >
              {t.all}
            </button>

            <button
              onClick={() => setFilter("active")}
              className={`rounded border px-3 py-1 transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : isDark
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text-black"
              }`}
            >
              {t.active}
            </button>

            <button
              onClick={() => setFilter("completed")}
              className={`rounded border px-3 py-1 transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : isDark
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text-black"
              }`}
            >
              {t.completed}
            </button>
          </div>
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </main>
      </div>
    </>
  );
}

export default App;

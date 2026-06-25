import type { Todo } from "../../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="mb-2 flex justify-between items-center gap-3 rounded-lg border p-3">
      <span className={todo.completed ? "line-through text-gray-400" : ""}>
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className=" rounded border px-3 py-1"
      >
        حذف
      </button>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
    </li>
  );
}

export default TodoItem;

import type { Todo } from "../../types/todo";
import { useState } from "react";
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}

function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [editText, setEditText] = useState(todo.text);
  const handleSave = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };
  return (
    <li className="mb-2 flex items-center gap-3 rounded-lg border p-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 rounded border p-2"
          />

          <button onClick={handleSave} className="rounded border px-3 py-1">
            ذخیره
          </button>
        </>
      ) : (
        <>
          <span
            className={`flex-1 ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.text}
          </span>
          {(todo.reminderDate || todo.reminderTime) && (
            <p className="mt-1 text-sm text-gray-500">
              📅 {todo.reminderDate} 🕒 {todo.reminderTime}
            </p>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="rounded border px-3 py-1"
          >
            ویرایش
          </button>
        </>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className="rounded border px-3 py-1"
      >
        حذف
      </button>
    </li>
  );
}

export default TodoItem;

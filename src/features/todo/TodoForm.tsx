interface TodoFormProps {
  task: string;
  onTaskChange: (value: string) => void;
  onAddTodo: () => void;
}

function TodoForm({
  task,
  onTaskChange,
  onAddTodo,
}: TodoFormProps) {
  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={task}
        onChange={(e) => onTaskChange(e.target.value)}
        placeholder="نام تسک را وارد کنید..."
        className="w-full rounded-lg border p-3"
      />

      <button
        onClick={onAddTodo}
        className="rounded-lg border px-4"
      >
        افزودن
      </button>
    </div>
  );
}

export default TodoForm;
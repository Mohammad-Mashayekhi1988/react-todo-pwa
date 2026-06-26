interface TodoFormProps {
  task: string;
  reminderDate: string;
  reminderTime: string;

  onTaskChange: (value: string) => void;
  onReminderDateChange: (value: string) => void;
  onReminderTimeChange: (value: string) => void;

  onAddTodo: () => void;
  addButtonText: string;
}
function TodoForm({
  task,
  reminderDate,
  reminderTime,
  onTaskChange,
  onReminderDateChange,
  onReminderTimeChange,
  onAddTodo,
  addButtonText,
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
       <div className="flex gap-3">
      <input
        type="date"
        value={reminderDate}
        onChange={(e) => onReminderDateChange(e.target.value)}
      />
      <input
        type="time"
        value={reminderTime}
        onChange={(e) => onReminderTimeChange(e.target.value)}
      />
      </div>
<button
  type="button"
  onClick={onAddTodo}
  className="w-full rounded-lg bg-blue-600 p-3 text-white"
>
  {addButtonText}
</button>
    </div>
  );
}

export default TodoForm;

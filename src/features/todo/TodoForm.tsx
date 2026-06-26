import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../locales/translations";

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
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={task}
        onChange={(e) => onTaskChange(e.target.value)}
        placeholder={t.taskPlaceholder}
        className="w-full rounded-lg border bg-transparent p-3 text-inherit placeholder:text-gray-400"
      />

      <div className="flex gap-3 sm:flex-row">
        <input
          type="date"
          value={reminderDate}
          onChange={(e) => onReminderDateChange(e.target.value)}
          className="flex-1 rounded-lg border bg-transparent p-3 text-inherit"
        />
        <input
          type="time"
          value={reminderTime}
          onChange={(e) => onReminderTimeChange(e.target.value)}
          className="flex-1 rounded-lg border bg-transparent p-3 text-inherit"
        />
      </div>

      <button
        type="button"
        onClick={onAddTodo}
        className="w-full rounded-lg bg-blue-600 p-3 font-medium text-white hover:bg-blue-700 transition"
      >
        {addButtonText}
      </button>
    </div>
  );
}

export default TodoForm;

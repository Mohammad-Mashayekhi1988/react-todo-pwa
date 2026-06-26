import { useTheme } from "../../contexts/ThemeContext";
function Header() {
  const { theme } = useTheme();

const isDark = theme === "dark";
  return (
    <header
  className={`border-b p-4 ${
    isDark
      ? "border-gray-700"
      : "border-gray-200"
  }`}
>
      <h1 className="text-2xl font-bold">
        Todo App
      </h1>
    </header>
  )
}

export default Header
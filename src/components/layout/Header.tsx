import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../locales/translations";
function Header() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  return (
    <header className="flex items-center justify-between border-b p-6">
      <div>
        <h1 className="text-3xl font-bold">📝 {t.appTitle}</h1>{" "}
        <p className="text-sm opacity-70">{t.appSubtitle}</p>
      </div>

      <div className="flex gap-4">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as "light" | "dark")}
          className={`rounded-lg border px-3 py-2 ${
            theme === "dark"
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white text-black border-gray-300"
          }`}
        >
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
        </select>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as "fa" | "en")}
          className={`rounded-lg border px-3 py-2 ${
            theme === "dark"
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white text-black border-gray-300"
          }`}
        >
          <option value="fa">🇮🇷 فارسی</option>
          <option value="en">🇺🇸 English</option>
        </select>
      </div>
    </header>
  );
}

export default Header;

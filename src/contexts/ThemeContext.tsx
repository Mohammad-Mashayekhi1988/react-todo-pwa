import { createContext, useContext, useEffect, useState } from "react";
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
const [theme, setTheme] = useState<"light" | "dark">(() => {
  return (localStorage.getItem("theme") as "light" | "dark") || "light";
});

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
 <ThemeContext.Provider
  value={{
    theme,
    setTheme,
  }}
>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}

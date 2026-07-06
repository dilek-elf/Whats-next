import { createContext, useState, useContext, useEffect } from 'react';

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } catch (e) {
      // server-side rendering guard
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
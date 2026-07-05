// FILE: src/ThemeContext.tsx (new file, lives next to App.tsx in src folder)
// WHY: holds theme state (light/dark) and the toggle function in one place,
// separate from App.tsx, so any component can read it later without passing props
// CONNECTION: main.tsx will import ThemeProvider to wrap the whole app,
// App.tsx will import useTheme to read the current theme and show the toggle button

import { createContext, useState, useContext } from 'react';

// blueprint: what data and functions this context provides
type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

// the actual context, starts as null until a Provider gives it a real value
const ThemeContext = createContext<ThemeContextType | null>(null);

// wraps your app, holds the real state, passes it down to children
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// custom hook, so components just call useTheme() instead of useContext(ThemeContext) directly
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
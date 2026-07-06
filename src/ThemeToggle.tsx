import { useTheme } from './ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button type="button" onClick={toggleTheme} aria-pressed={theme === 'dark'}>
      {theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
    </button>
  );
}
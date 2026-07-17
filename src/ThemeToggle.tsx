import { useTheme } from './theme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className="theme-toggle btn btn-ghost"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      aria-pressed={theme === 'dark'}
    >
      <span className="theme-icon" aria-hidden="true">{theme === 'dark' ? '☾' : '☀'}</span>
      <span className="theme-label">{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
    </button>
  );
}

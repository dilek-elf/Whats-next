// FILE: src/main.tsx
// WHY: this is the entry point that starts your whole app, so ThemeProvider
// must wrap App here, otherwise components can't reach useTheme()
// CONNECTION: imports ThemeProvider from ThemeContext.tsx, wraps App.tsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>j
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
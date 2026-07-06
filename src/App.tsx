// FILE: src/App.tsx
// WHY: zeigt Theme-Toggle und die Whats-next Wishlist zusammen auf einer Seite
// CONNECTION: useTheme aus ThemeContext.tsx, useSelector/useDispatch aus react-redux, actions aus wishlistSlice.ts
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { added, toggled, deleted } from './features/wishlist/wishlistSlice'
import type { RootState, AppDispatch } from './app/store'
import { useTheme } from './ThemeContext'
import ThemeToggle from './ThemeToggle'

function App() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const wishlist = useSelector((state: RootState) => state.wishlist)
  const dispatch = useDispatch<AppDispatch>()

  const [newTitle, setNewTitle] = useState('')

  function handleAddItem() {
    const title = newTitle.trim()
    if (!title) return
    dispatch(added(title))
    setNewTitle('')
  }

  return (
    // outer wrapper: full width and full height, this is what carries the theme background
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        color: isDark ? '#f5f5f5' : '#1a1a1a',
      }}
    >
      {/* inner content: only this part is centered and width-limited */}
      <main
        style={{
          padding: '32px 20px',
          maxWidth: 760,
          margin: '0 auto',
        }}
      >
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <div>
            <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: 1.5, fontSize: 12 }}>
              Whats-next
            </p>
            <h1 style={{ margin: '8px 0 0' }}>Wishlists and theme</h1>
          </div>
          <div>
            <ThemeToggle />
          </div>
        </header>

        <section style={{ marginTop: 32 }}>
          <h2>My Whats-next Wishlist</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Movie or book title"
            />
            <button type="button" onClick={handleAddItem}>Add</button>
          </div>

          <ul style={{ paddingLeft: 18, marginTop: 24 }}>
            {wishlist.map((item) => (
              <li key={item.id} style={{ marginBottom: 12 }}>
                <span style={{ textDecoration: item.done ? 'line-through' : 'none', marginRight: 12 }}>
                  {item.title}
                </span>
                <button type="button" onClick={() => dispatch(toggled(item.id))}>
                  {item.done ? 'Mark unwatched' : 'Mark watched'}
                </button>{' '}
                <button type="button" onClick={() => dispatch(deleted(item.id))}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App
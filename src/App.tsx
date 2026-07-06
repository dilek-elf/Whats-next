import { useState } from 'react'
import { useTheme } from './useTheme'
import { useWishlist, useWishlistDispatch } from './useWishlist'

function App() {
  const { theme, toggleTheme } = useTheme()
  const wishlist = useWishlist()
  const dispatchWishlist = useWishlistDispatch()
  const [newTitle, setNewTitle] = useState('')

  function handleAddItem() {
    const title = newTitle.trim()

    if (!title) return

    dispatchWishlist({ type: 'added', title })
    setNewTitle('')
  }

  return (
    <main style={{ padding: '32px 20px', maxWidth: 760, margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: 1.5, fontSize: 12 }}>
            Whats-next
          </p>
          <h1 style={{ margin: '8px 0 0' }}>Wishlists and theme</h1>
        </div>

        <button type="button" onClick={toggleTheme}>
          Switch to {theme === 'dark' ? 'light' : 'dark'} mode
        </button>
      </header>

      <section style={{ marginTop: 32 }}>
        <h2>My Whats-next Wishlist</h2>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Movie or book title"
          />
          <button type="button" onClick={handleAddItem}>
            Add
          </button>
        </div>

        <ul style={{ paddingLeft: 18, marginTop: 24 }}>
          {wishlist.map((item) => (
            <li key={item.id} style={{ marginBottom: 12 }}>
              <span style={{ textDecoration: item.done ? 'line-through' : 'none', marginRight: 12 }}>
                {item.title}
              </span>
              <button type="button" onClick={() => dispatchWishlist({ type: 'toggled', id: item.id })}>
                {item.done ? 'Mark unwatched' : 'Mark watched'}
              </button>{' '}
              <button type="button" onClick={() => dispatchWishlist({ type: 'deleted', id: item.id })}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
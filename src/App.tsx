import { useState, type FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { added, toggled, deleted } from './features/wishlist/wishlistSlice'
import MovieSearch from './features/movies/MovieSearch'
import type { RootState, AppDispatch } from './app/store'
import ThemeToggle from './ThemeToggle'
import './App.css'

function App() {
  const wishlist = useSelector((state: RootState) => state.wishlist)
  const dispatch = useDispatch<AppDispatch>()
  const [newTitle, setNewTitle] = useState('')

  const completedCount = wishlist.filter((item) => item.done).length
  const remainingCount = wishlist.length - completedCount

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = newTitle.trim()

    if (!title) return

    dispatch(added(title))
    setNewTitle('')
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Whats-Next home">
          <span className="brand-mark" aria-hidden="true">W</span>
          <span>Whats-Next</span>
        </a>
        <ThemeToggle />
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">A cozy corner for good stories</p>
            <h1 id="hero-title">
              Your next favorite<br />
              <span>is waiting.</span>
            </h1>
            <p className="hero-description">
              Save the films and books your friends keep recommending, then
              settle in and pick something lovely when the mood is right.
            </p>
          </div>

          <div className="hero-stats" aria-label="Wishlist summary">
            <div className="stat-card">
              <span className="stat-value">{remainingCount}</span>
              <span className="stat-label">Still waiting</span>
            </div>
            <div className="stat-divider" aria-hidden="true" />
            <div className="stat-card">
              <span className="stat-value">{completedCount}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </section>

        <MovieSearch
          wishlistTitles={wishlist.map((item) => item.title)}
          onAddMovie={(title) => dispatch(added(title))}
        />

        <section className="wishlist-card card bg-base-100" aria-labelledby="wishlist-title">
          <div className="card-heading">
            <div>
              <p className="section-kicker">Saved for later</p>
              <h2 id="wishlist-title">Up next</h2>
            </div>
            <span className="item-count badge badge-soft">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <form className="add-form" onSubmit={handleSubmit}>
            <label htmlFor="new-title">Add a movie or book</label>
            <div className="input-row">
              <input
                id="new-title"
                className="input input-bordered"
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                placeholder="Try “The Left Hand of Darkness”"
                autoComplete="off"
              />
              <button className="add-button btn btn-primary" type="submit">
                <span aria-hidden="true">+</span>
                Add to list
              </button>
            </div>
          </form>

          {wishlist.length === 0 ? (
            <div className="empty-state">
              <div className="empty-illustration" aria-hidden="true">
                <span>✦</span>
              </div>
              <h3>Your cozy queue starts here</h3>
              <p>Add a recommendation above and keep something good waiting for later.</p>
            </div>
          ) : (
            <ul className="wishlist-list">
              {wishlist.map((item) => (
                <li className={item.done ? 'wishlist-item is-done' : 'wishlist-item'} key={item.id}>
                  <button
                    className="status-button btn btn-square btn-sm"
                    type="button"
                    onClick={() => dispatch(toggled(item.id))}
                    aria-label={`${item.done ? 'Mark as not completed' : 'Mark as completed'}: ${item.title}`}
                    aria-pressed={item.done}
                  >
                    <span aria-hidden="true">{item.done ? '✓' : ''}</span>
                  </button>
                  <span className="item-title">{item.title}</span>
                  <button
                    className="delete-button btn btn-ghost btn-sm"
                    type="button"
                    onClick={() => dispatch(deleted(item.id))}
                    aria-label={`Delete ${item.title}`}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="card-note">
            <span aria-hidden="true">✓</span>
            Saved on this device · Press Enter to add quickly.
          </div>
        </section>
      </main>

      <footer>
        <p>Made for slow evenings, warm drinks, and good recommendations.</p>
        <span>Whats-Next · 2026</span>
      </footer>
    </div>
  )
}

export default App

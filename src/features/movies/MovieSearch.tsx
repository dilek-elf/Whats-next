import { useState, type FormEvent } from 'react'
import { searchMovies, type MovieSearchResult } from './itunesMovieSearch'

type MovieSearchProps = {
  wishlistTitles: string[]
  onAddMovie: (title: string) => void
}

type SearchStatus = 'idle' | 'loading' | 'success' | 'error'

function getReleaseYear(releaseDate?: string) {
  if (!releaseDate) return null
  return new Date(releaseDate).getFullYear()
}

export default function MovieSearch({ wishlistTitles, onAddMovie }: MovieSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<MovieSearchResult[]>([])
  const [status, setStatus] = useState<SearchStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const savedTitles = new Set(wishlistTitles.map((title) => title.toLocaleLowerCase()))

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const searchTerm = query.trim()

    if (!searchTerm) return

    setStatus('loading')
    setErrorMessage('')

    try {
      const movies = await searchMovies(searchTerm)
      setResults(movies)
      setStatus('success')
    } catch (error) {
      setResults([])
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section className="movie-search-card card bg-base-100" aria-labelledby="movie-search-title">
      <div className="movie-search-intro">
        <p className="section-kicker">A little discovery</p>
        <h2 id="movie-search-title">Find a film</h2>
        <p>Search the movie catalog, then save a title to your shortlist in one click.</p>
      </div>

      <form className="movie-search-form" onSubmit={handleSearch} role="search">
        <label htmlFor="movie-search">Movie title</label>
        <div className="movie-search-row">
          <input
            id="movie-search"
            className="input input-bordered"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for a movie…"
            autoComplete="off"
          />
          <button className="btn btn-neutral" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Searching…' : 'Search'}
          </button>
        </div>
      </form>

      <div className="search-feedback" aria-live="polite">
        {status === 'loading' && (
          <div className="search-loading">
            <span className="loading loading-spinner loading-sm" aria-hidden="true" />
            Looking through the catalog…
          </div>
        )}

        {status === 'error' && <p className="search-error alert alert-error">{errorMessage}</p>}

        {status === 'success' && results.length === 0 && (
          <div className="no-results">
            <span aria-hidden="true">?</span>
            <p>No movies found. Try another title or check the spelling.</p>
          </div>
        )}
      </div>

      {results.length > 0 && status === 'success' && (
        <div className="movie-results">
          {results.map((movie) => {
            const isSaved = savedTitles.has(movie.trackName.toLocaleLowerCase())
            const releaseYear = getReleaseYear(movie.releaseDate)

            return (
              <article className="movie-result" key={movie.trackId}>
                <div className="movie-poster">
                  {movie.artworkUrl100 ? (
                    <img src={movie.artworkUrl100} alt="" loading="lazy" decoding="async" />
                  ) : (
                    <span aria-hidden="true">Film</span>
                  )}
                </div>
                <div className="movie-details">
                  <h3>{movie.trackName}</h3>
                  <p>
                    {[releaseYear, movie.primaryGenreName, movie.contentAdvisoryRating]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                  {movie.trackViewUrl && (
                    <a href={movie.trackViewUrl} target="_blank" rel="noreferrer">
                      View on Apple TV <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
                <button
                  className={isSaved ? 'save-movie-button is-saved btn btn-sm btn-ghost' : 'save-movie-button btn btn-sm btn-outline'}
                  type="button"
                  disabled={isSaved}
                  onClick={() => onAddMovie(movie.trackName)}
                  aria-label={isSaved ? `${movie.trackName} is already saved` : `Add ${movie.trackName} to wishlist`}
                >
                  {isSaved ? 'Saved' : '+ Add'}
                </button>
              </article>
            )
          })}
          <p className="search-attribution">Movie data provided by the iTunes Search API.</p>
        </div>
      )}
    </section>
  )
}

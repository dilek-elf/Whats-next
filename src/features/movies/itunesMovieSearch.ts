export type MovieSearchResult = {
  trackId: number
  trackName: string
  releaseDate?: string
  primaryGenreName?: string
  contentAdvisoryRating?: string
  artworkUrl100?: string
  trackViewUrl?: string
}

type MovieSearchResponse = {
  resultCount: number
  results: MovieSearchResult[]
}

let requestCount = 0

export function searchMovies(term: string): Promise<MovieSearchResult[]> {
  return new Promise((resolve, reject) => {
    requestCount += 1
    const callbackName = `whatsNextMovieSearch${Date.now()}${requestCount}`
    const script = document.createElement('script')
    const globalWindow = window as unknown as Record<string, unknown>

    const cleanup = () => {
      script.remove()
      delete globalWindow[callbackName]
    }

    const timeout = window.setTimeout(() => {
      cleanup()
      reject(new Error('The movie search took too long. Please try again.'))
    }, 8000)

    globalWindow[callbackName] = (response: MovieSearchResponse) => {
      window.clearTimeout(timeout)
      cleanup()
      resolve(Array.isArray(response.results) ? response.results : [])
    }

    script.onerror = () => {
      window.clearTimeout(timeout)
      cleanup()
      reject(new Error('Movie search is unavailable right now. Please try again.'))
    }

    const parameters = new URLSearchParams({
      term,
      media: 'movie',
      entity: 'movie',
      country: 'US',
      limit: '6',
      callback: callbackName,
    })

    script.src = `https://itunes.apple.com/search?${parameters.toString()}`
    document.head.append(script)
  })
}

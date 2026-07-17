import type { WishlistItem } from './wishlistSlice'

const STORAGE_KEY = 'whats-next:wishlist'
const STORAGE_VERSION = 1
const MAX_SAVED_ITEMS = 200

type StoredWishlist = {
  version: number
  items: WishlistItem[]
}

function isWishlistItem(value: unknown): value is WishlistItem {
  if (!value || typeof value !== 'object') return false

  const item = value as Record<string, unknown>

  return (
    typeof item.id === 'number' &&
    Number.isFinite(item.id) &&
    typeof item.title === 'string' &&
    item.title.trim().length > 0 &&
    typeof item.done === 'boolean'
  )
}

export function loadWishlist(): WishlistItem[] {
  if (typeof window === 'undefined') return []

  try {
    const savedValue = localStorage.getItem(STORAGE_KEY)
    if (!savedValue) return []

    const storedWishlist = JSON.parse(savedValue) as Partial<StoredWishlist>

    if (storedWishlist.version !== STORAGE_VERSION || !Array.isArray(storedWishlist.items)) {
      return []
    }

    return storedWishlist.items
      .filter(isWishlistItem)
      .slice(0, MAX_SAVED_ITEMS)
      .map((item) => ({ ...item, title: item.title.trim().slice(0, 200) }))
  } catch {
    return []
  }
}

export function saveWishlist(items: WishlistItem[]) {
  if (typeof window === 'undefined') return

  try {
    const storedWishlist: StoredWishlist = {
      version: STORAGE_VERSION,
      items: items.slice(0, MAX_SAVED_ITEMS),
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedWishlist))
  } catch {
    // The app remains usable when storage is unavailable or full.
  }
}

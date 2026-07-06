import type { ReactNode } from 'react'
import { useReducer } from 'react'
import { WishlistContext, WishlistDispatchContext, type WishlistAction, type WishlistItem } from './wishlist-context'

function wishlistReducer(items: WishlistItem[], action: WishlistAction): WishlistItem[] {
  if (action.type === 'added') {
    return [...items, { id: Date.now(), title: action.title, done: false }]
  }
  if (action.type === 'toggled') {
    return items.map((item) => (item.id === action.id ? { ...item, done: !item.done } : item))
  }
  if (action.type === 'deleted') {
    return items.filter((item) => item.id !== action.id)
  }
  return items
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(wishlistReducer, [])

  return (
    <WishlistContext.Provider value={items}>
      <WishlistDispatchContext.Provider value={dispatch}>
        {children}
      </WishlistDispatchContext.Provider>
    </WishlistContext.Provider>
  )
}
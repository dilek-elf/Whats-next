import { createContext } from 'react'

export type WishlistItem = { id: number; title: string; done: boolean }

export type WishlistAction =
  | { type: 'added'; title: string }
  | { type: 'toggled'; id: number }
  | { type: 'deleted'; id: number }

export const WishlistContext = createContext<WishlistItem[] | null>(null)
export const WishlistDispatchContext = createContext<React.Dispatch<WishlistAction> | null>(null)
import { useContext } from 'react'
import { WishlistContext, WishlistDispatchContext } from './wishlist-context'

export function useWishlist() {
  const items = useContext(WishlistContext)

  if (!items) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }

  return items
}

export function useWishlistDispatch() {
  const dispatch = useContext(WishlistDispatchContext)

  if (!dispatch) {
    throw new Error('useWishlistDispatch must be used within WishlistProvider')
  }

  return dispatch
}
import { createContext, useContext } from 'react';

export type WishlistItem = { id: number; title: string; done: boolean };

export type Action =
  | { type: 'added'; title: string }
  | { type: 'toggled'; id: number }
  | { type: 'deleted'; id: number };

export function wishlistReducer(items: WishlistItem[], action: Action): WishlistItem[] {
  if (action.type === 'added') {
    return [...items, { id: Date.now(), title: action.title, done: false }];
  }
  if (action.type === 'toggled') {
    return items.map((item) =>
      item.id === action.id ? { ...item, done: !item.done } : item
    );
  }
  if (action.type === 'deleted') {
    return items.filter((item) => item.id !== action.id);
  }
  return items;
}

export const WishlistContext = createContext<WishlistItem[]>([]);
export const WishlistDispatchContext = createContext<React.Dispatch<Action> | null>(null);

export function useWishlist() {
  return useContext(WishlistContext);
}

export function useWishlistDispatch() {
  const dispatch = useContext(WishlistDispatchContext);
  if (!dispatch) throw new Error('useWishlistDispatch must be used within WishlistProvider');
  return dispatch;
}

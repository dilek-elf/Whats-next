// WishlistProvider component only — non-component logic moved to wishlistStore
import { useReducer } from 'react';
import { wishlistReducer, WishlistContext, WishlistDispatchContext } from './wishlistStore';

export default function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(wishlistReducer, []);
  return (
    <WishlistContext.Provider value={items}>
      <WishlistDispatchContext.Provider value={dispatch}>
        {children}
      </WishlistDispatchContext.Provider>
    </WishlistContext.Provider>
  );
}
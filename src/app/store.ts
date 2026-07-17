import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import { loadWishlist, saveWishlist } from '../features/wishlist/wishlistStorage';

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
  },
  preloadedState: {
    wishlist: loadWishlist(),
  },
});

let previousWishlist = store.getState().wishlist;

store.subscribe(() => {
  const nextWishlist = store.getState().wishlist;

  if (nextWishlist === previousWishlist) return;

  previousWishlist = nextWishlist;
  saveWishlist(nextWishlist);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

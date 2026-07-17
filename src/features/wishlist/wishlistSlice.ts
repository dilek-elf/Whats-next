import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type WishlistItem = { id: number; title: string; done: boolean };

const initialState: WishlistItem[] = [];

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    added: (state, action: PayloadAction<string>) => {
      state.push({ id: Date.now(), title: action.payload, done: false });
    },
    toggled: (state, action: PayloadAction<number>) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) item.done = !item.done;
    },
    deleted: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { added, toggled, deleted } = wishlistSlice.actions;
export default wishlistSlice.reducer;

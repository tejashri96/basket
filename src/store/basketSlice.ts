import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductId } from '../products';
import { Quantities } from '../pricing';

interface BasketState {
  quantities: Quantities;
}

const initialState: BasketState = { quantities: {} };

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ProductId>) {
      const id = action.payload;
      state.quantities[id] = (state.quantities[id] ?? 0) + 1;
    },
    removeItem(state, action: PayloadAction<ProductId>) {
      const id = action.payload;
      const newQuantity = (state.quantities[id] ?? 0) - 1;
      if (newQuantity > 0) {
        state.quantities[id] = newQuantity;
      } else {
        delete state.quantities[id]; // remove the product at 0
      }
    },
  },
});

export const { addItem, removeItem } = basketSlice.actions;
export default basketSlice.reducer;

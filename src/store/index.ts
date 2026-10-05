import { configureStore, createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import basketReducer from './basketSlice';
import { calculateBill } from '../pricing';

export const store = configureStore({ reducer: { basket: basketReducer } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Same hooks as react-redux, but with our types
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const selectQuantities = (state: RootState) => state.basket.quantities;

// The bill is worked out from the quantities, so we don't store it twice
export const selectBill = createSelector(selectQuantities, calculateBill);

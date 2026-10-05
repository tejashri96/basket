import { describe, expect, it } from 'vitest';
import reducer, { addItem, removeItem } from './basketSlice';

const emptyState = reducer(undefined, { type: 'start' });

describe('basketSlice', () => {
  it('adds a product', () => {
    expect(reducer(emptyState, addItem('milk')).quantities.milk).toBe(1);
  });

  it('removes the product when the quantity reaches zero', () => {
    const state = reducer(reducer(emptyState, addItem('milk')), removeItem('milk'));
    expect(state.quantities.milk).toBeUndefined();
  });
});

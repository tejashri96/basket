import { describe, expect, it } from 'vitest';
import { calculateBill } from './pricing';

describe('calculateBill', () => {
  it('is zero for an empty basket', () => {
    const bill = calculateBill({});
    expect(bill.subTotal).toBe(0);
    expect(bill.totalAmount).toBe(0);
  });

  it('matches the sample: 1 soup, 3 bread, 1 butter', () => {
    const bill = calculateBill({ soup: 1, bread: 3, butter: 1 });
    expect(bill.subTotal).toBe(510);
    expect(bill.totalSavings).toBe(95);
    expect(bill.totalAmount).toBe(415);
  });

  it('gives every second cheese free', () => {
    expect(calculateBill({ cheese: 3 }).totalSavings).toBe(90);
    expect(calculateBill({ cheese: 4 }).totalSavings).toBe(180);
  });

  it('gives half price only to as many breads as soups', () => {
    expect(calculateBill({ soup: 2, bread: 1 }).totalSavings).toBe(55);
    expect(calculateBill({ soup: 1, bread: 2 }).totalSavings).toBe(55);
  });

  it('takes a third off each butter', () => {
    expect(calculateBill({ butter: 2 }).totalSavings).toBe(80);
  });
});

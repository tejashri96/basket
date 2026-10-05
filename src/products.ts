export type ProductId = 'bread' | 'milk' | 'cheese' | 'soup' | 'butter';

export interface Product {
  id: ProductId;
  name: string;
  price: number;
}

export const products: Product[] = [
  { id: 'bread', name: 'Bread', price: 110 },
  { id: 'milk', name: 'Milk', price: 50 },
  { id: 'cheese', name: 'Cheese', price: 90 },
  { id: 'soup', name: 'Soup', price: 60 },
  { id: 'butter', name: 'Butter', price: 120 },
];

// Turns 110 into "£1.10"
export const toPounds = (pence: number): string => `£${(pence / 100).toFixed(2)}`;

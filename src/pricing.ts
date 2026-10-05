import { products, Product, ProductId } from './products';


export type Quantities = Partial<Record<ProductId, number>>;

interface Offer {
  text: string;
  getSavings: (quantities: Quantities) => number; // saving in pence
}

const priceOf = (id: ProductId) => products.find((product) => product.id === id)!.price;
const countOf = (quantities: Quantities, id: ProductId) => quantities[id] ?? 0;


const offers: Partial<Record<ProductId, Offer>> = {
  cheese: {
    text: 'Buy a Cheese, get a second Cheese free',
    getSavings: (q) => Math.floor(countOf(q, 'cheese') / 2) * priceOf('cheese'),
  },
  bread: {
    text: 'Buy a Soup, get a half price Bread',
    getSavings: (q) => Math.min(countOf(q, 'soup'), countOf(q, 'bread')) * (priceOf('bread') / 2),
  },
  butter: {
    text: 'A third off Butter',
    getSavings: (q) => countOf(q, 'butter') * Math.round(priceOf('butter') / 3),
  },
};

export interface BasketLine {
  product: Product;
  quantity: number;
  itemPrice: number; 
  saving: number;
  offerText?: string;
  itemCost: number;
}

export interface Bill {
  lines: BasketLine[];
  subTotal: number;
  totalSavings: number;
  totalAmount: number;
}

export function calculateBill(quantities: Quantities): Bill {
  const lines = products
    .filter((product) => countOf(quantities, product.id) > 0)
    .map((product) => {
      const quantity = countOf(quantities, product.id);
      const itemPrice = product.price * quantity;
      const offer = offers[product.id];
      const saving = offer ? offer.getSavings(quantities) : 0;
      return {
        product,
        quantity,
        itemPrice,
        saving,
        offerText: saving > 0 ? offer?.text : undefined,
        itemCost: itemPrice - saving,
      };
    });

  const subTotal = lines.reduce((sum, line) => sum + line.itemPrice, 0);
  const totalSavings = lines.reduce((sum, line) => sum + line.saving, 0);
  return { lines, subTotal, totalSavings, totalAmount: subTotal - totalSavings };
  }
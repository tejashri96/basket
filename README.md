# Shopping Basket – React + Redux Toolkit + TypeScript

Pick products and get the bill: subtotal before offers, each special offer with its saving, and the final total.

## Special offers
- Buy a Cheese, get a second Cheese free
- Buy a Soup, get a half price Bread
- A third off Butter

## Tech
React, Redux Toolkit, TypeScript, Tailwind CSS, Vite, Vitest, Firebase Firestore

## Run
    npm install
    npm run dev
    npm test

## Save orders to Firestore (optional)
Copy `.env.example` to `.env`, fill in your Firebase values, then click **Save order** in the basket.

## Notes
- Prices are stored in pence (110 = £1.10) to avoid decimal errors.
- Redux holds only the quantities; the bill is calculated from them with a selector.

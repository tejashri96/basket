import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { Bill } from '../pricing';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


export async function saveOrder(bill: Bill): Promise<void> {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error('Firebase is not set up. Add your settings to the .env file.');
  }
  const database = getFirestore(initializeApp(firebaseConfig));

  await addDoc(collection(database, 'orders'), {
    items: bill.lines.map((line) => ({
      name: line.product.name,
      quantity: line.quantity,
      itemCost: line.itemCost,
    })),
    offers: bill.lines
      .filter((line) => line.saving > 0)
      .map((line) => ({ offer: line.offerText, saving: line.saving })),
    subTotal: bill.subTotal,
    totalSavings: bill.totalSavings,
    totalAmount: bill.totalAmount,
    createdAt: serverTimestamp(),
  });
}

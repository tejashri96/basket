import { useState } from 'react';
import { toPounds } from '../products';
import { addItem, removeItem } from '../store/basketSlice';
import { selectBill, useAppDispatch, useAppSelector } from '../store';
import { saveOrder } from '../services/orders';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export default function Basket() {
  const dispatch = useAppDispatch();
  const bill = useAppSelector(selectBill);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  async function handleSave() {
    setSaveStatus('saving');
    try {
      await saveOrder(bill);
      setSaveStatus('saved');
    } catch {
      setSaveStatus('error');
    }
  }

  return (
    <div className="rounded bg-white p-4 shadow">
      <h2 className="border-b pb-1 text-3xl">Basket</h2>

      {bill.lines.length === 0 && <p className="py-6 text-center text-gray-400">Your basket is empty</p>}

      {bill.lines.map(({ product, quantity, itemPrice, saving, offerText, itemCost }) => (
        <div key={product.id} className="border-b py-3">
          <div className="flex items-center justify-between">
            <span>{product.name}</span>
            <span className="text-gray-500">{toPounds(product.price)}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => dispatch(addItem(product.id))} className="rounded bg-blue-400 px-2 text-white">+</button>
              <span>{quantity}</span>
              <button onClick={() => dispatch(removeItem(product.id))} className="rounded border border-blue-400 px-2 text-blue-500">-</button>
            </div>
          </div>

          <p className="mt-2 border-b pb-1 text-right text-sm text-gray-500">
            Item price {toPounds(product.price)} * {quantity} = {toPounds(itemPrice)}
          </p>

          {saving > 0 && (
            <p className="border-b py-1 text-right text-sm text-red-500">
              Savings {toPounds(saving)} <span className="text-xs text-gray-400">({offerText})</span>
            </p>
          )}

          <p className="pt-2 text-right text-sm">Item cost {toPounds(itemCost)}</p>
        </div>
      ))}

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between"><span>Sub Total:</span><span>{toPounds(bill.subTotal)}</span></div>
        <div className="flex justify-between"><span>Savings:</span><span>{toPounds(bill.totalSavings)}</span></div>
        <div className="flex justify-between font-bold"><span>Total Amount:</span><span>{toPounds(bill.totalAmount)}</span></div>
      </div>

      {bill.lines.length > 0 && (
        <div className="mt-4">
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving' || saveStatus === 'saved'}
            className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700 disabled:opacity-60"
          >
            {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Order saved' : 'Save order'}
          </button>
          {saveStatus === 'error' && <p className="mt-2 text-center text-sm text-red-500">Could not save. Check the Firebase settings in .env</p>}
        </div>
      )}
    </div>
  );
}

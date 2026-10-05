import { products, toPounds } from '../products';
import { addItem } from '../store/basketSlice';
import { selectQuantities, useAppDispatch, useAppSelector } from '../store';

export default function ProductList() {
  const dispatch = useAppDispatch();
  const quantities = useAppSelector(selectQuantities);

  return (
    <div className="rounded bg-white p-4 shadow">
      <h2 className="border-b pb-1 text-3xl">Products</h2>

      {products.map((product) => {
        const inBasket = (quantities[product.id] ?? 0) > 0;

        return (
          <div key={product.id} className="flex items-center justify-between border-b py-3">
            <span>{product.name}</span>
            <div className="flex items-center gap-4">
              <span className="text-gray-500">{toPounds(product.price)}</span>
              
              <button
                onClick={() => dispatch(addItem(product.id))}
                disabled={inBasket}
                className={`rounded px-3 py-2 text-white ${inBasket ? 'bg-gray-400' : 'bg-blue-400 hover:bg-blue-500'}`}
              >
                Add
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

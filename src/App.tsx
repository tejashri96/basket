import ProductList from './components/ProductList';
import Basket from './components/Basket';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
        <ProductList />
        <Basket />
      </div>
    </div>
  );
}

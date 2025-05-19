'use client'
import React, {useEffect} from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '@/redux/slices/productsSlice';
import { addToCart } from '@/redux/slices/cartSlice';

const page = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, status } = useSelector((state) => state.products);
  const cartItems = useSelector(state => state.cart.items);
  const currentItem = cartItems.find(item => item.id === Number(id));
  const quantity = currentItem ? currentItem.quantity : 0;

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (quantity < 5 && selectedProduct) {
      dispatch(addToCart(selectedProduct));
    }
  };

  if (status === 'loading' || !selectedProduct) {
    return (
      <div className="mt-5 px-4">
        <nav className="text-base md:text-2xl mb-4">
          <ol className="flex space-x-2 text-gray-600">
            <li>
              <Link href="/" className="hover:underline">Inicio</Link>
            </li>
            <li>/</li>
            <li className="text-gray-400">Cargando producto...</li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="w-full h-[400px] bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-full h-full bg-gray-300" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-gray-300 animate-pulse rounded"></div>
            <div className="h-4 w-1/3 bg-gray-300 animate-pulse rounded"></div>
            <div className="flex space-x-4">
              <div className="h-4 w-1/4 bg-gray-300 animate-pulse rounded"></div>
              <div className="h-4 w-1/4 bg-gray-300 animate-pulse rounded"></div>
            </div>
            <div className="h-6 w-1/4 bg-gray-300 animate-pulse rounded"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-300 animate-pulse rounded"></div>
              <div className="h-4 w-full bg-gray-300 animate-pulse rounded"></div>
              <div className="h-4 w-2/3 bg-gray-300 animate-pulse rounded"></div>
            </div>
            <div className="h-10 w-1/3 bg-gray-300 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="mt-5 px-4">
        <nav className="text-base md:text-2xl mb-4">
          <ol className="flex space-x-2 text-gray-600">
            <li>
              <Link href="/" className="hover:underline">Inicio</Link>
            </li>
            <li>/</li>
            <li className="text-gray-400">Error al cargar el producto</li>
          </ol>
        </nav>
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold text-red-600">Error al cargar el producto</h2>
          <p className="mt-2 text-gray-600">Por favor, intenta nuevamente más tarde</p>
          <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 px-4">
      <nav className="text-base md:text-2xl mb-4">
        <ol className="flex space-x-2 text-gray-600">
          <li>
            <Link href="/" className="hover:underline">Inicio</Link>
          </li>
          <li>/</li>
          <li className="text-gray-400">{selectedProduct.title}</li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            className="w-full max-h-[400px] object-contain"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-semibold">{selectedProduct.title}</h1>
          <p className="text-gray-500">Categoría: {selectedProduct.category}</p>
          <div className="flex space-x-2">
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
              Calificación: {selectedProduct.rating?.rate}
            </span>
            <span className="bg-gray-500 text-white px-2 py-1 rounded text-sm">
              Reseñas: {selectedProduct.rating?.count}
            </span>
          </div>
          <h2 className="text-2xl text-blue-600 font-bold">${selectedProduct.price}</h2>
          <p>{selectedProduct.description}</p>

          {quantity >= 5 && (
            <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded border border-yellow-300">
              Limitado a 5 unidades
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={quantity >= 5}
            className={`mt-2 px-6 py-2 text-white rounded font-medium transition ${quantity >= 5 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {quantity > 0
              ? `Añadir al carrito (${quantity}/5)`
              : 'Añadir al carrito'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default page
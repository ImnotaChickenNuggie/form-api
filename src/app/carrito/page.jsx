"use client"
import React from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, removeFromCart } from '@/redux/slices/cartSlice';

const page = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  if (cartItems.length === 0) {
    return (
      <div className="py-5 text-center flex flex-col">
        <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded mb-4 inline-block">
          Tu carrito está vacío
        </div>
        <Link href="/" passHref>
          <button className="mt-2 hover:cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Continuar comprando
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-4 px-4">
      <h2 className="text-2xl font-semibold mb-4">Artículos en tu carrito:</h2>

      <div className="grid md:grid-cols-12 gap-6">
        {/* Lista de productos */}
        <div className="md:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 shadow-sm">
              <div className="grid md:grid-cols-12 gap-4 items-center">
                {/* Imagen */}
                <div className="md:col-span-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full max-h-[100px] object-contain"
                  />
                </div>

                {/* Información del producto */}
                <div className="md:col-span-6">
                  <h5 className="text-lg font-medium">{item.title}</h5>
                  <p className="text-sm text-gray-500">Categoría: {item.category}</p>
                  <p className="text-primary font-bold">${item.price}</p>
                </div>

                {/* Controles de cantidad */}
                <div className="md:col-span-4 flex justify-end items-center">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => dispatch({ type: 'cart/removeFromCart', payload: item.id })}
                      className="px-2 py-1 border border-blue-600 text-blue-600 rounded hover:cursor-pointer hover:bg-blue-50 disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="min-w-[20px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => dispatch({ type: 'cart/addToCart', payload: item })}
                      className="px-2 py-1 border border-blue-600 text-blue-600 rounded hover:cursor-pointer hover:bg-blue-50 disabled:opacity-50"
                      disabled={item.quantity >= 5}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen del pedido */}
        <div className="md:col-span-4">
          <div className="border rounded-lg p-6 shadow-sm">
            <h4 className="text-xl font-semibold mb-4">Resumen del pedido</h4>
            <hr className="mb-4" />
            <div className="flex justify-between mb-4 text-lg">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link href='/datos-personales' className="w-full py-2 px-4 bg-blue-600 text-xl text-white rounded hover:bg-blue-700 transition">
              Proceder al pago
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
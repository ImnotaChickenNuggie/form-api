"use client"
import React, { useState, useEffect } from 'react';
import { StarRating } from "baseui/rating";
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const personalData = useSelector((state) => state.personalData);
  const cart = useSelector((state) => state.cart);

  const handleSubmit = async () => {
    const orderData = {
      ...personalData,
      items: cart.items,
      rating,
      orderDate: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // Limpiar todos los datos de Redux
        dispatch({ type: 'cart/resetCart' });
        dispatch({ type: 'personalData/resetPersonalData' });
        dispatch({ type: 'paymentData/resetPaymentData' });
        
        router.push('/pedimientos');
      }
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
    }
  };

  return (
    <>
      <Head>
        <title>FakeStore | Confirmación de pedido exitoso</title>
      </Head>
      <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50'>
        <div className='max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-green-600 mb-4'>
              ¡Gracias por tu compra!
            </h1>
            <p className='text-gray-600 mb-6'>
              Tu pedido ha sido procesado exitosamente. Estamos preparando tu envío y lo enviaremos a la dirección proporcionada.
            </p>
          </div>

          <div className='mb-8'>
            <h2 className='text-xl font-semibold mb-4 text-center'>
              ¿Qué te pareció tu experiencia de compra?
            </h2>
            <div className='flex justify-center'>
              <StarRating
                numItems={5}
                onChange={({ value }) => setRating(value)}
                size={22}
                value={rating}
              />
            </div>
          </div>

          <div className='text-center'>
            <button
              onClick={handleSubmit}
              className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 hover:cursor-pointer'
            >
              Ver mis pedidos
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
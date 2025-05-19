"use client"
import React, { useEffect, useState } from 'react';

const page = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3001/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error al cargar los pedidos:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Pedidos</h1>
      
      {orders.map((order, index) => (
        <div key={index} className='mb-6 p-4 border rounded'>
          <h2 className='font-bold mb-2'>Pedido #{index + 1}</h2>
          
          <div className='mb-2'>
            <h3 className='font-semibold'>Datos del Cliente:</h3>
            <p>Nombre: {order.firstName} {order.lastName}</p>
            <p>Email: {order.email}</p>
            <p>Teléfono: {order.phone}</p>
            <p>Estado: {order.state[0]?.label}</p>
            <p>Código Postal: {order.postalCode}</p>
          </div>

          <div className='mb-2'>
            <h3 className='font-semibold'>Productos:</h3>
            {order.items.map((item, itemIndex) => (
              <div key={itemIndex} className='ml-4'>
                <p>Producto: {item.title}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: ${item.price}</p>
              </div>
            ))}
          </div>

          <div>
            <p>Calificación: {order.rating}/5</p>
            <p>Fecha: {new Date(order.orderDate).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
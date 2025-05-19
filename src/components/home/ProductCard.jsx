import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/slices/cartSlice';

const ProductCard = ({ id, image, title, category, price }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const currentItem = cartItems.find(item => item.id === id);
    const quantity = currentItem ? currentItem.quantity : 0;
    // Funcion para agregar productos al carrito hasta un máximo de 5
    const handleAddToCart = () => {
        if (quantity < 5) {
            dispatch(addToCart({ id, image, title, category, price }));
        }
    };

    return (
        <div className="flex flex-col h-full border rounded-lg shadow-sm overflow-hidden hover:bg-stone-100 transition-all duration-300">
            <Link href={`/detalle/${id}`} className="block">
                <div className="relative w-full h-[200px] p-4">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-contain p-2 rounded-2xl"
                    />
                </div>
            </Link>
            <div className="flex flex-col flex-1 p-4">
                <h5 className="text-lg font-semibold truncate">{title}</h5>
                <h6 className="text-sm text-gray-500 mb-2">{category}</h6>
                <p className="text-primary font-bold text-2xl">${price}</p>

                {quantity >= 5 && (
                    <div className="bg-yellow-100 text-yellow-800 text-sm px-3 py-2 rounded mb-2 flex items-center gap-2">
                        Limitado a 5 unidades
                        <i className="bi bi-exclamation-triangle"></i>
                    </div>
                )}

                <button
                    onClick={handleAddToCart}
                    disabled={quantity >= 5}
                    className={`mt-auto px-4 py-2 rounded text-white font-medium transition-all duration-500 ${quantity >= 5
                        ? 'bg-gray-400 hover:cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 hover:cursor-pointer'
                        }`}
                >
                    {quantity > 0 ? `Agregar (${quantity}/5)` : 'Agregar al carrito'}
                </button>
            </div>
        </div>
    )
}

export default ProductCard
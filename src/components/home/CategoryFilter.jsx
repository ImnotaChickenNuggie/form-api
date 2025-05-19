import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const SelectCategory = () => {
  const dispatch = useDispatch();
  const { items, selectedCategory } = useSelector((state) => state.products);
  const categories = [...new Set(items.map(product => product.category))];

  //Cambia la categoría seleccionada 
  const handleCategoryClick = (category) => {
    dispatch({ type: 'products/setSelectedCategory', payload: category });
  };


  return (
    <div className="mb-4">
      <h5 className="mb-3 text-lg font-bold">Categorías:</h5>
      <div className="flex flex-wrap gap-3">
        <button
          className={`p-4 rounded-lg hover:cursor-pointer ${selectedCategory === 'all' ? 'bg-black text-white' : 'border border-black text-black'}`}
          onClick={() => handleCategoryClick('all')}
        >
          Todos los productos
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`p-4 rounded-lg hover:cursor-pointer ${selectedCategory === category ? 'bg-black text-white' : 'border border-black text-black'}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SelectCategory
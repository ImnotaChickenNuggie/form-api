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
      <h5 className="mb-3">Categorías:</h5>
      <div className="d-flex flex-wrap gap-2">
        <button
          className={`p-4 rounded-lg ${selectedCategory === 'all' ? 'bg-sky-400' : 'border border-blue-500'}`}
          onClick={() => handleCategoryClick('all')}
        >
          Todos los productos
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`p-4 rounded-lg ${selectedCategory === category ? 'bg-sky-400' : 'border border-blue-500'}`}
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
"use client";
import { useEffect } from "react";
import { Button } from "baseui/button";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, selectFilteredProducts } from "@/redux/slices/productsSlice";
import ProductCard from "@/components/home/ProductCard";
import CategoryFilter from "@/components/home/CategoryFilter";

export default function Home() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.products);
  const filteredProducts = useSelector(selectFilteredProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      console.log("Products fetched successfully:", filteredProducts);
    }
  }, [status, filteredProducts]);


  return (
    <div className="flex flex-col p-10">
      {status === 'loading' ? (<><span>cargando...</span></>)
        : status === 'failed' ? (<>
          <span>ocurrio error</span>
        </>)
          : (<>
            <h1 className="mb-4 text-center font-bold text-3xl py-10">Conoce nuestros productos exclusivos</h1>
            <CategoryFilter />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.id}>
                    <ProductCard
                      id={product.id}
                      image={product.image}
                      title={product.title}
                      category={product.category}
                      price={product.price}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full">
                  <h3 className="text-center text-3xl font-bold">
                    Actualmente no hay productos disponibles, estamos trabajando en ello.
                  </h3>
                </div>
              )}
            </div>
          </>)}
    </div>
  );
}

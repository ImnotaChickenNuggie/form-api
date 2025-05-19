import React from 'react'
import '@/styles/loader.css'

// Este componente se muestra como un loader mientras se cargan los productos
const Loader = () => {
    return (
        <div className="flex flex-col justify-center mx-auto pt-16 vh-100">
            <span className="loader"></span>
            <h2 className="mt-3 text-center text-3xl font-bold">Cargando ...</h2>
        </div>
    )
}

export default Loader
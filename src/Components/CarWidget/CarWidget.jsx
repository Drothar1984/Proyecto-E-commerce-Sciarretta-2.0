//funcion primaria del carrito de compras
import React from 'react';
//agregamos la importacion del icono carrito, poniendo entre {el mismo nombre del elemento}, desde 'react-icons/bs' (bs porque son las dos primeras letras del elemento) BsFillCartCheckFill = bs
import { BsFillCartCheckFill } from 'react-icons/bs';
import { useCartContext } from '../Context/CartContext';



const CarWidget = () => {
    const { totalProducts, cart } = useCartContext();

    return (
        <div className='container'>
            <button><BsFillCartCheckFill/></button>
            <span className='position-absolute top-3 start-80 translate-middle badge rounded-pill bg-danger'>
                {totalProducts()}
            </span>
        </div>
    );
};

export default CarWidget;
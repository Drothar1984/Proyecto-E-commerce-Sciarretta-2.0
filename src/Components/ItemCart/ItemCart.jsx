import React from 'react'
import { useCartContext } from '../Context/CartContext';

const ItemCart = ({ product }) => {
    const{ removeProduct } = useCartContext();

  return (
    <div className='itemCart'>
        <div>
          <img className = "itemCart-img" src = {product.img} alt= {product.title}/>
        </div>
        
        <div>
            <p>Titulo: {product.title}</p>
            <p>Cantidad: {product.quantity}</p>
            <p>Precio unitario: {product.price}</p>
            <p>Subtotal: {product.quantity * product.price}</p>
            <button onClick={() => removeProduct(product.id)}>Eliminar</button>
        </div>
        
    </div>
  )
}

export default ItemCart
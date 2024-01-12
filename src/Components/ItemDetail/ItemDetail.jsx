import React, { useState } from 'react'
import { useCartContext } from '../Context/CartContext'
import ItemCount from '../ItemCount/ItemCount'
import {Link} from 'react-router-dom'

const ItemDetail = ({item}) => {

  const [goToCart, setGoToCart] = useState(false)
  const {addProduct} = useCartContext()
  const onAdd = (quantity) => {
    setGoToCart(true);
    addProduct(item, quantity)
  }
  
  return (
    
    <div className='row'>
        <div className='itemDetail'>
            <img src={item.img} max-width='150px' height= '250px' alt={item.title}/>
            <h3>{item.title}</h3>  
            <p>Detalle: {item.description}</p>
            <p>$ {item.price}</p>
            <p>cantidad: {item.stock}</p>            

            <div>          
              {goToCart ? <Link to='/cart'>Terminar compra</Link>: <ItemCount stock={10} initial = {1} onAdd={onAdd} />}              
            </div>

            <div>
              <Link to="/" className="terminarCom"> Seguir comprando </Link>
            </div>
          </div>
    </div>
  )
}

export default ItemDetail
//simulamos el componete de la presentacion

import React from 'react'
//importamos para que nos redirija 
import { Link } from 'react-router-dom'

const Item = ({item}) => {

  return (

    <Link to={'/item/' + item.id}>

        <div className="ProductCardReutilizable" style={{ maxWidth: '300px', maxHeight: 'auto', minWidth: '200px', minHeight: '200px'}}>

            <img src={item.img} style={{ maxWidth: '200px', maxHeight: '200px' }} alt={item.title}/>
            
            <div>

                <h4>{item.title}</h4>                            
                
                <p>Precio $ {item.price}</p>                
                <p>Tipo: {item.categoryId}</p>
                <button>Ver</button>

            </div>                

        </div>

    </Link>

  )
}

export default Item
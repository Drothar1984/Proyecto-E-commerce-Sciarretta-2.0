import React from 'react'
import Item from '../Item/Item'

//variable, con props, denominado en este momento item (ya desestructurado)
const ItemList = ({item}) => {

  return (
    <div className='contenedorCards'>

        {item.map(item => 
            
                <div key={item.id}>
                    
                    <Item item={item}/>
                    
                </div>
            
        )}
        

    </div>
  )
}

export default ItemList
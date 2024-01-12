import React, { useEffect, useState } from 'react'

const ItemCount = ({initial, stock, onAdd}) => {
    const [count, setCount] = useState(parseInt(initial));
    const decrease = () => {
        setCount (count - 1);
    };

    const increase = () => {
        setCount (count + 1);
    };

    useEffect(() => {
        setCount(parseInt(initial));
    }, [initial]);
  return (
    <div className='cont-contador'>
        <div className='cont-contador-botones'>
            {/* el boton se desabilita cuando el menor o igual a uno - al tocar el boton el numero baja */}
            <button disabled={count <= 1} onClick={decrease} > - </button>
            {/* muestra - el contador en si */}
            <span>{count}</span>
            {/* el boton se desabilita cuando el mayor o igual al stock - al tocar el boton el numero sube */}
            <button disabled={count >= stock} onClick={increase} > + </button>
        </div>
        <div>
            {/* un boton que esta desabilitado cuando el stock es menor o igual a 0 - al tocarlo agregara el numero que figura en el contador  */}
            <button disabled ={stock <= 0} onClick={() => onAdd(count)}>Agregar</button>
        </div>

    </div>
  )
}

export default ItemCount
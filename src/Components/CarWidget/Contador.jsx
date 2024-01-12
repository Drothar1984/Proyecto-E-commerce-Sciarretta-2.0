//uso del metodo useState ------------aun no implementado pero podria servir para cuando se vallan agregando objetos al carro

import {useState} from 'react'

const Contador = ({titulo , descripcion}) => {

    console.log(useState(0))    

    // variable [declaro el nombre , y la funcion modificadora]
    const [contador, setContador] = useState (0)
    
    
    //al tocar el like
    const handleLike = () => {
        //el setContador hace que se actualice 
        setContador(contador + 1)
    
    }

  return (
    <div>        
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
        <button onClick = {handleLike}>  {contador}  Like</button>
       
    </div>
  )
}

export default Contador
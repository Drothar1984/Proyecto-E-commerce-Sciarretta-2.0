//uso del metodo useState
//importamos unicamente el useState
import {useState} from 'react'
//declaramos una variable X = funcion flecha
const Suscripcion = () => {
    //variable [nombre inicial , modificador ] = incial (texto X)
    const [buttonText, setButtonTex] = useState ('Suscribete!!!')
    //retornamos un boton, que cuando lo toquen, se active el modificador y diga X, modificando el valor incial
    return (
        <div>
            <button 
                onClick={() => setButtonTex ('Gracias por Suscribirte!!')}>
                {buttonText}
            </button>
        </div>
    )
}

export default Suscripcion
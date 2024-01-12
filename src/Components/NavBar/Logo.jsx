//funcion secundaria - creacion del icono/logo 
import React from 'react';
//imporatacion de la imagen a usar
import whisky from '../../assets/img/whisky.png'

const Logo = () => {

    return (

        <div>
            <img src={whisky} alt='logo' width='50px' height= '50px' />
        </div>
    
    )

}

export default Logo
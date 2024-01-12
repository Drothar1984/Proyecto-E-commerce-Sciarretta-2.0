import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../Context/CartContext';
import ItemCart from '../ItemCart/ItemCart';
import Swal from 'sweetalert2';

const Cart = () => {
    //constante que va a consumir un estado (cart) y una funcion (totalprice) = y lo va a realizar de UseCartContext
    const {cart, totalPrice} = useCartContext();

    //si el estado o longitud es estrictamente igual a 0
    useEffect(() => {
        if (cart.length === 0) {
          // Si el carrito está vacío, muestra una alerta con SweetAlert2
          Swal.fire({
            icon: 'info',
            title: 'Carrito Vacío',
            text: 'No hay elementos agregados. ¡Hora de comprar!',
            showCancelButton: false,
            confirmButtonText: 'OK',
          }).then((result) => {
            // Redirecciona al usuario a la página de inicio al hacer clic en "OK"
            if (result.isConfirmed) {
              window.location.href = '/'; // Puedes ajustar la ruta según tu configuración
            }
          });
        }
      }, [cart]);
    //caso contrario de que no este vacio
    return (

        <div className="ProductCardReutilizable-cart-general">
            <div className="ProductCardReutilizable-cart">
                {/* se hace un map (transformado de cart . donde estan todos los productos) utilizando la funcion Itemcard  */}
                {cart.map((product) => (
                    <ItemCart key={product.id} product={product}/>
                ))}
            </div>
            <div className='Cart-final'>
                {/* parrafo que dice precio total */}
                <p className='btn-total'>
                    total: $ {totalPrice()}    
                </p> 
                   
                {/* link hacia el checkout */}
                <Link to="/checkout">
                    {' '}
                    {/* acutalizamos la funcionalidad del boton */}
                    <button className='btn-total'> Finalizar Compra </button>

                </Link>
            </div>
        </div>
        
    )
}

export default Cart
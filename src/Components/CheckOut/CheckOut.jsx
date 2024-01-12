import React, { useState } from 'react';
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useCartContext } from '../Context/CartContext';



export const CheckOut = () => {

    

    //1° etapa - datos
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [emailConfirmacion, setEmailConfirmacion] = useState('');
    //estado de error
    const [error, setError] = useState('');
    //para mostrar el orden id
    const [orderId, setOrderId] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(true);

    const { cart, totalPrice, removeProduct, clearCart } = useCartContext();

    const manejadorFormulario = (event) => {
        event.preventDefault();

        //si el nombre o apellido o ... es null o vacio 
        if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            //el estedo del setErro se modifica con - mensaje
            setError('Campos incompletos - completar por favor!!!');
            return;
        }
        //el estedo del setErro se modifica con - mensaje
        if (email !== emailConfirmacion) {
            setError('Emails no coinciden');
            return;
        }

        const total = totalPrice();

        const orden = {
            items: cart.map((producto) => ({
                id: producto.id,
                nombre: producto.title,
                cantidad: producto.quantity,
            })),
            total: total,
            fecha: new Date(),
            nombre,
            apellido,
            telefono,
            email,
        };

        Promise.all(
            orden.items.map(async (productoOrden) => {
                const db = getFirestore();
                const productoRef = doc(db, 'products', productoOrden.id);

                const productoDoc = await getDoc(productoRef);
                const stockActual = productoDoc.data().stock;

                await updateDoc(productoRef, {
                    stock: stockActual - productoOrden.cantidad,
                });
            })
        )
            .then(() => {
                const db = getFirestore();
                addDoc(collection(db, 'orders'), orden)
                    .then((docRef) => {
                        setOrderId(docRef.id);
                        removeProduct();
                        setMostrarFormulario(false); // Oculta el formulario después de la compra
                        //limpia el carrito despues de la compra
                        clearCart();
                    })
                    .catch((error) => {
                        console.log('Ooops... No se pudo crear la orden...', error);
                        setError('Error en la Orden');
                    });
            })
            .catch((error) => {
                console.log('Ooops... No se pudo actualizar el stock...', error);
                setError('Error al actualizar el stock');
            });
    };


  return (
    <div>
        {mostrarFormulario ? (
            <div className="ProductCardReutilizable-cart-general">
                <h2>Casi terminamos... solo unos datos mas...</h2>
                <form className='checkout-form' onSubmit={manejadorFormulario}>

                        {cart.map((producto) => (
                            <div className="checkout-card">
                                <div> 
                                    <img className='itemCart-img' src={producto.img} alt={producto.title} />
                                </div>
                                <div className="checkout-escritura">   
                                    <p>{''} {producto.title}</p>
                                    <p>Cantidad: {producto.quantity}</p>
                                    <p>Precio u.: $ {producto.price}</p>
                                    <p>Precio Total.: $ {producto.price * producto.quantity}</p>
                                </div>
                            </div>                            
                        ))}
                        <div className='checkout-form-datos'>
                            <div>
                                {/* label - etiqueta */}
                                <label className="lab-check">Nombre: </label>
                                {/* input - ingreso de datos - tipo - valor inicial X - con modificador */}
                                <input className="input-check" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                            </div>

                            <div>
                                {/* label - etiqueta */}
                                <label className="lab-check">Apellido: </label>
                                {/* input - ingreso de datos - tipo - valor inicial X - con modificador */}
                                <input className="input-check" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)}/>
                            </div>

                            <div>
                                {/* label - etiqueta */}
                                <label className="lab-check">telefono: </label>
                                {/* input - ingreso de datos - tipo - valor inicial X - con modificador */}
                                <input className="input-check" type="number" value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
                            </div>

                            <div>
                                {/* label - etiqueta */}
                                <label className="lab-check">Email: </label>
                                {/* input - ingreso de datos - tipo - valor inicial X - con modificador */}
                                <input className="input-check" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div>
                                {/* label - etiqueta */}
                                <label className="lab-check">Confirmacion de Email: </label>
                                {/* input - ingreso de datos - tipo - valor inicial X - con modificador */}
                                <input className="input-check" type="email" value={emailConfirmacion} onChange={(e) => setEmailConfirmacion(e.target.value)}/>
                            </div>

                            <div>
                                {error && <p>{error}</p>}
                                {orderId && (
                                    <p>
                                        ¡Gracias por tu compra! <br /> Tu numero de seguimiento es: <br /> {''}{' '}
                                        {orderId} {''} <br />
                                    </p>
                                )}
                                <div>
                                    <button className="enviar" type="submit">
                                        Terminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="ProductCardReutilizable-cart-general">
                    <h2>¡Gracias por tu compra!</h2>
                    <p>Tu numero de seguimiento es: {orderId}</p>
                </div>
            )}
        </div>
    );
};


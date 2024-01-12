import React, { useContext, useState, useEffect } from 'react'

//creamos el contexto - elegimos la palabra clave - en este caso "CartContext"
const CartContext = React.createContext('');
//variable - funcion - useContext va a consumir (CartContext) - que es la variable anteriormente definida
export const useCartContext = () => useContext(CartContext);


//definimos como parametro que dentro de la funcion hay un children (componente hijo) - verimificar return - los cuales a posteriori seran  los componentes o elementos donde se aplicara la presente funcion - ver app.jsx  
const CartProvider = ({children}) => {
  //constante [carrito y su palabra modificador] = estado inicial ([un array vacio])  
  const [cart, setCart] = useState([]);

  //constante agregar producto = (item y cantidad)
  const addProduct = (item, quantity) => {
    if (isInCart(item.id)) {
      setCart(
        cart.map((product) => {
          return product.id === item.id
          ? { ...product, quantity: product.quantity + quantity}
          : product;
        })
      );
    } else {
      setCart([...cart, {...item,quantity}]);
    }
    
  }

  //constante para que calcule el precio total del carrito
  const totalPrice = () => {
    return cart.reduce((prev, act) => prev + act.quantity * act.price, 0);
};

  //constante para que calcule la totalidad de elementos en el carrito
  const totalProducts = () =>
    cart.reduce(
      (acumulador, productoActual) => acumulador + productoActual.quantity, 
      0
    );

  //constante para borrar el contenido/elementos del carrito
  const clearCart = () => setCart([]);

  //constante para ver los elementos que estan dentro del carrito
  const isInCart = (id) => 
    cart.find((product) => product.id === id) ? true : false;
    
  //constante para eliminar elementos del carrito
  const removeProduct = (id) => 
    setCart(cart.filter((product) => product.id !== id));

  return (
    <CartContext.Provider
      value={{
        clearCart,
        isInCart,
        removeProduct,
        addProduct,
        totalPrice,
        totalProducts,
        cart,
      }}>
        {children}
      </CartContext.Provider>
  )
}
//finalmente el proceso CartContext se va a transformar en CartProvider
export default CartProvider
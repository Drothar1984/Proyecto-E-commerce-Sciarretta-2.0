//funcion principal sobre la cual se montan las funciones de primera linea
//importamos funcion primaria itemlistcontainer
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer'

//importamos plantilla css 
import './App.css'
//importamos funcion primaria navbar
import NavBar from './Components/NavBar/NavBar'
//importamos para el enrutado
import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pestañas principales
import Cart from './Components/Cart/Cart'
import {CheckOut} from './Components/CheckOut/CheckOut.jsx'
import Error from './Components/Error'
import CartProvider from './Components/Context/CartContext'

function App() {  

  return (
        
    <div className='App'>
      <BrowserRouter>

      <CartProvider>

        <NavBar/>

          <Routes>

            <Route path= {'/'} element={ <ItemListContainer greeting='Listado General' />}/>

            <Route path= {'/categoria/:id'} element={ <ItemListContainer/>}/>
            <Route path= {'/item/:id'} element={ <ItemDetailContainer/>}/>            

            <Route path= {'/cart'} element={ <Cart/>}/>
            <Route path= {'/checkout'} element={ <CheckOut/>}/>

            <Route path= {'*'} element={ <Error />}/>

          </Routes>

      </CartProvider>

      </BrowserRouter>
      
    </div>
      
  )
}

export default App

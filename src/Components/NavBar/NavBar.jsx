//funcion de primera linea - barra de navegacion

import React from 'react'
//importacion de la funcion carrito
import CarWidget from '../CarWidget/CarWidget';
//importacion de la funcion logo
import Logo from './Logo';

import '../../App.css';
import Suscripcion from './Suscripcion';

import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <div className='NavBar-General'>
      <div className='NavBar-Logo'>
        <Link to="/">
          <Logo/>
        </Link>        
      </div>
      <ul className='NavBar-Opciones'>
        <li>
          <Link to="/" className='NavBar-Opcion'>Home</Link>
        </li>
        <li>
          <Link to="/categoria/irlandes" className='NavBar-Opcion'>Irlandes </Link>
        </li>
        <li>
          <Link to="/categoria/escoces" className='NavBar-Opcion'>Escoces</Link>
        </li>
        <li>
          <Link to="/categoria/bourbon" className='NavBar-Opcion'>Bourbon</Link>
        </li>
      </ul>
      <div className='NavBar-Carrito'>
        <Suscripcion/>
        <Link to="/cart" className='cart'><CarWidget/></Link>    
      </div>
    </div>
  )
}


export default NavBar
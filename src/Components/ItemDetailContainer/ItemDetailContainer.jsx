//detalle de elementos
//importamos los hook necesarios
import { useState, useEffect } from 'react'
//importamos los hooks para acceder a los parametros de la URL
import { useParams } from 'react-router-dom'
//al nutrir la funcion de firebase importamos desde alli
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import ItemDetail from '../ItemDetail/ItemDetail';


const ItemDetailContainer = () => {

      //array vacio que va a tomar la informacion del json
      const [item, setItem] = useState ([]);
      const {id} = useParams ();
  
      //representamos una asincronia - creando una promesa que se resuelva - con posibles escenarios
      useEffect(() => {        
       //inicializamos "firestore" - pero como lo vamos utilizar lo almacenamos en una variable
        const queryDb = getFirestore();
        //indicamos a traves de queryDoc que es lo que queremos que traiga (debiando pasar dos argumentos 1º que se inicialice  y 2º de donde)
        const queryDoc = doc(queryDb, 'products',id)
        getDoc(queryDoc).then((res) => 
        setItem({id: res.id, ...res.data()}))
        

    }, [id])
      
      return (
  
          <div className='contenedor-bienvenida-principal'>       
            <div>
                <ItemDetail item = {item} />
            </div>                     
          </div>
      
      )
  
  }
  

export default ItemDetailContainer
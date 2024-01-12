//pagina principal render

//importamos los hook necesarios -
import { useState, useEffect } from 'react'
//importamos los hooks para acceder a los parametros de la URL -
import { useParams } from 'react-router-dom'

//con la actualizacion del proyecto se dejo de usar json  para los productos - y pasamos a usar firebase -
import {getFirestore, collection, getDocs, where, query } from 'firebase/firestore'

//importamos el ItemList que es donde -------> DAMOS LA FUNCIONALIDAD DEL MAP EN ITEMLIST 
import ItemList from '../ItemList/ItemList'


const ItemListContainer = ({greeting}) => {

    //array vacio que va a tomar la informacion del json
    const [item, setItem] = useState ([]);
    const {id} = useParams ();

    //como actualizacion de archivo json a firebase - se cambia la configuracion - 
    useEffect(() => {
        //inicializamos "firestore" - pero como lo vamos utilizar lo almacenamos en una variable
        const queryDb = getFirestore();
        //indicamos a traves de collection que es lo que queremos que traiga (debiando pasar dos argumentos 1º que se inicialice  y 2º de donde)
        const queryCollection = collection(queryDb, 'products')

        //si existe el (id) entonces
        if(id){
            //variable que guarda el - query [traeme de] ([1º argumento - de donde] queryCollection, [2º argumento - que me tiene que filtrar] where ([1º parametro - lo que sea x, en este caso] 'categoyId, [2º parametro - en este caso que sea igual ] == , [3º a que cosa sea igual o lo que sea] id ) )
            const queryFilter = query(queryCollection, where('categoryId', '==', id));
            //getDocs [obtener el documento] ([quiero que me muestres X] queryFilter)
            getDocs(queryFilter).then((res) => 
            //[mostrame por pantalla] setItem (res)
            setItem(res.docs.map((p) => ({id: p.id, ...p.data() })))
            );
        //sino
        }else{
            //mostrame toda la collection
            getDocs(queryCollection).then((res) => 
            //[mostrame por pantalla] setItem (res)
            setItem(res.docs.map((p) => ({id: p.id, ...p.data() })))
            );
        }

    }, [id])
    

    //agregamos los contenedores y la funcion itemlist, con el parametro item y su prop item
    return (

        <div className='contenedor-bienvenida-principal'>            

            <div>
                <h3 className='texto-bienvenida'>{greeting}</h3>
                <ItemList  item = {item} />
            </div>            
            
        </div>
    
    )

}

export default ItemListContainer
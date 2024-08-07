import React, { useState, useEffect } from 'react'
import { codigoColores } from './colors'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { AlienCard } from './alienCard';
import { AlienCardJoinGameContainer } from './alienCardJoinGameContainer';
import { useSelector } from 'react-redux';

const JoinInterface = ({idPartida}) => {
  const alienState = useSelector(state => state.alienList.list)
  const [coloresParticipantes, setColoresParticipantes] = useState([])
  const [selectedColor, setSelectedColor] = useState(null);
  const [datosAliens, setDatosAliens] = useState('')
  const [aliensElegidos, setAliensElegidos] = useState(null)
  const [aliens, setAliens] = useState(alienState || [])

  
  let aliensState = useSelector((state)=>state.alienList.list)
useEffect(() => {
  setAliens(aliensState)

}, []);

  const getColors = async () => {
    try {
        const docRef = doc(db, 'partidas', idPartida);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const docData = docSnap.data();
            if (docData && docData.jugadores) {
                setDatosAliens(docData);
                const colores = docData.jugadores.map(jugador => [jugador.color, jugador.Id]);
                setColoresParticipantes(colores);
            } else {
                console.error('No se encontraron jugadores en los datos del documento.');
            }
        } else {
            console.error('No se encontró el documento.');
        }
    } catch (error) {
        console.error('Error al obtener el documento:', error);
    }
}


  useEffect(() => {
    getColors()
  }, []);

  const getAliens = async(color) => {
    const datos = await getDoc(doc(db,'partidas',idPartida));
    if (datos.exists) {
        const encontrado = datos.data().jugadores.find(jugador => jugador.color === color);
        console.log(encontrado)
        if (encontrado) {
            setAliensElegidos(encontrado.aliens);
         
        } else {
            console.log('No se encontró ningún jugador con el color seleccionado');
        }
    }
  }

  const handleClick = (color) => {
    setSelectedColor(color);
    getAliens(color);
  }

  return (
    <div>

    <div className="grid grid-cols-2 gap-4 w-3/4 mx-auto">
      <h1 className="col-span-2 text-center text-2xl font-bold mb-4">Elegí tu color para la partida {idPartida}</h1>
      {coloresParticipantes.map((color, index) => (
       <button
       key={index}
       id={color[0]}
       className={`p-4 rounded w-full h-20`}
       style={{
         backgroundColor: color[0],
         color: (color[0] === '#FFFFFF' || color[0] === '#FFFF00') ? 'black' : 'white'
       }}
       onClick={() => handleClick(color[0])}
     >
       {color[1]}
     </button>
     
      ))}
   
      
    </div>
    <div className="flex flex-wrap justify-center">
         {selectedColor && aliensElegidos && 
      <div>
      <p className=" mt-2 text-2xl font-bold text-center">Tus aliens: </p>
      <AlienCardJoinGameContainer aliensJugador={aliensElegidos} aliens={aliens}/>
      
       </div>
       }
    </div>
    </div>
    
  )
}

export default JoinInterface
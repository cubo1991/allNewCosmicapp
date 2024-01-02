import React, { useState, useEffect } from 'react'
import { codigoColores } from './colors'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { AlienCard } from './alienCard';
import { AlienCardJoinGameContainer } from './alienCardJoinGameContainer';

const JoinInterface = ({idPartida}) => {
 
  const [coloresParticipantes, setColoresParticipantes] = useState([])
  const [selectedColor, setSelectedColor] = useState(null);
  const [datosAliens, setDatosAliens] = useState('')
  const [aliensElegidos, setAliensElegidos] = useState(null)
  const [aliens, setAliens] = useState(JSON.parse(localStorage.getItem("alienList")) || [])
  

  const getColors = async() => {
    let datos = await getDoc(doc(db,'partidas',idPartida)).then(datos => {
        if (datos.exists) {
            setDatosAliens(datos.data())
            console.log(datos.data())
            const colores = datos.data().jugadores.map(jugador => [jugador.color, jugador.Id]);
            setColoresParticipantes(colores);
        }
    });
  }

  useEffect(() => {
    getColors()
  }, []);

  const getAliens = async(color) => {
    const datos = await getDoc(doc(db,'partidas',idPartida));
    if (datos.exists) {
        const encontrado = datos.data().jugadores.find(jugador => jugador.color === color);
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
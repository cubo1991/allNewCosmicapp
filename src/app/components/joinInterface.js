import React, { useState, useEffect } from 'react'
import { codigoColores } from './colors'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

const JoinInterface = ({idPartida}) => {
 
  const [coloresParticipantes, setColoresParticipantes] = useState([])
  const [selectedColor, setSelectedColor] = useState(null);
  const [datosAliens, setDatosAliens] = useState('')
  const [aliensElegidos, setAliensElegidos] = useState(null)

  const getColors = async() => {
    let datos = await getDoc(doc(db,'partidas',idPartida)).then(datos => {
        setDatosAliens(datos.data())
        const colores = datos.data().jugadores.map(jugador => jugador.color);
        setColoresParticipantes(colores);
       
    });
  }

  useEffect(() => {
    getColors()
  }, []);

  const getAliens = async(color) => {
    const datos = await getDoc(doc(db,'partidas',idPartida));
    const encontrado = datos.data().jugadores.find(jugador => jugador.color === color);
    if (encontrado) {
        setAliensElegidos(encontrado.aliens);
    } else {
        console.log('No se encontró ningún jugador con el color seleccionado');
    }
  }

  const handleClick = (color) => {
    setSelectedColor(color);
    getAliens(color);
  }

  return (
    <div className="grid grid-cols-2 gap-4 w-3/4 mx-auto">
      <h1 className="col-span-2 text-center text-2xl font-bold mb-4">Elige tu color</h1>
      {coloresParticipantes.map((color, index) => (
        <button
          key={index}
          id={color}
          className={`p-4 rounded text-white w-full h-20`}
          style={{backgroundColor: color}}
          onClick={() => handleClick(color)}
        >
        </button>
      ))}
      {selectedColor && aliensElegidos && <p>Aliens que te tocaron para la partida {idPartida}: {`${aliensElegidos[0]} y ${aliensElegidos[1]}`}</p>}
    </div>
  )
}

export default JoinInterface

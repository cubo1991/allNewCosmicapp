'use client'
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebase'
import { QuerySnapshot, addDoc, collection, doc, query, setDoc, updateDoc } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import { addAliens, fetchAliens } from '@/redux/features/alienListSlice'
import Link from 'next/link'

const codigoColores ={
  rojo: "#FF0000",
  azul: "#0000FF",
  blanco: "#FFFFFF",
  amarillo: "#FFFF00",
  negro: "#000000",
  morado: "#800080",
  verde: "#008000",
  naranja: "#FFA500"
}

const colores = [codigoColores.rojo, codigoColores.azul, codigoColores.blanco, codigoColores.amarillo, codigoColores.negro, codigoColores.morado, codigoColores.verde, codigoColores.naranja];

const FormNewGame = ({idPartida}) => {
  let dispatch = useDispatch()
  let aliens = useSelector(state => state.alienList.list)
  let user = JSON.parse(localStorage.getItem('user'))
let userID = user.uid 




  const { register, handleSubmit } = useForm()
  const [jugadores, setJugadores] = useState([])
  const [jugadoresAsignados, setJugadoresAsignados] = useState(false)
  const [aliensPartida, setAliensPartidas] = useState([])
  const [jugadoresTotales, setJugadoresTotales] = useState([])
  const [aliensAsignados, setAliensAsignados] = useState(false)

  // useEffect(() => {
  //   dispatch(fetchAliens()) 
  // }, [])

  const onSubmit = (data) => {
    let jugadoresValidos = data.jugadores.filter(jugador => jugador && jugador.trim() !== '');
  
    if (jugadoresValidos.length > 0) {
      let jugadoresActivos = jugadoresValidos.map((jugador, index) => {
        
        return {
          Id: jugador,
          color: colores[data.jugadores.indexOf(jugador)],
          aliens: []
        };
      });
  
      setJugadores(jugadoresActivos);
      setJugadoresTotales(jugadoresActivos.length);
      setJugadoresAsignados(true);
    }
  }

  const addJugadores = async (db, idPartida, jugadores) => {
    try {
      await setDoc(doc(db, "partidas", idPartida), { jugadores: jugadores });
      console.log("Documento creado con ID: ", idPartida);
      console.log(jugadores)
    } catch (error) {
      console.error("Error al agregar documento: ", error);
    }
  };

  const addPartida = async(db,idPartida, userID) =>{
    try {
       await updateDoc(doc(db, "users",userID), {partidaActual: idPartida})
    } catch (error) {
      console.error("Error al actualizar la propiedad del documento: ", error);
      throw error;
    }
  }

  const addAliens = () => {
    let aliensArray =  Object.values(aliens).map(obj => obj.Nombre);
    let aliensShuffled = aliensArray.sort(() => Math.random() - 0.5);
    for (let i = 0; i < jugadores.length; i++) {
      jugadores[i].aliens = aliensShuffled.slice(i * 2, (i + 1) * 2);
    }
    addJugadores(db, idPartida, jugadores)
    addPartida(db, idPartida, userID)
    
    setAliensAsignados(true);
  }

  return (
    <div>
      {!jugadoresAsignados
        ? <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center space-y-4">
    {Array.from({ length: 8 }, (_, i) => i).map((num) => (
  <input key={num} {...register(`jugadores.${num}`)} placeholder={`Nombre del Jugador ${num + 1 }`} className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-${colores[num]}-700`} style={{backgroundColor: colores[num], color: [codigoColores.blanco, codigoColores.amarillo].includes(colores[num]) ? 'black' : 'white'}} />
))}
            <button type="submit" className="px-4 py-2 text-white rounded-md hover:bg-blue-700" style={{backgroundColor: '#0000FF'}}>Guardar</button>
          </form>
        : !aliensAsignados
          ? <button onClick={addAliens} className="px-4 py-2 text-white rounded-md hover:bg-blue-700" style={{backgroundColor: '#0000FF'}}>Asignar aliens</button>
          : <div>
              <p className="text-lg font-bold text-center text-blue-700">El Cosmos ya fue asignado</p>
              <Link className="text-center text-blue-500 hover:underline" href="/">Volver a la home</Link>
            </div>
      }
    </div>
  )
}
 
export default FormNewGame

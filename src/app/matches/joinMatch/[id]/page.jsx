'use client'
// Importaciones
import JoinInterface from '@/app/components/joinInterface';
import { JoinMatch } from '@/app/components/joinMatch'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading'; // Importa el paquete

const DinamicJoinGame = ({params}) => {

  let usuario = useSelector(state => state.user)
  const [user, setUser] = useState(null);
  const [idPartida, setIdPartida] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localUser = JSON.parse(localStorage.getItem("user"));
      setUser(localUser);
      if (localUser) {
        setIdPartida(localUser.idPartida);
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setIdPartida(user.idPartida);
    }
  }, [user]);

  const handleInputChange = (event) => {
    setIdPartida(event.target.value);
    if (user) {
      user.idPartida = event.target.value;
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const eraseGame = () => {
    if (typeof window !== 'undefined') {
      let userToModify =  JSON.parse(localStorage.getItem('user'))
      delete userToModify.idPartida
      localStorage.setItem('user', JSON.stringify(userToModify))
      setIdPartida('');
    }
  }

  if (isLoading) {
    return <ReactLoading type={"spin"} color={"#000000"} height={'20%'} width={'20%'} />; // Reemplaza el antiguo componente de carga
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      {idPartida ? (
        <div className="overflow-auto w-full">
          <JoinInterface idPartida={idPartida}/>
        </div>
      ) : (
        <JoinMatch 
          value={idPartida}
          onChange={handleInputChange}
          className="p-6 m-4 bg-white rounded shadow-lg"
        />
      )}
      {
  user && Object.keys(user).length != 0
  ?
      <div className="p-6 m-4 bg-white rounded shadow-lg text-center">
        <p className="text-gray-700">¿Quieres borrar la partida?</p>
        <button onClick={eraseGame} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Borrar Partida
        </button>
      </div>
      : 
      ''

      }
    </div>
  )
}

export default DinamicJoinGame

'use client'
// Importaciones
import JoinInterface from '@/app/components/joinInterface';
import { JoinMatch } from '@/app/components/joinMatch'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
// import { useRouter } from 'next/router'

const DinamicJoinGame = ({params}) => {

  let usuario = useSelector(state => state.user)
  let user;
  if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem("user"));
  }
  const [idPartida, setIdPartida] = useState(user ? user.idPartida : '');

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
  usuario && usuario.user && Object.keys(usuario.user).length != 0
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

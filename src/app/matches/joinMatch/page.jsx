'use client'

import JoinInterface from '@/app/components/joinInterface';
import { JoinMatch } from '@/app/components/joinMatch'
import React, { useState, useEffect } from 'react'

const JoinGame = () => {
  let user = JSON.parse(localStorage.getItem("user"));
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

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      {idPartida ? (
        <JoinInterface idPartida={idPartida}/>
      ) : (
        <JoinMatch 
          value={idPartida}
          onChange={handleInputChange}
          className="p-6 m-4 bg-white rounded shadow-lg"
        />
      )}
    </div>
  )
}

export default JoinGame

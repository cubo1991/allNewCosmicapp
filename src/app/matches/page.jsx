'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'

const Matches = () => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h2 className="text-2xl mb-4">Nueva Partida</h2>
        <Link href='/matches/newGame'>
          
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
              Crear Partida
            </button>
       
        </Link>
        <Link href='/matches/joinMatch'>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2">
          Sumarme a una Partida
        </button>
        </Link>
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-2">
          Ver Partida
        </button>
      </div>
    </div>
  )
}

export default Matches

'use client'
import Link from 'next/link'
import React from 'react'

 const Puntajes = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h2 className="text-2xl mb-4">Puntajes</h2>
       <Link href="/puntajes/createCup">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
          Crear Copa
        </button>
        </Link>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2">
          Ver Copa
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-2">
          Ver Estadísticas
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2">
          Ver Ranking
        </button>
      </div>
    </div>
  )
}

export default Puntajes

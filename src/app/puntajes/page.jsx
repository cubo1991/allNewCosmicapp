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
        <Link href="/puntajes/putCup">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2">
          Actualizar Copa
        </button>
        </Link>
        <Link href="/puntajes/estadisticas">
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-2">
          Ver Estadísticas
        </button>
        </Link>
        <Link href="/puntajes/editEstadisticas">
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded m-2">
          Editar Estadísticas
        </button>
        </Link>
        <Link href="/puntajes/ranking">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2">
          Ver Ranking
        </button>
        </Link>
      </div>
    </div>
  )
}

export default Puntajes

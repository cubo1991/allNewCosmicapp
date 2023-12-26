'use client'
import React,{useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAliens } from '../redux/features/alienListSlice'
import Link from 'next/link'


function Home() {   

let dispatch = useDispatch()


useEffect(() => {
    dispatch(fetchAliens())  

}, [])
   


  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400">
    <div className="bg-white p-6 rounded shadow-md text-center">
      <h2 className="text-2xl mb-4">Bienvenido</h2>
     <Link href='/matches'>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
        Partidas
      </button>
      </Link>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2">
        Perfil
      </button>
      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-2">
        Registrarse
      </button>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2">
        Ver Aliens
      </button>
    </div>
  </div>
  
  )
}

export default Home
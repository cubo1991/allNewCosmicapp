'use client'
import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAliens } from '../redux/features/alienListSlice'
import Link from 'next/link'
import { useState } from 'react'

function Home() {   
  let dispatch = useDispatch()
  const [userId, setUserId] = useState(null)
  const [userConectado, setUserConectado] = useState(false)
let usuario = useSelector(state => state.user)

  useEffect(() => {

    let user = JSON.parse(localStorage.getItem('user'))
    let userUid = user ? user.uid : null
    setUserId(userUid)
  }, [usuario.user])

  useEffect(() => {
    dispatch(fetchAliens())
  }, [])
   

  console.log(usuario.user)
  return (
    <div  className="min-h-screen flex items-center justify-center bg-blue-400">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h2 className="text-2xl mb-4">Bienvenido</h2>
        {
          Object.keys(usuario.user).length === 0
          ?
          <div>
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
            <Link href='/alienList'>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2">
                Ver Aliens
              </button>
            </Link>
          </div>
          :
          <p>Por favor, inicie sesión</p>
        }
      </div>
    </div>
  )
}

export default Home


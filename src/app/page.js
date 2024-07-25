'use client'
import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAliens } from '../redux/features/alienListSlice'
import Link from 'next/link'
import { useState } from 'react'
import { addUser } from '@/redux/features/userSlice'

function Home() {
  let dispatch = useDispatch()
  const [userId, setUserId] = useState(null)
  const [userConectado, setUserConectado] = useState(false)
  let usuario = useSelector(state => state.user)

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'))
    let userUid = user ? user.uid : null
    if (JSON.stringify(user) !== JSON.stringify(usuario.user)) {
      dispatch(addUser(user))
      setUserId(userUid)
    }
  }, [usuario.user])

  useEffect(() => {
    dispatch(fetchAliens())
  }, [])



  return (
    <div  className="min-h-screen flex items-center justify-center bg-blue-400">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h2 className="text-2xl mb-4">Bienvenido</h2>
        {
          usuario && usuario.user && Object.keys(usuario.user).length != 0
          ?
          <div>
            <Link href='/matches'>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
                Partidas
              </button>
            </Link>
            <Link href='/randomSimpleAlien'>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2">
              Alien aleatorio
            </button> 
            

            <button  disabled={true} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-2">
              Puntajes
            </button>
            </Link>
            <Link href='/alienList'>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2">
                Ver Aliens
              </button>
            </Link>
          </div>
          :
          <div>

          <p>Para crear partidas, inicie sesión</p>
          <Link href='/matches/joinMatch'>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
            Unirme a partida
          </button>
        </Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Home

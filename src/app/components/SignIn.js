'use client'
import React,{useState, useEffect} from 'react'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { addUser } from '../../app/redux/features/userSlice'

export const SignIn = () => {
    let dispatch = useDispatch()

    const [user, setUser] = useState([])

    const HandleClick = () => { 
        signInWithPopup(auth, provider)
            .then((data) => {
                dispatch(addUser(data.user))
                localStorage.setItem('user', JSON.stringify(data.user))
            })
            .catch((error) => {
                console.error("Error durante la autenticación", error);
            });
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    return (
        <>
            {user && user.length > 0
            ?       
            <button onClick={HandleClick} className="bg-white hover:bg-gray-100 text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded">
                Iniciar Sesión
            </button>
            :
            <button onClick={HandleClick} className="bg-white hover:bg-gray-100 text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded">
                <image src='' alt='Iniciar Sesión' />
            </button>
            }
        </>
    )
}

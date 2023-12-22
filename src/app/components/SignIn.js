'use client'

import React,{useState, useEffect} from 'react'
import { auth, db, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../app/redux/features/userSlice'
import ModalSignOut from './modalSignOut'
import { QuerySnapshot, addDoc, collection, doc, query, setDoc } from 'firebase/firestore'






export const SignIn = () => {
    let dispatch = useDispatch()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    
useEffect(() => {

    if(user) {     
       addUsuario()    }
   
   }, [user])

    const addUsuario = async (e) => {
       console.log()
        if (user) {
            await setDoc(doc(db, 'users', `${user.uid}`), {
                aliensFavoritos: [],
                campañas: 0,
                color: '',
                copas: 0,
                mail: user.email,
                name: user.displayName
            })
        } else {
            console.log('Usuario es null');
        }
    }
    

    const HandleClick = () => { 
        signInWithPopup(auth, provider)
            .then((data) => {
                dispatch(addUser(data.user))
                setUser(data.user)
                localStorage.setItem('user', JSON.stringify(data.user))
                addUser()
            })
            .catch((error) => {
                console.error("Error durante la autenticación", error);
            });
    }

    const signOut = () => {
        setIsModalOpen(true);
    }

    useEffect(() => {
        const handleStorageChange = () => {
            setUser(JSON.parse(localStorage.getItem('user')))
        }

        window.addEventListener('storage', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [user])

    return (
        <>
            {!user
            ?       
            <button onClick={HandleClick} className="bg-white hover:bg-gray-100 text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded">
                Iniciar Sesión
            </button>
            :
            <button onClick={signOut} className="  text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded-full">
                <img src={user.photoURL} alt='Iniciar Sesión' className='rounded-full size-14' />
            </button>
            }
            <ModalSignOut open={isModalOpen} setOpen={setIsModalOpen} setUser={setUser}/>
        </>
    )
}


'use client'
import React, { useState, useEffect } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import ModalSignOut from './modalSignOut';
import { addUser } from '@/redux/features/userSlice';

export const SignIn = () => {
    let dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
            if (userFromLocalStorage) {
                setUser(userFromLocalStorage);
            }
        }
    }, []);

    const HandleClick = () => {
        signInWithPopup(auth, provider)
            .then((data) => {
                dispatch(addUser(data.user));
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
            })
            .catch((error) => {
                console.error("Error durante la autenticación", error);
            });
    };

    const signOut = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        const handleStorageChange = () => {
            setUser(JSON.parse(localStorage.getItem('user')));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [user]);

    return (
        <>
            {!user
                ?
                <button onClick={HandleClick} className="bg-white hover:bg-gray-100 text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded">
                    Iniciar sesión
                </button>
                :
                <button onClick={signOut} className="text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded-full">
                    <img src={user.photoURL} alt='Iniciar Sesión' className='rounded-full size-14' />
                </button>
            }
            <ModalSignOut open={isModalOpen} setOpen={setIsModalOpen} setUser={setUser} />
        </>
    );
};
'use client'
import React, { useState, useEffect } from 'react';
import { auth, db, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { QuerySnapshot, doc, getDoc, setDoc } from 'firebase/firestore';
import { addUser } from '@/redux/features/userSlice';

export const SignUp = () => {
    let dispatch = useDispatch();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
            if (userFromLocalStorage) {
                setUser(userFromLocalStorage);
            }
        }
    }, []);

    const addUsuario = async () => {
        if (user) {
            const docRef = doc(db, 'users', `${user.uid}`);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    aliensFavoritos: [],
                    campañas: 0,
                    color: '',
                    cantidadCopas: 0,
                    cantidadCampañas: 0,
                    copas: [],
                    ranking: 1,
                    ultimoPodio: 0,
                    ultimaCampaña: 0,
                    mail: user.email,
                    name: user.displayName,
                    amigos: '',
                    partidaActual: '',
                    puntosTotales: 0,
                    id: user.uid,
                    jugadas: 0,
                    victorias: 0,
                    colonias: 0,
                    victoriasEspeciales: 0,
                    ataqueSolitario: 0,
                    defensaSolitaria: 0,
                });
            } else {
                console.log('El usuario ya existe en la base de datos');
            }
        } else {
            console.log('Usuario es null');
        }
    };

    const HandleClick = () => {
        signInWithPopup(auth, provider)
            .then((data) => {
                dispatch(addUser(data.user));
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                addUsuario();
            })
            .catch((error) => {
                console.error("Error durante la autenticación", error);
            });
    };

    return (
        <>
            {!user &&
                <button onClick={HandleClick} className="bg-white hover:bg-gray-100 text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded">
                    Registrarse
                </button>
            }
        </>
    );
};

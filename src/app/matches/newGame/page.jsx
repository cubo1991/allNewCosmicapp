import FormNewGame from '@/app/components/formNewGame';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const NewGame = () => {
    let [user, setUser] = useState(null)
    let [partida, setPartida] = useState(false)
    let [showMessage, setShowMessage] = useState(false);
    let router = useRouter()
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            let localUser = JSON.parse(localStorage.getItem('user'));
            setUser(localUser);
            if ('idPartida' in localUser) { 
                setPartida(true)
            }
            else{
                let updatedUser = {...localUser, idPartida: uuidv4().substring(0,5)}
                setUser(updatedUser) 
                localStorage.setItem('user', JSON.stringify(updatedUser))
                setUser(JSON.parse(localStorage.getItem('user')))
            }
        }
    }, []) 

    const eraseGame = () => {
        if (typeof window !== 'undefined') {
            let userToModify =  JSON.parse(localStorage.getItem('user'))
            delete userToModify.idPartida
            localStorage.setItem('user', JSON.stringify(userToModify))
            setUser(userToModify)
            setPartida(false)
        }
    }

    const handleNoClick = () => {
        setShowMessage(true);
    }

    const handleButtonClick = () => {
        eraseGame()
        router.push('/matches')
    }

    const addMatch = async (e) => {
        if (user) {
            await setDoc(doc(db, 'partidas', `${user.uid}`), {
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-400">
            <div className="bg-white p-6 rounded shadow-md text-center">
                {
                    showMessage
                    ? <h2 className="text-2xl mb-4">Esta es tu partida {user && user.idPartida} </h2>


                    : partida
                        ? <>
                            <h2 className="text-2xl mb-4">Ya tenés una partida iniciada.</h2>
                            <p className="mb-2">¿Querés borrarla?</p>
                            <button onClick={handleButtonClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2">
                                Sí
                            </button>
                            <button onClick={handleNoClick} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2">
                                No
                            </button>
                        </>
                        : 
                        <div>
                          <h2 className="text-2xl mb-4">Código de partida {user && user.idPartida} </h2>
                          <FormNewGame idPartida={user && user.idPartida}/>
                        </div>
                }
            </div>
        </div>
    )
}

export default NewGame

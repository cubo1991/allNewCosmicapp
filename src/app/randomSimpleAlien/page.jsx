'use client'
import { fetchAliens } from '@/redux/features/alienListSlice'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AlienCard } from '../components/alienCard'
import { AllAliens } from '../components/AllAliens'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

function RandomSimpleAlien() {
    const aliens = useSelector((state) => state.alienList.list)
    const dispatch = useDispatch()
    const [aliensList, setAliensList] = useState([])
    const [matchID, setMatchID] = useState(null)
    const [matchAliens, setMatchAliens] = useState([])
    const [playersMatch, setPlayersMatch] = useState([])

    useEffect(() => {
        dispatch(fetchAliens())
        setMatchID(JSON.parse(localStorage.getItem("matchID")))
    }, [])

    useEffect(() => {
        setAliensList(aliens)
    }, [aliens])

    useEffect(() => {
        if (matchID !== null) {
            getMatch(db, matchID)
        }
    }, [matchID])

    useEffect(() => {
        console.log('Match Aliens:', matchAliens)
    }, [matchAliens])

    const getMatch = async (db, idPartida) => {
        try {
            const docRef = doc(db, 'partidas', idPartida)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                const partida = docSnap.data()
                const allPlayers = []
                partida.jugadores.forEach(jugador => {
                    allPlayers.push(jugador.Id)
                })
                setPlayersMatch(allPlayers)
                const allAliens = []
                partida.jugadores.forEach(jugador => {
                    if (jugador.aliens) {
                        allAliens.push(...jugador.aliens)
                    }
                })
                setMatchAliens(allAliens)
            } else {
                console.log("No such document!")
            }
        } catch (error) {
            console.error("Error fetching match: ", error)
        }
    }
console.log(playersMatch)

    return (
        <div>
            <h2>Prueba</h2>
            <div>
                {matchAliens.map((alien, index) => (
                    <p key={index}>{alien}</p>
                ))}
            </div>
        </div>
    )
}

export default RandomSimpleAlien

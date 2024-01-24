'use client'
import React, { useEffect, useState } from 'react';
import { Timestamp, collection, doc, getDoc, getDocs, setDoc, updateDoc, batch  } from "firebase/firestore"; 
import { db } from '../../firebase';
import CupTable from '@/app/components/cupTable';
import PutCup from '@/app/components/putCup';



const Page = () => {
  let jugador = null;

  if (typeof window !== 'undefined') {
    jugador = JSON.parse(localStorage.getItem('user'));
  }

  const [cup, setCup] = useState(null);
  const [gameData, setGameData] = useState({});
  const [firebaseData, setFirebaseData] = useState({});
  const [actualCup, setActualCup] = useState(null);
  const [podio, setPodio] = useState({
    primero: "",
    segundo: "",
    tercero: "",
    end: false
  });

  const updatePodio = (primerLugar, segundoLugar, tercerLugar, end) => {
    setPodio({
      primero: primerLugar,
      segundo: segundoLugar,
      tercero: tercerLugar,
      end: end
    });
  };

  useEffect(() => {
    const fetchLatestCup = async () => {
      const cupsSnapshot = await getDocs(collection(db, 'copas'));
      let closestCup = null;
      let closestTimeDifference = null;
  
      const now = new Date(); // Momento actual
  
      cupsSnapshot.forEach((doc) => {
        const cupData = doc.data();
        const isPlayerInCup = cupData.jugadores.some((jug) => jug.id === jugador.uid);
  
        // Solo consideramos las copas que no han sido finalizadas
        if (isPlayerInCup && !cupData.finalizada) {
          const cupDate = new Date(cupData.date.seconds * 1000);
          const timeDifference = Math.abs(now - cupDate);
  
          if (!closestCup || timeDifference < closestTimeDifference) {
            closestCup = { id: doc.id, ...cupData };
            closestTimeDifference = timeDifference;
          }
        }
      });
  
      if (closestCup) {
        setActualCup(closestCup.id);
      }
    };
  
    (async () => {
      await fetchLatestCup();
    })();
  }, []);
  
  
  
  
  

  useEffect(() => {
    const fetchCup = async () => {
      if (actualCup) {
        const cupId = actualCup;

        const cupDoc = doc(db, 'copas', cupId);
    
        

        
        const cupSnapshot = await getDoc(cupDoc);
       
        if (cupSnapshot.exists()) {
          setCup(cupSnapshot.data());
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('actualCup is null or undefined');
      }
    };
    fetchCup();
  }, [actualCup]);

  useEffect(() => {
    const updatePodioInFirebase = async () => {
      if (podio.end) {
        const cupDoc = doc(db, 'copas', cup.id);
        // Actualiza el campo "podio" de la copa en Firebase
        await updateDoc(cupDoc, { podio: podio});
        await updateDoc(cupDoc, { finalizada: podio.end});
      }
    };
  
    updatePodioInFirebase();
  }, [podio, cup]);

  const handleInputChange = (event, jugadorId, type) => {
    setGameData((prevState) => ({
      ...prevState,
      [jugadorId]: {
        ...prevState[jugadorId],
        [type]: event.target.value,
      },
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cupDoc = doc(db, 'copas', cup.id);
    const userDoc = doc(db, 'users', jugador.uid);
    const userSnapshot = await getDoc(userDoc);
    const cupSnapshot = await getDoc(cupDoc);
  
    if (cupSnapshot.exists()) {
      let cupData = cupSnapshot.data();
  
      // Convierte los Timestamps a Date antes de llamar a JSON.stringify
      for (let key in cupData) {
        if (cupData[key] instanceof Timestamp) {
          cupData[key] = cupData[key].toDate();
          
        }
      }
  
      cupData = JSON.parse(JSON.stringify(cupData));
      cupData.partidaActual = cupData.partidaActual || 1;
  
      let numJugadores = 0;
  
      let updatedJugadores = cupData.jugadores.map(jugador => {
        let jugadorData = gameData[jugador.id];
        if (jugadorData && (jugadorData.CI || jugadorData.CE)) {
          numJugadores += 1;
          jugador.puntos = jugador.puntos || {};
          let puntos = 0;
          if (jugadorData.CI) {
            puntos += parseInt(jugadorData.CI);
          }
          if (jugadorData.CE) {
            puntos += 2 * parseInt(jugadorData.CE);
          }
          jugador.puntos[cupData.partidaActual] = puntos;
        }
        return jugador;
      });
  
      updatedJugadores = updatedJugadores.map(jugador => {
        let jugadorData = gameData[jugador.id];
        if (jugadorData && jugadorData.win) {
          jugador.puntos[cupData.partidaActual] += numJugadores;
        }
        return jugador;
      });
  
      cupData.jugadores = updatedJugadores;
  
      setFirebaseData(cupData);
  
      cupData.partidaActual += 1;
  
      await updateDoc(cupDoc, cupData);
  
      // Actualiza los datos del usuario en la colección 'users'
      for (let jugador of cupData.jugadores) {
        const userDoc = doc(db, 'users', jugador.id);
        const userData = await getDoc(userDoc);
        let user = userData.data();
      
  
        // Define jugadorData en este ámbito
        let jugadorData = gameData[jugador.id];
      
        // Inicializa las propiedades si no existen
        user.jugadas = user.jugadas || 0;
        user.colonias = user.colonias || 0;
        user.victorias = user.victorias || 0;
        user.puntosPartidas = user.puntosPartidas || [];
  
        // Actualiza las propiedades
        user.jugadas += 1;
        user.colonias += jugadorData && jugadorData.CE ? parseInt(jugadorData.CE) : 0;
        user.victorias += jugadorData && jugadorData.win ? 1 : 0;
  
        if (jugador.puntos) {
          let values = Object.values(jugador.puntos);
          let lastValue = values[values.length - 1];
          user.puntosPartidas.push(lastValue);
        }
        
        // Guarda los datos del usuario     
        await updateDoc(userDoc, user);
      }
  
      window.location.reload();
    }
  } 


  useEffect(() => {
    console.log(podio)
    const updateCupPodio = async () => {
      if (podio.end) {
        // Primero, actualizamos el campo 'ultimoPodio' a 0 para todos los usuarios
        const usersSnapshot = await getDocs(collection(db, 'users'));
        usersSnapshot.forEach(doc => {
          updateDoc(doc.ref, { ultimoPodio: 0 });
        });
  
        // Luego, actualizamos 'ultimoPodio' para los jugadores en el podio
        const podioUpdates = {
          [podio.primero.id]: 10,
          [podio.segundo.id]: 7,
          [podio.tercero.id]: 5
        };
        for (const userId in podioUpdates) {
          const userRef = doc(db, 'users', userId);
          updateDoc(userRef, { ultimoPodio: podioUpdates[userId] });
        }

        // Incrementamos 'cantidadCopas' en 1 para el jugador que terminó primero
        const firstPlaceUserRef = doc(db, 'users', podio.primero.id);
        const firstPlaceUserSnapshot = await getDoc(firstPlaceUserRef);
        const currentCups = firstPlaceUserSnapshot.data().cantidadCopas;
        updateDoc(firstPlaceUserRef, { cantidadCopas: currentCups + 1 });
      }
    };
  
    updateCupPodio();
  }, [cup, podio]);




  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {cup ? (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-full overflow-x-scroll">
          <h1 className="block text-gray-700 text-xl font-bold mb-2">Copa: {cup.name}</h1>
          <PutCup cup={cup} gameData={gameData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
          <CupTable cup={cup} updatePodio={updatePodio} podio={podio}/>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Page;

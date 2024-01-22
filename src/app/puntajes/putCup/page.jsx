'use client'
import React, { useEffect, useState } from 'react';
import { Timestamp, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebase';
import CupTable from '@/app/components/cupTable';
import PutCup from '@/app/components/putCup';



const Page = () => {
  const jugador = JSON.parse(localStorage.getItem('user'));

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
      // Obtén todas las copas
      const cupsSnapshot = await getDocs(collection(db, 'copas'));
      let latestCup = null;
  
     // Recorre todas las copas
cupsSnapshot.forEach((doc) => {
  const cupData = doc.data();

  // Comprueba si el jugador participó en la copa
  const isPlayerInCup = cupData.jugadores.some((jug) => jug.id === jugador.uid);

  // Obtiene la fecha en milisegundos
  let cupDateMillis;
  if (cupData.date instanceof Date) {
    cupDateMillis = cupData.date.getTime();
  } else if (cupData.date && typeof cupData.date === 'object') {
    cupDateMillis = new Date(cupData.date.seconds * 1000).getTime();
  }

  // Obtiene la fecha en milisegundos
  let latestCupDateMillis;
  if (latestCup && latestCup.date instanceof Date) {
    latestCupDateMillis = latestCup.date.getTime();
  } else if (latestCup && latestCup.date && typeof latestCup.date === 'object') {
    latestCupDateMillis = new Date(latestCup.date.seconds * 1000).getTime();
  }

  // Si el jugador participó y la copa es más reciente que la almacenada, actualiza latestCup
  if (isPlayerInCup && (!latestCup || cupDateMillis > latestCupDateMillis)) {
    latestCup = { id: doc.id, ...cupData };
    if(cupData && cupData.date){
      console.log(cupData.date)
      console.log(latestCup.date)
    }
  }
});
  
      // Establece la copa más reciente como actualCup
      if (latestCup) {
        setActualCup(latestCup.id);
      }
    };
  
    // Llama a fetchLatestCup y espera a que se complete
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

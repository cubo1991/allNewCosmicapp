'use client';
import { useState } from 'react';
import { db } from '../firebase';
import { doc, getDocs, collection, updateDoc } from 'firebase/firestore';
import AlienCounterManager from './AlienCounterManager';

const AlienCounterTester = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const incrementCounters = async () => {
    setLoading(true);
    setMessage('');

    try {
      const alienCollection = collection(db, 'alienList');
      const alienSnapshot = await getDocs(alienCollection);
      const aliens = alienSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Barajar los aliens y seleccionar 10
      const shuffledAliens = aliens.sort(() => Math.random() - 0.5);
      const selectedAliens = shuffledAliens.slice(0, 10);

      console.log('Aliens seleccionados para actualizar:', selectedAliens);

      // Incrementar el contador de los aliens seleccionados
      for (const alien of selectedAliens) {
        const alienRef = doc(db, 'alienList', alien.id);
        const newCount = (alien.contador || 0) + 1; // Asegurarse de que no sea null

        console.log(`Actualizando alien ${alien.id}: contador de ${alien.contador} a ${newCount}`);

        await updateDoc(alienRef, {
          contador: newCount,
        });
      }

      setMessage(`¡Contadores actualizados para ${selectedAliens.length} aliens!`);
    } catch (error) {
      console.error('Error al incrementar contadores:', error);
      setMessage('Ocurrió un error al actualizar los contadores.');
    } finally {
      setLoading(false);
    }
  };

  const execute100Times = async () => {
    for (let i = 0; i < 100; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50)); // Pausa entre ejecuciones
      incrementCounters(); // Llamar a la función para incrementar los contadores
    }
  };

  return (
    <div className="text-center space-y-4">
      <AlienCounterManager />
      <button
        onClick={execute100Times}
        className="px-4 py-2 text-white rounded-md hover:bg-green-700"
        style={{ backgroundColor: '#008000' }}
        disabled={loading}
      >
        {loading ? 'Ejecutando...' : 'Ejecutar 100 veces'}
      </button>
      {message && <p className="mt-4 text-lg text-blue-700">{message}</p>}
    </div>
  );
};

export default AlienCounterTester;

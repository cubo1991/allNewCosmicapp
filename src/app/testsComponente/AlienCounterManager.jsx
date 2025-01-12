'use client';
import { useState } from 'react';
import { db } from '../firebase';
import { doc, getDocs, collection, updateDoc } from 'firebase/firestore';

const AlienCounterManager = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Incrementar los contadores de 10 aliens al azar
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

  // Reiniciar todos los contadores a 0
  const resetCounters = async () => {
    setLoading(true);
    setMessage('');

    try {
      const alienCollection = collection(db, 'alienList');
      const alienSnapshot = await getDocs(alienCollection);

      for (const alien of alienSnapshot.docs) {
        const alienRef = doc(db, 'alienList', alien.id);
        await updateDoc(alienRef, { contador: 0 });
      }

      setMessage('¡Todos los contadores han sido reiniciados a 0!');
    } catch (error) {
      console.error('Error al reiniciar contadores:', error);
      setMessage('Ocurrió un error al reiniciar los contadores.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center space-y-4">
      <button
        onClick={incrementCounters}
        className="px-4 py-2 text-white rounded-md hover:bg-blue-700"
        style={{ backgroundColor: '#0000FF' }}
        disabled={loading}
      >
        {loading ? 'Actualizando...' : 'Incrementar contadores'}
      </button>
      <button
        onClick={resetCounters}
        className="px-4 py-2 text-white rounded-md hover:bg-red-700"
        style={{ backgroundColor: '#FF0000' }}
        disabled={loading}
      >
        {loading ? 'Reiniciando...' : 'Reiniciar contadores'}
      </button>
      {message && <p className="mt-4 text-lg text-blue-700">{message}</p>}
    </div>
  );
};

export default AlienCounterManager;

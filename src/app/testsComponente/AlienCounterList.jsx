import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";

const AlienCounterList = () => {
  const [aliens, setAliens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAliens = async () => {
      try {
        const db = getFirestore();
        const alienListRef = collection(db, "alienList");
        const q = query(alienListRef, orderBy("contador", "desc"));
        const snapshot = await getDocs(q);

        const alienData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAliens(alienData);
      } catch (error) {
        console.error("Error fetching aliens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAliens();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Aliens ordenados por contador</h1>
      <ul>
        {aliens.map((alien) => (
          <li key={alien.id}>
            {alien.Nombre || "Sin nombre"} ha sido seleccionado {alien.contador || 0} veces
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlienCounterList;

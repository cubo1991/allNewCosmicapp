'use client'
import React, { useEffect, useState } from 'react';
import Ranking from '../../components/ranking';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/app/firebase';

const Page = () => {
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
  
      // Calculamos la suma de los últimos 10 valores de 'puntosPartidas' para cada usuario
      const userListWithSum = userList.map(user => {
        const last10Scores = user.puntosPartidas.slice(-10);
        const sum = last10Scores.reduce((a, b) => a + b, 0) + user.cantidadCopas + user.cantidadCampañas;
        return { ...user, sumLast10: sum };
      });
  
      // Ordenamos los usuarios por la suma de los últimos 10 valores de 'puntosPartidas'
      const sortedUserList = userListWithSum.sort((a, b) => b.sumLast10 - a.sumLast10);
  
      // Asignamos el ranking a cada usuario y actualizamos en Firebase
      const rankedUserList = sortedUserList.map(async (user, index) => {
        const userWithRanking = { ...user, ranking: index + 1 };
        const userRef = doc(db, 'users', user.id);
        await updateDoc(userRef, { ranking: userWithRanking.ranking });
        return userWithRanking;
      });
  
      const updatedUsers = await Promise.all(rankedUserList);
      setUsers(userList);
      setNewUsers(updatedUsers);
    };
  
    fetchUsers();
  }, []);

  return (
    <div>
      <Ranking users={newUsers} />
    </div>
  );
};

export default Page;

'use client'
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Estadisticas = () => {
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => doc.data());
      console.log(userList)
      setUsers(userList);
      
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Jugadas</th>
            <th>Victorias</th>
            <th>Colonias</th>
            <th>Promedio de Colonias</th>
            <th>Cantidad de Colonias</th>
            <th>Cantidad de Copas</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.jugadas}</td>
              <td>{user.victorias}</td>
              <td>{user.colonias}</td>
              <td>{user.jugadas ? (user.colonias / user.jugadas).toFixed(2) : 0}</td>
              <td>{user.colonias}</td>
              <td>{user.copas.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Estadisticas;

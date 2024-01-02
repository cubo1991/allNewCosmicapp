'use react'
import React, { useEffect, useState } from 'react';
import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore"; 
import firebase from 'firebase/app';
import { arrayUnion } from "firebase/firestore";
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

const CreateCup = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [cup, setCup] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setUsers(userList);
    };
    getUsers();
  }, []);

  const handleSelect = (event) => {
    const selectedUser = users.find(user => user.name === event.target.value);
    setSelectedUsers([...selectedUsers, {...selectedUser, nickname: ""}]);
  };

  const handleNicknameChange = (event, id) => {
    const updatedUsers = selectedUsers.map(user => user.id === id ? {...user, nickname: event.target.value} : user);
    setSelectedUsers(updatedUsers);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cupId = uuidv4().slice(0, 5);
    const newCup = {
      id: cupId,
      jugadores: selectedUsers.map(user => ({id: user.id, apodo: user.nickname})),
      partidas: 0,
      finalizada: false,
      podio: ""
    };
    setCup(newCup);
  
    // Agregar la nueva copa a la colección de copas
    const cupsCollection = collection(db, 'copas');
    await setDoc(doc(cupsCollection, cupId), newCup);
  
    // Actualizar la colección de usuarios
    for (const user of selectedUsers) {
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        copas: arrayUnion(cupId)
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user-select">
            Selecciona un usuario
          </label>
          <select onChange={handleSelect} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="user-select">
            <option>Selecciona un usuario</option>
            {users.map(user => <option key={user.id}>{user.name}</option>)}
          </select>
        </div>
        {selectedUsers.map(user => (
          <div key={user.id} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`nickname-${user.id}`}>
              {user.name}
            </label>
            <input type="text" value={user.nickname} onChange={(e) => handleNicknameChange(e, user.id)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={`nickname-${user.id}`} placeholder="Apodo" />
          </div>
        ))}
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCup;

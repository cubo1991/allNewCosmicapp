'use react'
import React, { useEffect, useState } from 'react';
import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore"; 
import firebase from 'firebase/app';
import { arrayUnion } from "firebase/firestore";
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

const CreateCup = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [cup, setCup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

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
    if (event.target.value.includes("Agregar Todos")) {
      setSelectedUsers([...selectedUsers, ...users.map(user => ({ ...user, nickname: "" }))]);
    } else {
      const selectedUser = users.filter(user => event.target.value.includes(user.name));
      setSelectedUsers([...selectedUsers, ...selectedUser.map(user => ({ ...user, nickname: "" }))]);
    }
  };

  const handleNicknameChange = (event, id) => {
    const updatedUsers = selectedUsers.map(user => user.id === id ? {...user, nickname: event.target.value} : user);
    setSelectedUsers(updatedUsers);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cupId = uuidv4().slice(0, 5);
    const newCup = {
      date: new Date(),
      id: cupId,
      jugadores: selectedUsers.map(user => ({id: user.id, apodo: user.nickname, nombre: user.name})),
      partidas: 0,
      finalizada: false,
      podio: "",
      creador: selectedUsers[0].id,
    };
    setCup(newCup);

    const cupsCollection = collection(db, 'copas');
    await setDoc(doc(cupsCollection, cupId), newCup);

    for (const user of selectedUsers) {
      
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        copas: arrayUnion(cupId)
      });
    }

    setShowModal(true);
  };

  const handleAddAllPlayers = () => {
    setSelectedUsers([...selectedUsers, ...users.map(user => ({ ...user, nickname: "" }))]);
  };

  const handleClose = () => {
    setShowModal(false);
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user-select">
            Selecciona a los jugadores para la nueva copa
          </label>
          <select
            multiple
            onChange={handleSelect}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="user-select"
          >
          
            {users.map(user => (
              <option key={user.id} disabled={selectedUsers.some(selectedUser => selectedUser.id === user.id)}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        {selectedUsers.map(user => (
          <div key={user.id} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`nickname-${user.id}`}>
              {user.name}
            </label>
            <input
              type="text"
              value={user.nickname}
              onChange={(e) => handleNicknameChange(e, user.id)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={`nickname-${user.id}`}
              placeholder="Apodo"
            />
          </div>
        ))}
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleAddAllPlayers}
          >
            Agregar Todos
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Crear copa
          </button>
        </div>
      </form>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      ¡Copa creada con éxito!
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        La copa se ha creado con éxito y se te redirigirá a la página de inicio.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleClose}
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCup;

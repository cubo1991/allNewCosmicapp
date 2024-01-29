'use client'
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const EditStats = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditUser(user);
    setFormData(user);
  };

  const handleChange = (e, field) => {
    setFormData({...formData, [field]: e.target.value});
  };

  const handleSubmit = async () => {
    await setDoc(doc(db, 'users', formData.id), formData);
    setUsers(users.map(user => user.id === formData.id ? formData : user));
    setEditUser(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Jugadas</th>
            <th className="py-3 px-6 text-left">Victorias</th>
            <th className="py-3 px-6 text-left">Colonias</th>
            <th className="py-3 px-6 text-left">Promedio de Colonias</th>
            <th className="py-3 px-6 text-left">Cantidad de Colonias</th>
            <th className="py-3 px-6 text-left">Cantidad de Copas</th>
            <th className="py-3 px-6 text-left">Cantidad de Campañas</th>
            <th className="py-3 px-6 text-left">Victorias Especiales</th>
            <th className="py-3 px-6 text-left">Ataque Solitario</th>
            <th className="py-3 px-6 text-left">Defensa Solitaria</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users && users.map((user, index) => (
            <tr className="border-b border-gray-200 hover:bg-gray-100" key={index}>
              {editUser === user ? (
                <>
                  <td className="py-3 px-6 text-left">
                    <input type="text" value={formData.name || ''} onChange={(e) => handleChange(e, 'name')} />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <input type="number" value={formData.jugadas || ''} onChange={(e) => handleChange(e, 'jugadas')} />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <input type="number" value={formData.victorias || ''} onChange={(e) => handleChange(e, 'victorias')} />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <input type="number" value={formData.colonias || ''} onChange={(e) => handleChange(e, 'colonias')} />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <input type="number" value={formData.cantidadCopas || ''} onChange={(e) => handleChange(e, 'cantidadCopas')} />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <input type="number" value={formData.cantidadCampañas || ''} onChange={(e) => handleChange(e, 'cantidadCampañas')} />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <input type="number" value={formData.victoriasEspeciales || ''} onChange={(e) => handleChange(e, 'victoriasEspeciales')} />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <input type="number" value={formData.ataqueSolitario || ''} onChange={(e) => handleChange(e, 'ataqueSolitario')} />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <input type="number" value={formData.defensaSolitaria || ''} onChange={(e) => handleChange(e, 'defensaSolitaria')} />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button onClick={handleSubmit}>Guardar</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-3 px-6 text-left">{user.name}</td>
                  <td className="py-3 px-6 text-left">{user.jugadas}</td>
                  <td className="py-3 px-6 text-left">{user.victorias}</td>
                  <td className="py-3 px-6 text-left">{user.colonias}</td>
                  <td className="py-3 px-6 text-left">{user.jugadas ? (user.colonias / user.jugadas).toFixed(2) : 0}</td>
                  <td className="py-3 px-6 text-left">{user.colonias}</td>
                  <td className="py-3 px-6 text-left">{user.cantidadCopas}</td>
                  <td className="py-3 px-6 text-left">{user.cantidadCampañas}</td>
                  <td className="py-3 px-6 text-left">{user.victoriasEspeciales ? user.victoriasEspeciales : 0}</td>
                  <td className="py-3 px-6 text-left">{user.ataqueSolitario ? user.ataqueSolitario : 0}</td>
                  <td className="py-3 px-6 text-left">{user.defensaSolitaria ? user.defensaSolitaria : 0}</td>
                  <td className="py-3 px-6 text-left">
                    <button onClick={() => handleEdit(user)}>Editar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EditStats

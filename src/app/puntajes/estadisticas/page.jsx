'use client'
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import Stats from '../../components/stats';

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
<Stats users={users}/>
    </div>
  );
};

export default Estadisticas;

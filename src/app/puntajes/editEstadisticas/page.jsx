'use client'
import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import EditStats from '@/app/components/editStats';

const Page = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <EditStats users={users} />
    </div>
  );
};

export default Page;

'use client';
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import MyButton from './my_button';
import { format, addDays } from 'date-fns';
import MyComponent from './dialog';
import firebase from 'firebase/app';
import 'firebase/firestore';
import firestoreFunctions from '@/firebase/firestore/firebase_functions';
import { Timestamp } from 'firebase/firestore';


export default function Home() {
  const today = new Date();
  return (
    <main style={{ padding: '20px' }}>
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>{format(today, 'yyyy-MM-dd')}</h1>
        <div style={{ height: '20px' }}></div>
        <h2 style={{ fontSize: '25px', fontWeight: 'bold' }}>오늘 할 일</h2>
        <MyComponent title='등록하기' buttonText='등록' onPressed={() => { }}></MyComponent>
        <MyTodos />
      </div>
    </main>
  );
}



function MyTodos() {

  interface todo {
    'date': any,
    'todo': string,
  }

  const [data, setData] = useState<todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { unsubscribe, result } = await firestoreFunctions.streamData('todo');
      setData(result);
      return unsubscribe;
    };

    fetchData();

    return () => {

    };
  }, []);

  return (
    <div style={{ paddingTop: 50 }}>
      <ul>
        {data.map((item: todo, index) => (
          <li key={index}>{index} {format(item.date.toDate(), 'yyyy-MM-dd')} {item.todo}</li>
        ))}
      </ul>
    </div>
  );
}
'use client';
import { useState } from 'react';
import addData from '@/firebase/firestore/firebase_functions';
import firestoreFunctions from '@/firebase/firestore/firebase_functions';

function MyButton() {

    const handleForm = async () => {
        const data = {
            name: 'admin',
        }
        const { result, error } = await firestoreFunctions.addData('users', data)

        if (error || result == null) {
            return console.log(error)
        }

    }

    return (
        <button onClick={handleForm}>
            Button
        </button>
    )
}

export default MyButton;